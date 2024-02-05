/*
 * @Author: 关振俊
 * @Date: 2024-02-05 11:16:00
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-05 11:16:19
 * @Description: 
 */
module.exports = {
    presets: [
        ['next/babel']
    ],
    plugins: [
        [
            'import',
            {
                libraryName: '@arco-design/web-react',
                libraryDirectory: 'lib',
                camel2DashComponentName: false,
                style: true, // 样式按需加载
            },
        ]
    ],
};