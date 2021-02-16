const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const theme = require('./package.json').theme;

module.exports = override(
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars:theme,
        }
    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    }),
);
//需要在pack.json中添加theme字段，并且webpack4.41.6不支持less-loader8.0以上的版本可以使用7.3.0及其以下的版本
/*
    "theme": {
        "@brand-primary": "#ff5722",
        "@brand-primary-tap": "#ffccbc",
        "@color-text-base-inverse": "#3f51b5"
    }
 */