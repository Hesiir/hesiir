import path from 'path';
import dependence from './utils/dependencies';
import _ from 'lodash';

const base_path = path.resolve(__dirname, '../');
const project_path = path.resolve(__dirname, `../src`);
const user_config = require(`${project_path}/config.json`);
const app_polyfill = require(`${base_path}/package.json`).polyfill;
export default {
    // This refers to the react-boilerplate version this project is based on.
    version: '0.1.0',
    entry: [`${base_path}/src/app.tsx`],
    output: `${base_path}/build`,
    vendors: _.pullAll(_.keys(dependence), app_polyfill),
    polyfill: app_polyfill,
    image: {
        floyd: 0.5,
        nofs: false,
        encoding: "progressive",
        optimizationLevel: 7,
        quality: "65-90",
        speed: 4
    },
    dlls: _.pullAll(_.keys(dependence), app_polyfill),
    dllsOut: `${base_path}/.__DLLs`,
    dllsDevtool: 'source-map',
    prefixerBrowser: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'iOS >= 8',
        'Opera >= 12',
        'Safari >= 7.1',
    ],
    noInfo: false,
    // ENV
    ENV_DEVELOPMENT: process.env.NODE_ENV == "development",
    ENV_BASEPATH: base_path,
    ENV_PROJECTPATH: project_path,
    server: {
        devPort: 8085,
        graphqlPort: 8089
    },
    title: 'Canaan'
};
