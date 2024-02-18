/*
 * @Author: 关振俊
 * @Date: 2024-02-18 16:10:38
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-18 17:54:57
 * @Description:首页容器
 */
import {
  Button,
  Table,
  TableColumnProps,
  List,
  Input,
  Space,
  Comment,
  Card,
  Checkbox,
  Form,
  Descriptions,
  Avatar,
  Image,
  Upload,
  Modal,
  Message,
  Skeleton,
  Popconfirm,
} from "@arco-design/web-react";
import FormItem from "@arco-design/web-react/es/Form/form-item";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

interface IUserInfo {
  avatar: string;
  author: string;
  updateLastTime: string;
}
interface ICacheKey {
  cntKey: string;
  infoKey: string;
}
const Index: React.FC = () => {
  const avatar =
    "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp";
  const [iptVal, setIptVal] = useState<string>("");
  const [dataList, setDataList] = useState<any[]>([]);
  const [cacheKey] = useState<ICacheKey>({
    cntKey: "cntSource",
    infoKey: "cntInfo",
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    author: "张三",
    avatar,
    updateLastTime: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [curDateTime, setCurDateTime] = useState(
    dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
  );
  const [fileList, setFileList] = useState<any[]>([
    { uid: "1", url: userInfo.avatar, name: "avatar.png" },
  ]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [listCntHeight, setListCntHeight] = useState<number>(0);

  const [form] = Form.useForm();

  const userLabelMap: Record<keyof IUserInfo, string> = {
    avatar: "头像",
    author: "昵称",
    updateLastTime: "最后修改时间",
  };
  const convertToBase64 = (file: File): Promise<string> => {
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
  // 格式化文件路径
  const formatFileOrUrl = async (fileItem: UploadItem[]): Promise<string> => {
    if (fileItem[0].url) {
      return fileItem[0].url;
    }
    if (fileItem[0]?.originFile) {
      return await convertToBase64(fileItem[0]?.originFile);
    }
    return "";
  };

  // 发送记录
  const sendRecord = () => {
    if (!iptVal.trim()) return Message.error("请输入要发送的内容");
    const recordItem = {
      dateTime: curDateTime,
      content: iptVal,
      ...userInfo,
    };
    setDataList((pre) => [...pre, recordItem]);
    setIptVal("");
  };

  // 清除缓存/数据
  const removeCacheData = () => {
    Object.values(cacheKey).forEach((p) => {
      window.localStorage.removeItem(p);
    });
    setDataList([]);
    setFileList([{ uid: "1", url: avatar, name: "avatar.png" }]);
    setIptVal("");
    setUserInfo({
      author: "张三",
      avatar:
        "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
      updateLastTime: "",
    });
  };
  // 设置信息
  const submitForm = async () => {
    try {
      await form.validate();
      const values = form.getFieldsValue();
      const avatar = await formatFileOrUrl(values.avatar);
      const formData = {
        ...values,
        avatar,
        updateLastTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      setSubmitLoading(true);
      setTimeout(() => {
        setSubmitLoading(false);
        setUserInfo(formData as IUserInfo);
        setFileList([{ uid: "1", url: formData.avatar, name: "avatar.png" }]);
        Message.success("修改成功！");
        handleUpdateInfo(false);
        window.localStorage.setItem(cacheKey.infoKey, JSON.stringify(formData));
      }, 500);
    } catch (e) {
      console.log({ e });
    }
  };
  // 是否编辑信息
  const handleUpdateInfo = (flag: boolean) => {
    setIsEdit(flag);
  };
  //  计算容器剩余高度
  const calcCntRemainingHeight = () => {
    const headClass = ".arco-card .arco-card-header";
    const infoClass = ".arco-card .arco-card";
    const iptClass = ".arco-card .arco-space-item .arco-input-group-wrapper";
    const listHeadClass = ".arco-card .arco-space-item .arco-list-header";

    const viewH: number = document.body.clientHeight;
    const headH: number = document.querySelector(headClass)?.clientHeight ?? 0;
    const infoH: number = document.querySelector(infoClass)?.clientHeight ?? 0;
    const iptH: number = document.querySelector(iptClass)?.clientHeight ?? 0;
    const listHeadH: number =
      document.querySelector(listHeadClass)?.clientHeight ?? 0;
    const outH = 20 * 2 + 8 * 3;

    const remainingHeight = viewH - headH - infoH - iptH - listHeadH - outH;
    setListCntHeight(remainingHeight);
    console.log({ viewH, remainingHeight, headH, outH });
  };

  useEffect(() => {
    const cacheData = window.localStorage.getItem(cacheKey.cntKey);
    const infoData = window.localStorage.getItem(cacheKey.infoKey);
    if (cacheData) {
      setDataList(JSON.parse(cacheData));
    }
    if (infoData) {
      const _infoData = JSON.parse(infoData);
      setFileList([{ uid: "1", url: _infoData.avatar, name: "avatar.png" }]);
      setUserInfo(JSON.parse(infoData));
    }
    const timer = setInterval(() => {
      setCurDateTime(dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    setPageLoading(true);

    setTimeout(() => {
      calcCntRemainingHeight();
    });
    window.addEventListener("resize", calcCntRemainingHeight);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", calcCntRemainingHeight);
    };
  }, []);
  useEffect(() => {
    if (dataList.length > 0 && cacheKey) {
      window.localStorage.setItem(cacheKey.cntKey, JSON.stringify(dataList));
    }
  }, [cacheKey, dataList]);
  return (
    <>
      {pageLoading ? (
        <>
          <Card
            title={<div suppressHydrationWarning={true}>{curDateTime}</div>}
            extra={
              <Popconfirm
                focusLock
                title="提示"
                content="是否确定要清除数据?"
                onOk={removeCacheData}
              >
                <Button key={"clear"} type="primary">
                  清除数据
                </Button>
              </Popconfirm>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {isEdit ? (
                <Form
                  form={form}
                  initialValues={{ author: userInfo.author }}
                  labelAlign="left"
                  autoComplete="off"
                >
                  <FormItem
                    label="昵称"
                    field={"author"}
                    rules={[{ required: true, message: "请输入您的昵称" }]}
                  >
                    <Input placeholder="请输入您的昵称" />
                  </FormItem>

                  <Form.Item
                    label="头像"
                    field="avatar"
                    triggerPropName="fileList"
                    rules={[{ required: true, message: "请上传头像" }]}
                    initialValue={fileList}
                  >
                    <Upload
                      listType="picture-card"
                      multiple
                      name="files"
                      action="#"
                      limit={1}
                      fileList={fileList}
                      accept={"image/*"}
                      onChange={setFileList}
                      onPreview={(file: UploadItem) => {
                        Modal.info({
                          title: "预览",
                          content: (
                            <Image
                              src={
                                file.url ||
                                (file.originFile &&
                                  URL.createObjectURL(file?.originFile))
                              }
                              style={{
                                maxWidth: "300px",
                              }}
                              alt="uploadAvatar"
                            ></Image>
                          ),
                        });
                      }}
                    />
                  </Form.Item>
                  <FormItem label=" ">
                    <Space>
                      <Button
                        loading={submitLoading}
                        onClick={() => handleUpdateInfo(false)}
                      >
                        取消
                      </Button>
                      <Button
                        loading={submitLoading}
                        type="primary"
                        onClick={submitForm}
                      >
                        提交
                      </Button>
                    </Space>
                  </FormItem>
                </Form>
              ) : (
                <Card
                  title={"用户信息"}
                  hoverable
                  extra={
                    <Button type="text" onClick={() => handleUpdateInfo(true)}>
                      编辑
                    </Button>
                  }
                  actions={[
                    userInfo.updateLastTime && (
                      <span
                        key={"time"}
                        style={{ color: "#86909c", fontSize: 12 }}
                      >{`最后修改时间：${userInfo.updateLastTime}`}</span>
                    ),
                  ]}
                >
                  <Descriptions
                    title={false}
                    data={Object.keys(userInfo)
                      .filter((p) => p !== "updateLastTime")
                      .map((p: string) => ({
                        label: userLabelMap[p as keyof IUserInfo],
                        value:
                          p === "avatar" ? (
                            <Avatar style={{ background: "transparent" }}>
                              <Image src={userInfo[p]} alt={p}></Image>
                            </Avatar>
                          ) : (
                            userInfo[p as keyof IUserInfo]
                          ),
                      }))}
                    layout="horizontal"
                    border
                    column={5}
                  />
                </Card>
              )}
              <Input.Search
                searchButton
                placeholder="请输入内容"
                value={iptVal}
                onChange={setIptVal}
                onSearch={sendRecord}
              />
              <List
                bordered={false}
                header={<span>{dataList.length} 条记录清单</span>}
                // wrapperStyle={{ maxHeight: 300, overflow: "auto" }}
                virtualListProps={{ height: listCntHeight }}
              >
                {dataList.map((item, index) => {
                  return (
                    <List.Item key={item?.id ?? index}>
                      <Comment
                        align="right"
                        author={item?.author ?? false}
                        avatar={item?.avatar ?? false}
                        content={item?.content ?? item}
                        datetime={item?.dateTime ?? false}
                      ></Comment>
                    </List.Item>
                  );
                })}
              </List>
            </Space>
          </Card>
        </>
      ) : (
        <Skeleton></Skeleton>
      )}
    </>
  );
};
export default Index;
