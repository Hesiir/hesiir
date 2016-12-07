import webpack from 'webpack';
import path from 'path';
import __cfg from '../config';

export default {
    entry: __cfg.dlls,
    devtool: __cfg.dllsDevtool,
    output: {
      filename: 'dlls.js',
      path: __cfg.dllsOut,
      library: 'dlls'
    },
    plugins: [
      new webpack.DllPlugin({
        name: 'dlls',
        path: path.join(__cfg.dllsOut, 'dlls.json') 
      })
    ]
};
