/*
 * @Author: 关振俊
 * @Date: 2024-02-05 10:22:55
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-06 14:35:01
 * @Description: 
 */
/** @type {import('next').NextConfig} */

const path = require('path');
const withLess = require('next-with-less');
const withTM = require('next-transpile-modules')([
    '@arco-design/web-react',
    '@arco-themes/react-arco-pro',
]);

const nextConfig = {
    // output: 'export',

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
    // async redirects() {
    //   return [
    //     {
    //       source: '/',
    //       destination: '/dashboard/workplace',
    //       permanent: true,
    //     },
    //   ];
    // },
    pageExtensions: ['tsx'],
}

module.exports = withLess(withTM(nextConfig))