let defaults = require('./cfg/defaults');

let webpackConfig = defaults.env == 'dev' ? 
	require('./cfg/webpack.dev.config.js') :
	require('./cfg/webpack.product.config.js');

module.exports = webpackConfig;