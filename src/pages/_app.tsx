/*
 * @Author: 关振俊
 * @Date: 2024-02-06 11:28:46
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-07 15:58:49
 * @Description:
 */
import type { AppProps } from "next/app";
import "@/styles/global.less";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>记录生活小驿站</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
