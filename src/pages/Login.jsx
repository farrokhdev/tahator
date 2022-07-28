import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import TokenManager from "../lib/tokenManager";
import { map } from "../routes/RouteMap";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.scss";
import Logo from "../assets/images/icon/logo.png";
import { LoginSlider } from "../components/Login/LoginSlider";
import { useLogin } from "../hooks/useAuth";

const Login = () => {
  const Navigate = useNavigate();

  const { setLogin, loginData, loginloading, loginError, loginRefetch } =
    useLogin();

  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      await setLogin({
        variables: {
          input: {
            username: username,
            password: password,
          },
        },
      }).then((res) => {
        console.log(res);
        message.success("به پنل ادمین خوش آمدید");
      });
    } catch (err) {
      console.log(err);
      await message.error(loginError?.message && "خطا در ورود مجدد تلاش کنید");
      Navigate(map.routes.login);
    }
  };

  useEffect(() => {
    if (loginData && loginData?.adminLogin) {
      TokenManager.setToken(
        loginData?.adminLogin.token.accessToken,
        "REFRESH_TOKEN"
      );
      setTimeout(() => {
        window.location.replace(map.routes.users);
      }, 1000);
    }
  }, [loginData]);

  return (
    <div className="login-sec">
      <div className="login-box">
        <div className="login-form-box">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="wellcome">
            <h2>خوش آمدید</h2>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                className="costume-input"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="نام کاربری"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="کلمه عبور"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loginloading}
                block
              >
                ورود
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login-img-box">
          {/* <img
            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          /> */}
          <LoginSlider />
        </div>
      </div>
    </div>
  );
};

export default Login;
