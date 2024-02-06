/*
 * @Author: 关振俊
 * @Date: 2024-02-05 10:27:45
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-06 17:26:26
 * @Description:首页
 */
import { Button, Table, TableColumnProps } from "@arco-design/web-react";

const Index: React.FC = () => {
  const columns: TableColumnProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Jane Doe",
      salary: 23000,
      address: "32 Park Road, London",
      email: "jane.doe@example.com",
    },
    {
      key: "2",
      name: "Alisa Ross",
      salary: 25000,
      address: "35 Park Road, London",
      email: "alisa.ross@example.com",
    },
    {
      key: "3",
      name: "Kevin Sandra",
      salary: 22000,
      address: "31 Park Road, London",
      email: "kevin.sandra@example.com",
    },
    {
      key: "4",
      name: "Ed Hellen",
      salary: 17000,
      address: "42 Park Road, London",
      email: "ed.hellen@example.com",
    },
    {
      key: "5",
      name: "William Smith",
      salary: 27000,
      address: "62 Park Road, London",
      email: "william.smith@example.com",
    },
  ];

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <Button type="primary">111</Button>
      <Table columns={columns} data={data} />
    </>
  );
};
export default Index;
