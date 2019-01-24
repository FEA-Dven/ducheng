const path = require('path'); 
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const HappyPack = require('happypack'); //快速打包
const os = require('os');  //获取系统信息
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //从js文件抽离css
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length / 2 }); //根据CPU线程数创建线程池
const port = require('./fontserver/config/config.js').port
const env = process.env.NODE_ENV || 'dev';
const isDev = env == 'dev';
module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev?'#eval':'none',
    entry: {
    	food: isDev ? ['webpack-hot-middleware/client?noInfo=true&reload=true', './app/main.js'] :  './app/main.js'
    }, 
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: isDev ? `http://localhost:${port}/build/` : `https://dywsweb.com/build/`,
        filename: isDev?`[name].js`:'[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happyBabel',
                exclude: /node_modules/
            },
            {
                test: /\.less|\.css$/,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'primary-color': '#0089ce',
                                'link-color': '#0089ce'
                            },
                        }
                    }
                ]
            },
            {
                test: /\.xtpl$/,
                loader: 'xtpl-loader',
            },
			{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
			{
				test: /\.(otf|eot|ttf|woff)/,
				loader: 'url-loader',
				query: {
					limit: 1000,
					name: '[name].[hash:8].[ext]'
				}
			},
        ]
    },
    plugins: [
        new HappyPack({
          id: 'happyBabel',
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          threadPool: happyThreadPool,
          verbose: true,
        }),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(env),
        })
    ].concat(isDev?[ 
        new webpack.HotModuleReplacementPlugin(),
    ]:[
        new AssetsPlugin({filename: './build/assets.json'}),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: "[id].[hash:8].css"
        }),
    ]),
    resolve: {
        extensions: ['.js'],
        alias: {
            '@app': path.join(__dirname, 'app'),
            '@store': path.join(__dirname, 'app/model'),
            '@component': path.join(__dirname, 'app/views/component'),
            '@assets': path.join(__dirname, 'app/assets'),
            '@libs': path.join(__dirname, 'app/libs'),
            '@api': path.join(__dirname, 'app/api'),
            '@config': path.join(__dirname, 'app/config')
        }
    }
}