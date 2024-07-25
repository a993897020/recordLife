/*
 * @Author: 关振俊
 * @Date: 2024-02-19 10:42:08
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-19 10:51:51
 * @Description:公共方法
 */
/**
 * 通过文件实体转换base64
 * @param file 文件实体
 * @returns
 */
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (e: any) => {
      reject(e);
    };
    reader.readAsDataURL(file);
  });
};
/**
 * 创建唯一标识
 * @returns string
 */
export const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      // eslint-disable-next-line eqeqeq
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
// 数据处理 antd Upload fileList格式
export const getUploadObj = (file: any) => {
  const url = file?.fileCode ?? file?.fileUrl ?? file?.url;
  const _type = url ? url.split(".").at(-1) : "";
  const name =
    file?.fileName ?? file?.name ?? new Date().getTime() + `.${_type}`;
  return Object.assign({}, file, {
    id: "",
    uid: guid(),
    name,
    status: "done",
    url,
    type: ["png", "jpg", "jpeg"].includes(_type) ? "image/png" : "",
  });
};
