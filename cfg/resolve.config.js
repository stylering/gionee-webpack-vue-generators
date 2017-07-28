let defaults = require('./defaults');
let path = require('path');

module.exports = {
	extensions: ['.js', '.jsx'],
	alias: {
		node_modules: path.join(__dirname, '/../node_modules/'),
		commons: `${defaults.srcPath}/commons/`,
		components: `${defaults.srcPath}/components/`,
		images: `${defaults.srcPath}/images/`,
		pages: `${defaults.srcPath}/pages/`,
		styles: `${defaults.srcPath}/styles/`,
		libs: `${defaults.srcPath}/libs/`,
		vue: path.join(__dirname, '/../node_modules/vue/dist/vue.esm.js')
	}
}