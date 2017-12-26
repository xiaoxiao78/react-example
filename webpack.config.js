const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    // 需要编译的入口文件
    app: './src/index.js',
  },
  output: {
    //_dirname 指的是webpack.config.js所在的目录
    path: path.join(__dirname, '/build'),

    // 输出文件名称规则，这里会生成 'app.js'
    filename: '[name].js',
  },

  // 引用但不打包的文件
  externals: { react: 'React', 'react-dom': 'ReactDOM' },

  plugins: [

    // webpack2 需要设置 LoaderOptionsPlugin 开启代码压缩
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    // Uglify的配置
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
      },
    }),
  ],

  resolve: {
    // 给src目录一个路径，避免出现'../../'这样的引入
    alias: { _: path.resolve(__dirname, 'src') },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',

          // 可以在这里配置babelrc，也可以在项目根目录加.babelrc文件
          options: {

            // false是不使用.babelrc文件
            babelrc: false,

            // webpack2 需要设置modules 为false
            presets: [
              ['es2015', { modules: false }],
              'react',
            ],

            // babel的插件
            plugins: [
              'react-require',
              'transform-object-rest-spread',
            ],
          },
        },
      },

      // 这是sass的配置，less配置和sass一样，把sass-loader换成less-loader即可
      // webpack2 使用use来配置loader，并且不支持字符串形式的参数了，必须使用options
      // loader的加载顺序是从后向前的，这里是 sass -> postcss -> css -> style
      {
        test: /\.sass$/,
        use: [
          { loader: 'style-loader' },

          {
            loader: 'css-loader',

            // 开启了CSS Module功能，避免类名冲突问题
            //这里的配置是类名加hash值 避免冲突可以选择文件名+类名 ："[name]-[local]"
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]', 
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  autoprefixer,
                ]
              },
            },
          },

          {
            loader: 'sass-loader',
          },
        ],
      },

      // 当图片文件大于10KB时，复制文件到指定目录，小于10KB转为base64编码
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
}