const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

require('dotenv').config();

const TARGET = process.env.npm_lifecycle_event === 'build-app' ? 'production' : 'development';

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = process.env.ENV = TARGET;

const common = {
    entry: [
        // Set up an ES6-ish environment
        'babel-polyfill',

        // isomorphic-fetch
        'isomorphic-fetch',

        // application scripts
        PATHS.app
    ],

    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },

    module: {
        preLoaders: [],
        loaders: [{
            test: /\.jsx?$/,
            include: PATHS.app,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true
            }
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    }

};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if (TARGET === 'development') {
    module.exports = merge(common, {

        devtool: 'source-map',
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'noInfo',

            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.DEV_HOST,
            port: process.env.DEV_PORT,

        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]

    });
}

if (TARGET === 'production') {
    module.exports = merge(common, {});
}
