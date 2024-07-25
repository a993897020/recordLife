/*
 * @Author: 关振俊
 * @Date: 2024-02-18 16:10:38
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-06-07 10:09:16
 * @Description:首页容器
 */
import { convertToBase64, getUploadObj } from "@/utils";
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
import "./index.less";

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
  const initAvatar =
    "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp";
  const [iptVal, setIptVal] = useState<string>("");
  const [dataList, setDataList] = useState<any[]>([]);
  const [cacheKey] = useState<ICacheKey>({
    cntKey: "cntSource",
    infoKey: "cntInfo",
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    author: "张三",
    avatar: initAvatar,
    updateLastTime: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [curDateTime, setCurDateTime] = useState(
    dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
  );
  const [fileList, setFileList] = useState<any[]>([
    getUploadObj({ url: initAvatar }),
  ]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [listCntHeight, setListCntHeight] = useState<number>(0);

  const [form] = Form.useForm();

  const userLabelMap: Record<keyof IUserInfo, string> = {
    avatar: "头像",
    author: "昵称",
    updateLastTime: "最后修改时间",
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
    if (!iptVal.trim()) return Message.warning("请输入要发送的内容");
    const recordItem = {
      dateTime: curDateTime,
      content: iptVal,
      isAnimation: true,
      ...userInfo,
    };
    setDataList((pre) => [...pre, recordItem]);

    setIptVal("");
  };
  // 滚动到指定记录位置
  const scrollSpecifyRecordLocation = (idx: number) => {
    if (!idx) return;
    const scrollRecord = document.querySelectorAll(".arco-list-item")[idx];
    scrollRecord.scrollIntoView({
      behavior: "smooth",
    });
  };

  // 清除缓存/数据
  const removeCacheData = () => {
    Object.values(cacheKey).forEach((p) => {
      window.localStorage.removeItem(p);
    });
    setDataList([]);
    setFileList([getUploadObj({ url: initAvatar })]);
    setIptVal("");
    setUserInfo({
      author: "张三",
      avatar: initAvatar,
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
        setFileList([getUploadObj({ url: formData.avatar })]);
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
  };
  // 获取缓存数据并设置初始值
  const getCacheDataAndSetVal = () => {
    const cacheData = window.localStorage.getItem(cacheKey.cntKey);
    const infoData = window.localStorage.getItem(cacheKey.infoKey);
    if (cacheData) {
      setDataList(JSON.parse(cacheData));
    }
    if (infoData) {
      const _infoData = JSON.parse(infoData);
      setFileList([getUploadObj({ url: _infoData.avatar })]);
      setUserInfo(JSON.parse(infoData));
    }
    setTimeout(() => {
      calcCntRemainingHeight();
    }, 500);
  };
  const requestTest = () => {
    fetch("/api/test", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
      });
  };

  useEffect(() => {
    getCacheDataAndSetVal();
    requestTest();

    const timer = setInterval(() => {
      setCurDateTime(dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    window.addEventListener("resize", calcCntRemainingHeight);

    setPageLoading(false);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", calcCntRemainingHeight);
    };
  }, []);

  useEffect(() => {
    if (dataList.length > 0 && cacheKey) {
      window.localStorage.setItem(cacheKey.cntKey, JSON.stringify(dataList));
      scrollSpecifyRecordLocation(dataList.length - 1);

      //TODO: to do animation:send location jump record target location animation, close animation
      // setTimeout(() => {
      //   const _dataList = dataList.slice();
      //   _dataList[_dataList.length - 1].isAnimation = false;
      //   setDataList(_dataList);
      // }, 2000);
    }
  }, [cacheKey, dataList]);

  return (
    <>
      {!pageLoading ? (
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
                searchButton={"发送"}
                placeholder="请输入内容"
                value={iptVal}
                onChange={setIptVal}
                onSearch={sendRecord}
              />
              <List
                bordered={false}
                header={<span>{dataList.length} 条记录清单</span>}
                virtualListProps={{ height: listCntHeight }}
              >
                {dataList.map((item, index) => {
                  return (
                    <List.Item key={item?.id ?? index}>
                      <Comment
                        align="right"
                        className={item.isAnimation ? "animation_item" : ""}
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
