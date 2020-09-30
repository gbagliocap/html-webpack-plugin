const merge             = require('webpack-merge');
const common            = require('./webpack.common.js');
const path              = require('path');
const fs                = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

let htmlWebpackPlugins = []
// list of file whitin 'static' folder
let filenames = []
fs.readdirSync(path.resolve(__dirname, SOURCE_ROOT + '/static')).forEach(file => {
  filenames.push(file)
});

for (index in filenames) {
    const filename = filenames[index];
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: filename,
        template: path.resolve(__dirname, SOURCE_ROOT + '/static/' + filename)
    }));
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    performance: { hints: 'warning' },
    plugins: htmlWebpackPlugins,
    devServer: {
        inline: true,
        proxy: [{
            context: ['/content', '/etc.clientlibs', '/etc', '/libs'],
            target: 'http://localhost:4502',
        }]
    }
});