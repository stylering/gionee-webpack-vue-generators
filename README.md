# webpack+vue多页应用架构

[TOC]

## 前言

这个webpack+vue的例子还是有很多不完善的地方，欢迎批评指正。

在使用webpack的过程中，初学者可能会遇到比较多的疑问，本文主要从这些问题点展开

**我们需要解决的问题点**

> 多页面怎么分块

> 公共代码怎么样避免重复

> 样式文件怎样处理

> 图片是怎么处理的

> 第三方库怎么引用的

> 前后端分离数据请求伪造

> 开发热加载

> async import异步加载方案

> 其它：eslint、Test还在建设中

## 环境准备

npm环境安装，windows下载node：下载地址：https://nodejs.org/en/

下载gionee-webpack-vue-generators包到硬盘	

**开始运行**

```
// 进入gionee-webpack-vue-generators工程目录
cd gionee-webpack-vue-generators
// 初始化项目，安装依赖包
npm install
// 启动请求伪造假数据服务
npm run mock
// 开发环境运行
npm run dev
// 上线运行打包
npm run dist
// 访问首页
http://localhost:9090
```

**工程目录**

	gionee-webpack-vue-generators // 工程目录
	cfg		// webpack配置
		base.config.js				// webpack用到的公用配置文件
		defaults.js					// 常量配置文件
		entry.config.js				// webpack入口配置文件
		eslint.config.js			// eslint配置文件
		module.config.js			// webpack module配置文件
		output.config.js			// webpack输出配置文件
		plugins.config.js			// webpack用到的插件配置文件
		resolve.config.js			// webpack resolve配置文件
		webpack.dev.config.js
		webpack.product.config.js
		webpack.test.config.js
	dist 	// 打包文件后生成的目录
	mock	// 数据请求伪造目录
	node_modules	// 依赖包
	src		// 源码目录
		commons		// 公用模块代码
		components	// 存放组件代码目录
		images		// 图片目录
		libs		// 存放第三方插件目录
		pages		// 页面模块代码
			pointmall		// 模块
				detail		// 对应的子模块
				pshop		// 对应的子模块
					img		// 子模块页面用到的图片
					index.js		// 子模块页面对应的js
					styles.styl		// 子模块页面对应的样式
		styles		// 公用样式模块目录
	static	// 存放本地demo html页面
		pointmall			// 模块
			detail.html		// 对应的模块页面
			pshop.html		// 对应的模块页面
	test	// 测试代码
	
	.babellrc		// babel配置文件
	server.js		// 应用启动server
	webpack.config.js		// webpack配置文件


## 多页面应用怎么分块

多页面应用每个页面都有对应的一个js入口文件，页面只加载对应模块的js即可。

把每个页面对应的模块打包为一个js。

**入口文件配置entry.config.js**

```
let defaults = require('./defaults');
let path = require('path');
let glob = require('glob');
let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

let commonsDir = defaults.srcPath + '/commons';
let pagesDir = defaults.srcPath + '/pages';

let commonsInstance = new glob.Glob('**/*.js', {
	// 在commons目录里找
	cwd: commonsDir,
	// 这里不能异步，只能同步
	sync: true
})
let pagesInstance = new glob.Glob('*/*', {
	// 在pages目录里找
	cwd: pagesDir,
	// 这里不能异步，只能同步
	sync: true
})

// 获取commons目录下的所有js文件名[ 'adapterScreen.js', 'AndroidClient.js', 'areadata.js', 'buildStaticFile.js', 'config.js', 'dialog.js', 'toast.js', 'util.js' ]
let commonsArr = commonsInstance.found;
// 一个数组，形如['pointmall/detail', 'pointmall/draw', 'pointmall/record']
let pageArr = pagesInstance.found; 
```
**打包后生成的目录结构对比**

我们可以看到static中的页面模块与打包后的模块js是一一对应的。

```
// 页面模块
static					// 存放demo html的目录
	dynamic				// 模块
		index.html		// 子模块首页
	pointmall
		detail.html		// 子模块页面
		pshop.html		// 子模块页面
		
		
// 打包后生成的目录结构
dist				
	dynamic				// 页面模块
		index.css		// 子页面css
		index.css.map	// 子页面css sourcemap
		index.js		// 子页面对应的js
	pointmall			// 页面模块
		detail.css		// 子页面css
		detail.css.map	// 子页面css sourcemap
		detail.js		// 子页面对应的js
		pshop.css		// 子页面css
		pshop.css.map	// 子页面css sourcemap
		pshop.js		// 子页面对应的js
```


## 公共代码怎么样避免重复

公用模块打包：我们使用了webpack的CommonsChunkPlugin插件，打包后的文件为bundle.js，这个js包含了webpack的入口代码、commons目录中的公用模块代码

**commons对应部分plugin.config.js**

```
new webpack.optimize.CommonsChunkPlugin({
	name: 'commons/commons',
	filename: 'commons/bundle.js',
	minChunks: Infinity,		
}),
```

**公用模块打包后目录结构**

```
// 打包后公用模块目录结构
dist				
	commons				// 公用模块目录
		bundle.js		// 公用模块
		commons.css		// 公用模块css
		commons.css.map	// 公用模块css sourcemap
```





