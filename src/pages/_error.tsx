import { Button, Result } from "@arco-design/web-react";

/*
 * @Author: 关振俊
 * @Date: 2024-02-06 15:21:04
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-02-06 17:25:36
 * @Description:
 */
const Error: React.FC = () => {
  return (
    <>
      <Result
        status="error"
        title="Error message"
        subTitle="Something went wrong. Please try again. "
        extra={[
          <Button key="again" style={{ margin: "0 16px" }}>
            Again
          </Button>,
          <Button key="back" type="primary">
            Back
          </Button>,
        ]}
      ></Result>
    </>
  );
};
export default Error;
