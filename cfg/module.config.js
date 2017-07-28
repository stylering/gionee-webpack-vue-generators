let defaults = require('./defaults');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let moduleConfig = {
    /*preLoaders: [{
        // 只针对js文件
        test: /\.js$/, 
        // 指定启用eslint-loader
        loader: 'eslint', 
        // 指定审查范围仅为自己团队写的业务代码
        include: [/src/], 
        // 剔除掉不需要利用eslint审查的文件
        exclude: [/bootstrap/, /node_modules/], 
    }],*/
    rules: [
        {
            test: /\.css$/,
            exclude: /src\/libs/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.sass/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
        },
        {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        },
        {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'url-loader?limit=5000&name=images/[name]-[hash:6].[ext]'
        },
        {
            test: /\.(mp4|ogg|svg)$/,
            loader: 'file-loader?name=lib/[name]-[hash:6].[ext]?'
        },
        {
            test: /\.(js)$/,
            loader: 'babel-loader',
            exclude: /mock/
        },
    ]
}

if (defaults.env !== 'production') {
    moduleConfig.rules.push({
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
    })
    moduleConfig.rules.push({
        test: /\.vue$/,
        loader: 'vue-loader',
    })
} else {
    moduleConfig.rules.push({
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader', 
            use: 'css-loader?!stylus-loader'
        })
    })
    moduleConfig.rules.push({
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                css: ExtractTextPlugin.extract({
                    use: 'css-loader?!stylus-loader',
                    fallback: 'vue-style-loader'
                })
            }
        }
    })
}

module.exports = moduleConfig