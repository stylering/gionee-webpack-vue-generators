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