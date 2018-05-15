const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const remarkHighlight = require('remark-highlight.js');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  entry: path.resolve(__dirname,'src/index.js'),
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/assets/", // string
  },
  
  devtool: 'eval-source-map',
  
  devServer: {
    historyApiFallback: true,
    publicPath: "/assets/", // string
    // contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    
    contentBase: path.resolve(__dirname, 'dist'), // 会在设置的目录下创建本地服务器，然后使用目录下的index.html文件
    inline: true,  // todo inline只能做到在更改代码的时候刷新整个页面，HMR可以做到不刷新页面，只刷新内容。所以后面还是要加上HMR，hot要搭配webpack插件使用
  },
  
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'common'),
      components: path.resolve(__dirname, 'src/components'),
      cherComponents: path.resolve(__dirname, 'src/cherComponents'),
      router: path.resolve(__dirname, 'src/router'),
      markdown: path.resolve(__dirname, 'markdown'), // 给一个路径使用别名代替，这样在引用的时候就可以省略../  如import Class from 'markdown/class';
    },
    
    extensions: [".js", ".json", ".jsx", ".css", ".md"],
  },
  
  module: {
    rules: [{
      test: /\.scss$/,  // 项目中使用的css预处理语言
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          modules: true, // 对sass文件开启css modules
          localIdentName: '[local]__[hash:base64:8]',
        }
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [`${path.resolve(__dirname,'src')}`]
        }
      }]
    }, {
      test: /\.(less|css)$/,  // antd样式依赖使用的less语言
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader",
        options: {
          paths: [
            path.resolve(__dirname, 'node_modules')
          ],
          javascriptEnabled: true
        }
      }]
    }, {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/
    }, {
      test: /\.md$/,
      use: [
        'babel-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            mdPlugins: [remarkHighlight]
            // hastPlugins: [highlight,html]
          }
        }
      ],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Knowledge Management',
      template: './public/index.html',
      filename: path.resolve(__dirname, 'dist/index.html'),
      alwaysWriteToDisk: true,
      favicon: './public/favicon.png'  // todo 好像只能用png格式的？
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
};

/*

module.exports = {
  entry: path.resolve(__dirname,'src/index.js'),
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/", // string
  },
  
  devtool: 'eval-source-map',
  
  devServer: {
    historyApiFallback: true,
    publicPath: "/", // string
    // contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    
    contentBase: path.join(__dirname, 'public'), // 会在设置的目录下创建本地服务器，然后使用目录下的index.html文件
    inline: true,  // todo inline只能做到在更改代码的时候刷新整个页面，HMR可以做到不刷新页面，只刷新内容。所以后面还是要加上HMR，hot要搭配webpack插件使用
  },
  
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'common'),
      utils: path.resolve(__dirname, 'src/utils'),
      markdown: path.resolve(__dirname, 'markdown'), // 给一个路径使用别名代替，这样在引用的时候就可以省略../  如import Class from 'markdown/class';
    },
    
    extensions: [".js", ".json", ".jsx", ".css", ".md"],
  },
  
  module: {
    rules: [{
      test: /\.scss$/,  // 项目中使用的css预处理语言
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          modules: true, // 对sass文件开启css modules
          localIdentName: '[local]__[hash:base64:8]',
        }
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [`${path.resolve(__dirname,'src')}`]
        }
      }]
    }, {
      test: /\.(less|css)$/,  // antd样式依赖使用的less语言
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader",
        options: {
          paths: [
            path.resolve(__dirname, 'node_modules')
          ],
          javascriptEnabled: true
        }
      }]
    }, {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/
    }, {
      test: /\.md$/,
      use: [
        'babel-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            // mdPlugins: [highlight,html]
            // hastPlugins: [highlight,html]
          }
        }
      ],
    }]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Knowledge Management',
      template: './public/index.html',
      favicon: './public/favicon.png'  // todo 好像只能用png格式的？
    })
  ],
};*/
