/*
 * @Author: 关振俊
 * @Date: 2024-02-05 10:22:55
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-05 11:33:27
 * @Description: 
 */
const withAntdLess = require('next-plugin-antd-less');

const withTM = require('next-transpile-modules')([
    '@arco-design/web-react'
]);
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    // lessLoaderOptions: {
    //     lessOptions: {
    //         modifyVars: {
    //             'arcoblue-6': '#3abd8f'
    //         }
    //     }
    // },
    // lessVarsFilePath: './src/styles/variables.less', // optional
    // lessVarsFilePathAppendToEndOfContent: false, // optional
    // optional https://github.com/webpack-contrib/css-loader#object
    // cssLoaderOptions: {
    //     mode: "local",
    //     localIdentName: "[hash:base64:8]",
    //     exportLocalsConvention: "camelCase",
    //     exportOnlyLocals: false
    // }
}

module.exports = withAntdLess(withTM(nextConfig))