/*
 * @Author: 关振俊
 * @Date: 2024-02-05 10:27:45
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-06 18:02:47
 * @Description:首页
 */
import {
  Button,
  Table,
  TableColumnProps,
  List,
  Input,
  Space,
} from "@arco-design/web-react";
import { useEffect, useState } from "react";

const Index: React.FC = () => {
  const [iptVal, setIptVal] = useState<string>("");
  const [dataList, setDataList] = useState<string[]>([]);
  const [cacheKey] = useState("cntSource");
  // 清除缓存/数据
  const removeCacheData = () => {
    window.localStorage.removeItem(cacheKey);
    setDataList([]);
    setIptVal("");
  };
  useEffect(() => {
    const cacheData = window.localStorage.getItem(cacheKey);
    if (cacheData) {
      setDataList(JSON.parse(cacheData));
    }
  }, []);
  useEffect(() => {
    if (dataList.length > 0 && cacheKey) {
      window.localStorage.setItem(cacheKey, JSON.stringify(dataList));
    }
  }, [cacheKey, dataList]);
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <Space direction="vertical">
        <Button type="primary" onClick={() => removeCacheData()}>
          清除缓存
        </Button>
        <Input.Search
          searchButton
          defaultValue="Search content"
          placeholder="Enter keyword to search"
          style={{ width: 350 }}
          value={iptVal}
          onChange={setIptVal}
          onSearch={() => {
            setDataList((pre) => [...pre, iptVal]);
            setIptVal("");
          }}
        />
        <List
          style={{ width: 622 }}
          size="small"
          header="记录清单"
          dataSource={dataList}
          render={(item, index) => <List.Item key={index}>{item}</List.Item>}
        />
      </Space>
    </>
  );
};
export default Index;
