let path = require('path'),
	express = require('express'),
	proxyMiddleware = require('http-proxy-middleware');

let defaults = require('./cfg/defaults'),
	webpackConfig = require('./webpack.config'),
	isDev = defaults.env !== 'production';

let app = express();
app.use(express.static(path.join(__dirname, './')));

// 代理设置，代理到mock sever
app.use('/', proxyMiddleware([
	'/auth', 
	'/ucsr-api', 
	'/service', 
	'ucsr-api', 
	'/images'
	], {
		target: defaults.proxyTarget, 
		changeOrigin: true
	}
));

if (isDev) {

	let webpack = require('webpack'),
		webpackDevMiddleware = require('webpack-dev-middleware'),
		webpackHotMiddleware = require('webpack-hot-middleware');

	let compiler = webpack(webpackConfig);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: defaults.publicPath,
		noInfo: true,
		stats: {
			colors: true
		}
	}))

	app.use(webpackHotMiddleware(compiler));
	
	require('./mock/routes')(app);

	let browserSync = require('browser-sync').create();

	app.listen(defaults.defaultPort, function() {
		// 监控静态文件html，自动刷新浏览器
		browserSync.init({
			open: false,
			ui: false,
			notify: false,
			proxy: 'localhost:' + defaults.defaultPort,
			files: [
				'./static/**',
				'./index.html'
			],
			port: defaults.browserSyncPort
		});
		console.log('server (dev) is now running on port ' + defaults.defaultPort)
	})

} else {
	
	require('./mock/routes')(app);
	app.listen(defaults.defaultPort, function() {
		console.log('server (dev) is now running on port ' + defaults.defaultPort)
	})

}