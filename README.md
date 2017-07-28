# webpack+vue多页应用架构

[TOC]

## 前言

这个webpack+vue的例子还是有很多不完善的地方，欢迎看到文章的你批评指正。

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

目录结构

```
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
	
	
```

开始运行

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

## 多页面应用怎么分块

多页面应用每个页面都有对应的一个js入口文件，页面只加载对应模块的js即可。

- 把每个页面对应的模块打包为一个js。

  入口文件配置entry.config.js

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


  let configEntry = {
  	'commons/commons': commonsArr.map((page) => {
  		return path.resolve(commonsDir) + '/' + page
  	})
  };

  pageArr.forEach((page) => {
    	configEntry[page] = [path.resolve(pagesDir, page + '/index.js')];
  });

  if (defaults.env !== 'production') {
  	for (let chunk in configEntry) {
  		configEntry[chunk].push(hotMiddlewareScript);
  	}
  }

  module.exports = configEntry;
  ```

- 打包后生成的目录结构对比

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

  commons对应部分plugin.config.js

  ```
  new webpack.optimize.CommonsChunkPlugin({
  	name: 'commons/commons',
  	filename: 'commons/bundle.js',
  	minChunks: Infinity,		
  }),
  ```

  公用模块打包后目录结构

  ```
  // 打包后公用模块目录结构
  dist				
  	commons				// 公用模块目录
  		bundle.js		// 公用模块
  		commons.css		// 公用模块css
  		commons.css.map	// 公用模块css sourcemap
  ```

  ​