let path = require('path');
let defaultPort = 9005;
let proxyPort = 9006;

module.exports = {
	// 浏览器自动刷新代理端口号
	browserSyncPort: 9090,
	// webpack启动应用时的端口号
	defaultPort: defaultPort,
	// mock服务应用的端口号
	proxyPort: proxyPort,
	proxyTarget: 'http://localhost:' + proxyPort,
	allowedEnvs: ['dev', 'production', 'test'],
	env: process.env.NODE_ENV || 'dev',
	srcPath: path.join(__dirname, '/../src'),
	publicPath: '/dist/',
}