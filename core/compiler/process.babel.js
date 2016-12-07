import gulp from 'gulp';
import https from 'https';
import shell from 'gulp-shell';
import path from 'path';
import fs from 'fs';
import chalk from "chalk";
import express from 'express';
import gutil from 'gulp-util';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import fileExists from 'file-exists';
import webpack from 'webpack';
import { getDepsVersion} from '../utils/depsutils';
import getManifast from '../utils/depsutils';
import { IPList } from '../utils/network';
import webpackDevServer from 'webpack-dev-server';
import __cfg from '../config';

const usercfg = require(`${__cfg.ENV_PROJECTPATH}/config.json`);
const env = process.env.npm_config_env ? usercfg.env[process.env.npm_config_env] : usercfg.env.local;

gulp.task("dev", ["check dlls"], () => {
  const srv = new webpackDevServer(new webpack(require('./webpack.conf.babel').default), {
    noInfo: false,
    hot: true,
    quiet: false,
    stats: {
      color: true,
      chunks: false
    }
  });
  srv.listen(__cfg.server.devPort, () => 
  console.log(`${chalk.bgGreen(' express ')} Server is start on http://localhost:${__cfg.server.devPort}, waitng for bundle...`))
})

gulp.task("check dlls", (cb) => {
  const dllsfile = `${__cfg.dllsOut}/dllsVersion.json`;
  const dllConf = require('./webpack.dll.conf.babel').default;
  if(!fileExists(dllsfile)){
    console.log(`${chalk.bgYellow(' webpack ')} starting build dlls bundle`);
    new webpack(dllConf, () => {
      getManifast(dllConf.entry, dllsfile, cb)
    });
  } else {
    fs.readFile(dllsfile, 'utf8', (err, data) => {
      // rebuild DLLs if DLLs'version is out of date.
      let version = JSON.parse(data).version;
      if (version != getDepsVersion(__cfg.dlls).version) {
        console.log(`${chalk.bgYellow(chalk.white(' webpack '))} will be update dlls bundle`);
        new webpack(dllConf, () => {
          getManifast(dllConf.entry, dllsfile, cb)
        });
      } else {
        cb()
      }
    })
  }
})

gulp.task("Start HTTPS server", function(callback){
  const privateKey = fs.readFileSync('', 'utf8');
  const certificate = fs.readFileSync('', 'utf8');
  const serv = express();

  let credentials = {key: privateKey, cert: certificate};
  let HTTPS = https.createServer(credentials, serv);

  HTTPS.listen(8443);
  console.log(chalk.bgWhite("HTTPS server start on https://dev.local:8443"))
  callback()
})