## 样式文件怎样处理

使用预处理器编写css，这里以stylus作为举例

**在dev环境下内联使用样式文件**

```
// cfg/module.config.js文件
rules: [{
	test: /\.styl$/,
    loader: 'style-loader!css-loader!stylus-loader'
}]
```

**在production环境使用了extract-text-webpack-plugin提取css，页面引用。**

```
// cfg/module.config.js文件
rules: [{
	test: /\.styl$/,
    loader: ExtractTextPlugin.extract({
    	fallback: 'style-loader', 
    	use: 'css-loader?!stylus-loader'
    })
}]

// cfg/plugins.config.js文件，提取样式文件
new ExtractTextPlugin("[name].css")
```



## 图片是怎么处理的

图片的引用有多种情况，css中对图片的引用、demo页中img标签使用的图片、js中使用。

构建中使用url-loader，图片大小小于5kb时会自动生成base64格式的图片，图片大于5kb会按指定规则在dist/images中复制生成的图片，并返回引用地址

```
// cfg/module.config.js文件
rules: [{
	{
    	test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=5000&name=images/[name]-[hash:6].[ext]'
    }
}]
```

对于在demo页中img标签使用的图片，项目初始化时，使用了file-loader从src/images目录中拷贝到dist/images中，在页面中直接引用图片地址

```
// src/commons/buildStaticFile.js文件
// 图片
import '!file-loader?name=images/[name].[ext]!images/drawtxt1.png';
import '!file-loader?name=images/[name].[ext]!images/drawtxt2.png';
import '!file-loader?name=images/[name].[ext]!images/draw-start-text.png';
import '!file-loader?name=images/[name].[ext]!images/draw-win-text.png';
```



## 第三方库怎么引用的

有时候我们需要在页面中引用第三方库，从src/libs使用file-loader拷贝到dist/libs目录

```
// src/commons/buildStaticFile.js文件
// css
import '!file-loader?name=libs/[name].[ext]!libs/reset.css';
import '!file-loader?name=libs/[name].[ext]!libs/reset.min.css';
```



## 前后端分离数据请求伪造

为了不依赖于后端开发，我们可以伪造请求数据，在这里使用了express+mockjs框架，express创建应用服务器、定义路由，mockjs自动伪装数据。

**启动应用**

```
// mock/mockserver.js文件
let express = require('express');
let app = express();
let defaults = require('../cfg/defaults');
let routes = require('./routes')(app);

app.use(express.static(__dirname))

let server = app.listen(defaults.proxyPort, () => {
	console.log('app listening at http://localhost:' + defaults.proxyPort)
})

```

定义路由

```
// mock/routes.js
module.exports = function(app) {
	app.use('/auth/pshop', require('./pshop'));
}
```

**伪造数据，在页面中只要访问http://localhost:port/auth/pshop/goods.List.do就能请求到数据了**

```
// mock/pshop.js文件

let express = require('express');
let router = express.Router();
let Mock = require('mockjs');
let Random = Mock.Random;

// 3.15	查询商品信息接口
router.all('/goodsList.do', (req, res) => {

	let data = {
		pg: 1,
		gl: []
	};

	for (let i=0; i<10; i++) {
		data.gl.push(Mock.mock({
			i: i,
			// 生成200*200长宽的图片地址
			img: Random.image('200x200'),
			// 随机生成10到1000的整数
			point: Random.integer(10, 1000),
			// 随机生成10-20个中文字符的字符串
			name: Random.cword(10, 20),
			// 随机生成true/false的布尔值
			st: Random.boolean()
		}))
	}

	return res.json(data);
})
```

Mock.Random api可以根据规则生成图片地址、布尔值、字符串等等，这对于我们dev开发环境demo还是很方便的



## 开发热加载

热加载早已是前端开发必备了，可以减少我们修改后刷新页面的频率，热加载有很多中，分为是demo页html的修改后的热加载，css样式的热加载，js修改的热加载。

**针对js和css热加载，这里使用了webpack的webpack-dev-middleware和webpack-hot-middleware中间件**

```
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
```

**html修改后的热加载，我们使用了browser-sync插件，当我们修改demo中的html文件后，能够自动刷新浏览器，browser-sync会创建一个应用代理，代理来监听静态文件的修改**

```
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
```



## 异步加载方案

异步加载方案使用了es7语法，使用了babel-polyfill垫片，使用babel-resets-es2015代码编译为es5

**通过async import新语法实现优雅的异步加载写法，有点像同步的写法。**

```
import 'babel-polyfill';
import config from 'commons/config';
import AndroidClient from 'commons/AndroidClient';
import util from 'commons/util';
import 'styles/commons.styl';
import './styles.styl';

(async () => {

    // 异步加载jquery、Vue、VueRouter、Slick插件
    const $ = await import('jquery');
    const VueModule = await import('vue');
    const VueRouterModule = await import('vue-router');
    const Vue = VueModule.default;
    const VueRouter = VueRouterModule.default;

    // 轮播插件及样式
    const Slick = await import('vue-slick');
    const slickStyle = await import('node_modules/slick-carousel/slick/slick.css');
    
    Vue.use(VueRouter);

})();

```





## 其它：eslint、Test还在建设中