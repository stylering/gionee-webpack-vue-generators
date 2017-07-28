module.exports = {
	// 指定eslint的配置文件在哪里
	configFile: path.join(__dirname, '/../.eslintrc'), 
	// eslint报warning了就终止webpack编译
	failOnWarning: true, 
    // eslint报error了就终止webpack编译
    failOnError: true, 
	// 开启eslint的cache，cache存在node_modules/.cache目录里
	cache: true, 
}