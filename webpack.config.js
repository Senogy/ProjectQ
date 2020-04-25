const path = require('path');

module.exports = {
    entry: './src/ProjectQ.js',   // entrypoint of the game, aka it holds the main function
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};