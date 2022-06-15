import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  DropboxOutlined,
  TransactionOutlined,
  PhoneOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/icon/logo.png";

import { Button, Layout, Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../../Context/authContext";
import TokenManager from "../../lib/tokenManager";
const { Header, Sider, Content } = Layout;

export const Template = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { access_token } = TokenManager.getToken();

  const logOutAdmin = () => {
    TokenManager.removeToken();
  };

  const location = useLocation();
  console.log(location);

  return (
    <Layout className="costum-template">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={Logo} alt="" />

          <h1
            className="logo-text"
            style={{
              visibility: `${collapsed ? "hidden" : "visible"}`,
              opacity: `${collapsed ? "0" : "1"}`,
              width: `${collapsed ? "0px" : "100%"}`,
              height: `${collapsed ? "0px" : "100%"}`,
              transform: `translateX(${collapsed ? "100%" : "0"})`,
            }}
          >
            سامانه ...
          </h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"

          // defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            className={
              location?.pathname === "/" ? "ant-menu-item-selected" : ""
            }
            key="1"
            icon={<DashboardOutlined />}
          >
            <Link to="/">داشبرد</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/users" ? "ant-menu-item-selected" : ""
            }
            key="2"
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/users">مدیریت کاربران</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/user-categories"
                ? "ant-menu-item-selected"
                : ""
            }
            key="3"
            icon={<DropboxOutlined />}
          >
            <Link to="/user-categories">دسته بندی کاربران</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/payments" ? "ant-menu-item-selected" : ""
            }
            key="4"
            icon={<TransactionOutlined />}
          >
            <Link to="/payments">تراکنش ها</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/user-calls"
                ? "ant-menu-item-selected"
                : ""
            }
            key="5"
            icon={<PhoneOutlined />}
          >
            <Link to="/user-calls">تماس های کاربران</Link>
          </Menu.Item>
          {/* <Menu.Item key="6" icon={<PhoneOutlined />}>
            <Link to="/settlement-requests">درخواست تسویه</Link>
          </Menu.Item> */}
          <Menu.Item
            className={
              location?.pathname === "/admins" ? "ant-menu-item-selected" : ""
            }
            key="7"
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/admins">مدیران</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header-costume"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div type="primary" className="logout" onClick={() => logOutAdmin()}>
            خروج
          </div>
        </Header>
        <Content
          className="site-layout-background costum-content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
