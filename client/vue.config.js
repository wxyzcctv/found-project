const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    publicPath: '/',      // 根域上下文目录
    outputDir: 'dist',    // build输出目录
    assetsDir: 'assets',  // 静态资源目录（js, css, img）
    lintOnSave: false,    // 是否开启eslint保存检测， 有效值： true | false | 'error'
    runtimeCompiler: true,          // 运行时版本是否需要编译
    transpileDependencies: [],      // 默认babel-loader忽略mode_ modules，这里可增加例外的依赖包名
    productionSourceMap: true,      // 是否在构建生产包时生成sourceMap 文件，false将提高构建速度
    configureWebpack: config => {
        // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) {
            // 开发环境
            config.devtool = "cheap-module-eval-source-map";
        } else {
            // 生产环境
        }
        // Object.assign(config, {
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname,'./src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             'vue$': 'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config => {
        // webpack连接API，用于生成和修改webpack配置
        // https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: {
        // 第三方插件配置
    },
    pwa: {
        // 单页插件相关配置
        // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
}