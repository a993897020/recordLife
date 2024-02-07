/*
 * @Author: 关振俊
 * @Date: 2024-02-05 10:27:45
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-07 17:44:14
 * @Description:首页
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
  const [iptVal, setIptVal] = useState<string>("");
  const [dataList, setDataList] = useState<any[]>([]);
  const [cacheKey] = useState<ICacheKey>({
    cntKey: "cntSource",
    infoKey: "cntInfo",
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    author: "张三",
    avatar:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
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

  const [form] = Form.useForm();

  const userLabelMap: Record<keyof IUserInfo, string> = {
    avatar: "头像",
    author: "昵称",
    updateLastTime: "最后修改时间",
  };
  // 格式化文件路径
  const formatFileOrUrl = (fileItem: UploadItem[]): string => {
    return (
      fileItem[0].url ||
      (fileItem[0].originFile &&
        URL.createObjectURL(fileItem[0]?.originFile)) ||
      ""
    );
  };

  // 发送记录
  const sendRecord = () => {
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
      const formData = {
        ...values,
        avatar: formatFileOrUrl(values.avatar),
        updateLastTime: dayjs().format("YYYY-MM-SS HH:mm:ss"),
      };
      setSubmitLoading(true);
      setTimeout(() => {
        setSubmitLoading(false);
        setUserInfo(formData as IUserInfo);
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

  useEffect(() => {
    const cacheData = window.localStorage.getItem(cacheKey.cntKey);
    const infoData = window.localStorage.getItem(cacheKey.infoKey);
    if (cacheData) {
      setDataList(JSON.parse(cacheData));
    }
    if (infoData) {
      setUserInfo(JSON.parse(infoData));
    }
    const timer = setInterval(() => {
      setCurDateTime(dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    setPageLoading(true);
    return () => {
      clearInterval(timer);
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
              <Button key={"clear"} type="primary" onClick={removeCacheData}>
                清除缓存
              </Button>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {isEdit ? (
                <Form
                  form={form}
                  initialValues={{ author: userInfo.author }}
                  labelAlign="left"
                  labelCol={{ span: 1 }}
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
                  <FormItem wrapperCol={{ offset: 1 }}>
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
                            <Avatar>
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
              {/* <List
          size="small"
          header="记录清单"
          dataSource={dataList}
          render={(item, index) => <List.Item key={index}>{item}</List.Item>}
        /> */}
              <List
                bordered={false}
                header={<span>{dataList.length} 条记录清单</span>}
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
                        // actions={[
                        //   <span className="custom-comment-action" key="reply">
                        //     <IconMessage /> 回复
                        //   </span>,
                        // ]}
                      >
                        {/* <Comment
                  align="right"
                  actions={[
                    <Button key="0" type="secondary">
                      取消
                    </Button>,
                    <Button key="1" type="primary">
                      回复
                    </Button>,
                  ]}
                  avatar=""
                  content={
                    <div>
                      <Input.TextArea placeholder="请输入内容" />
                    </div>
                  }
                ></Comment> */}
                      </Comment>
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
