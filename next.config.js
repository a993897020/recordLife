/*
 * @Author: 关振俊
 * @Date: 2024-02-05 10:22:55
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-06 16:39:05
 * @Description: 
 */
/** @type {import('next').NextConfig} */

const path = require('path');
const withLess = require('next-with-less');
const withTM = require('next-transpile-modules')([
    '@arco-design/web-react',
    '@arco-themes/react-arco-pro',
]);
const isProduct = process.env.NODE_ENV === 'production'

const nextConfig = {
    output: 'export', //修改打包方式
    lessLoaderOptions: {
        lessOptions: {
            modifyVars: {
                'arcoblue-6': '#165DFF',
            },
        },
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.resolve.alias['@/assets'] = path.resolve(
            __dirname,
            './src/public/assets'
        );
        config.resolve.alias['@'] = path.resolve(__dirname, './src');

        return config;
    },
    pageExtensions: ['tsx'],
}
//线上打包 TODO: 导致引发fash refresh 导火线,要判断打包的资源路径设置
if (isProduct) {
    // basePath:'/out', //本地打包
    nextConfig.basePath = '/record-life'
}

module.exports = withLess(withTM(nextConfig))