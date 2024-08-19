import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { theme } from "antd";
import { useLogin } from "../../api/users";

const Page = () => {
  const { token } = theme.useToken();
  const login = useLogin();

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="/fangzi.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        loading={login.isLoading}
        subTitle="美大房源管理系统"
        onFinish={async (values) => {
          let token = await login.mutateAsync(values as any);
          localStorage.setItem("token", token!);
          window.location.reload();
          window.location.href = "/#/";
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: "large",
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={"prefixIcon"}
              />
            ),
          }}
          placeholder={"用户名"}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={"prefixIcon"}
              />
            ),
          }}
          placeholder={"密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
