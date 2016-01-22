const path = require('path');
const PATHS = {
    src: path.join(__dirname + '/src'),
    dist: path.join(__dirname + '/dist'),
};

module.exports = {
    entry: ['babel-polyfill', path.join(PATHS.src, '/app.js')],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: PATHS.dist,
        filename: 'app.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: PATHS.src,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
        }]
    }
};

