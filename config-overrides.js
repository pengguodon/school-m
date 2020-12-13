const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    // 配置路径别名
    addWebpackAlias({
        components: path.resolve(__dirname, 'src/components'),
        views: path.resolve(__dirname, 'src/views'),
        utils: path.resolve(__dirname, 'src/utils'),
        api: path.resolve(__dirname, 'src/api'),
        myredux: path.resolve(__dirname, 'src/redux'),
        vo: path.resolve(__dirname, 'src/vo'),
        src : path.resolve(__dirname, 'src/')
    }),
    // antd-mobil(antd) 按需加载
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
    }),
);