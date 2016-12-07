import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import _ from 'lodash';
import { urlToRequest } from 'loader-utils';
import __cfg from '../config';

const usercfg = require(`${__cfg.ENV_PROJECTPATH}/config.json`);
const nameType = `[name]${__cfg.ENV_DEVELOPMENT && '.[hash]'}.js`;
const webpackConfig = {
    entry: __cfg.entry,
    output: {
        // Don't use hashes in dev mode for better performance
        filename: nameType,
        chunkFilename: nameType,
        path: __cfg.output
    },
    resolve: {
        // after 2.xx remove first child [""] to fix 'configuration.resolve.extensions[0] should not be empty'.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: [
                    `babel-loader?passPerPreset,presets[]=stage-0,presets[]=es2015,plugins[]=transform-class-properties,plugins[]=babel-relay-plugin-loader`,
                    'awesome-typescript-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    `css-loader?{
                        "sourceMap":${!__cfg.ENV_DEVELOPMENT},
                        "modules":false,
                        "importLoaders": 1,
                        "localIdentName":"${__cfg.ENV_DEVELOPMENT ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}",
                        "minimize":${!__cfg.ENV_DEVELOPMENT}
                    }`
                ]
            },
            {
                test: /\.styl$/,
                loaders: [
                    'style-loader',
                    `css-loader?{
                        "sourceMap":${!__cfg.ENV_DEVELOPMENT},
                        "modules":true,
                        "importLoaders": 1,
                        "localIdentName":"${__cfg.ENV_DEVELOPMENT ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}",
                        "minimize":${!__cfg.ENV_DEVELOPMENT}
                    }`,
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    `image-webpack-loader?{
                        progressive: ${__cfg.image.encoding == "progressive"},
                        optimizationLevel: ${__cfg.image.optimizationLevel},
                        interlaced: ${__cfg.image.encoding == "progressive"}
                    }`,
                ],
            },
            {
                test: /\.svg$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
                ],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //Typically you'd have plenty of other plugins here as well
        new webpack.DllReferencePlugin({
            context: `${__cfg.ENV_BASEPATH}`,
            manifest: require(`${__cfg.dllsOut}/dlls.json`)
        }),
        // OccurrenceOrderPlugin is needed for long-term caching to work properly.
        // See http://mxs.is/googmv
        new webpack.optimize.OccurrenceOrderPlugin(true),

        // Merge all duplicate modules
        // new webpack.optimize.DedupePlugin(),

        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: `${__cfg.ENV_BASEPATH}/core/templates/index.html`,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
            title: __cfg.title,
            debug: !!__cfg.ENV_DEVELOPMENT
        }),
        new webpack.LoaderOptionsPlugin({
            debug: __cfg.ENV_DEVELOPMENT,
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                postcss: () => [
                    precss(),
                    autoprefixer({ browsers: __cfg.prefixerBrowser })
                ]
            }
        }),
    ]
};

if (!__cfg.ENV_DEVELOPMENT) {
    webpackConfig.plugins.push(
        // Minify and optimize the JavaScript
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    )
}

export default webpackConfig;
