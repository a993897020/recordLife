<!--
 * @Author: 关振俊
 * @Date: 2024-02-05 10:22:55
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-06 17:23:55
 * @Description: 
-->
### 项目搭建所遇到的问题
1. arco ui的组件按需引入及样式缺失的问题
    文档中尚未介绍next的安装流程，只是笼统的对react的组件安装，只能通过文档提供的next模板项目搭建，从中抄取，

1. 在github部署next.js项目到网站，通过github action商场查找关键词找到别人写好[插件](https://github.com/marketplace/actions/next-pages)的自动化脚本进行部署，需要注意的是：
    - 提交github action部署脚本代码需要github token
    - token获取，github头像->setting->developer settings->personal access tokens自行获取
    - token设置，`git remote set-url origin https://token@github.com/用户名/项目名.git`
    - token设置成功，推送(push)代码，推送成功后，到github进行页面部署设置
    - 部署设置，来到github项目，settings->Pages->Build and deployment->Branch->设置分支->设置访问目录,再次提交进行部署
1. 通过export形式打包，部署到github上js和css全部加载失败的问题
    原因：静态资源引用路径不对
    解决方案：next.config.ts设置publicPath为`/record-life`(/项目名)
1. 快速刷新(fast refresh)引发，会导致跳到错误页，影响开发
    原因：官网给的引发因素
    - 组件名没有大写导出
    - 匿名函数组件
    - 组件外还有其他导出
    - 修改next.config.ts的publicPath导致（俗称就改中间件导致的，我遇到的）
    解决方案：通过process.env.NODE_ENV判断为production再设置publicPath即可

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
