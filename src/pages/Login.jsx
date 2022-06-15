import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import TokenManager from "../lib/tokenManager";
import { map } from "../routes/RouteMap";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.scss";

const SET_LOGIN = gql`
  mutation AddTodo($username: String!, $password: String!) {
    adminLogin(input: { username: $username, password: $password }) {
      token
    }
  }
`;

const Login = () => {
  const Navigate = useNavigate();

  const [setLogin, { data, loading, error }] = useMutation(SET_LOGIN);

  const onFinish = (values) => {
    const { username, password } = values;
    try {
      setLogin({ variables: { username, password } }).then(() =>
        message.success("به پنل ادمین خوش آمدید")
      );
    } catch (err) {
      console.log(err);
      message.error(
        error?.message ? error?.message : "خطا در ورود مجدد تلاش کنید"
      );
    }
  };

  useEffect(() => {
    if (data && data?.adminLogin) {
      TokenManager.setToken(data.adminLogin.token, "REFRESH_TOKEN");
      setTimeout(() => {
        window.location.replace(map.routes.users);
      }, 1000);
    }
  }, [data]);

  return (
    <div className="flex-row-center login-wrapper">
      <div className="banner">
        <span>.خوش آمدید</span>
      </div>
      <div className="form-container">
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
              placeholder="Username"
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
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
