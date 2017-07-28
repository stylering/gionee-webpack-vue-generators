let defaults = require('./defaults');
let path = require('path');

module.exports = {
	path: path.join(__dirname, '/../dist'),
	filename: '[name].js',
	chunkFilename: 'chunk/[id].chunk.js?[chunkhash:6]',
	publicPath: defaults.publicPath,
}