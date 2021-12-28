/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { name } = require('./package')

function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/styles/variables.styl')]
    })
}
const ip = '10.0.5.31:8888'
module.exports = {
  outputDir: 'overview',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port: 8007,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '^/datamap-dataassets-server': {
        target: `http://${ip}`,
        changeOrigin: true
        // pathRewrite: {
        //   '^/data-model': ''
        // }
      }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('stylus').oneOf(type))
    )
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@store': resolve('src/store'),
        '@router': resolve('src/router'),
        '@config': resolve('src/config'),
        '@img': resolve('src/assets/img'),
        '@style': resolve('src/assets/style')
      }
    },
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$|\.jpeg$|\.png$|\.jpg$|\.gif$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
