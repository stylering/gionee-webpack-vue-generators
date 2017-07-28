let baseConfig = require('./base.config.js');


// 线上环境配置
module.exports = Object.assign({}, baseConfig, {

	entry: require('./entry.config.js'),

	output: require('./output.config.js'),

	module: require('./module.config.js'),

	resolve: require('./resolve.config.js'),

	plugins: require('./plugins.config.js'),

	cache: false,

	devtool: 'sourcemap',
})