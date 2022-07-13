import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  FileProtectOutlined,
  DollarCircleOutlined,
  WalletOutlined,
  BlockOutlined,
  SelectOutlined,
  UserOutlined,
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
            <Link to="/users">کاربر ها</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/orders" ? "ant-menu-item-selected" : ""
            }
            key="12"
            icon={<FileProtectOutlined />}
          >
            <Link to="/orders"> سفارشات</Link>
          </Menu.Item>
          <Menu.SubMenu
            title={
              <>
                <DollarCircleOutlined />
                <span>مدیریت مالی</span>
              </>
            }
          >
            <Menu.Item
              className={
                location?.pathname === "/financial-management"
                  ? "ant-menu-item-selected"
                  : ""
              }
              key="3"
              icon={<WalletOutlined />}
            >
              <Link to="/financial-management"> سود حساب ها</Link>
            </Menu.Item>
            <Menu.Item
              className={
                location?.pathname === "/user-wallet"
                  ? "ant-menu-item-selected"
                  : ""
              }
              key="4"
              icon={<WalletOutlined />}
            >
              <Link to="/user-wallet">کیف پول کاربران </Link>
            </Menu.Item>
            <Menu.Item
              className={
                location?.pathname === "/settelments"
                  ? "ant-menu-item-selected"
                  : ""
              }
              key="5"
              icon={<WalletOutlined />}
            >
              <Link to="/settelments"> درخواست برداشت </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item
            className={
              location?.pathname === "/categories"
                ? "ant-menu-item-selected"
                : ""
            }
            key="6"
            icon={<BlockOutlined />}
          >
            <Link to="/categories"> دسته بندی ها</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/categories-atribute"
                ? "ant-menu-item-selected"
                : ""
            }
            key="7"
            icon={<BlockOutlined />}
          >
            <Link to="/categories-atribute">ویژگی دسته بندی ها</Link>
          </Menu.Item>
          <Menu.Item
            className={
              location?.pathname === "/services" ? "ant-menu-item-selected" : ""
            }
            key="10"
            icon={<SelectOutlined />}
          >
            <Link to="/services"> خدمات</Link>
          </Menu.Item>

          {/* <Menu.Item
            className={
              location?.pathname === "/roles" ? "ant-menu-item-selected" : ""
            }
            key="8"
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/roles">نقش ها</Link>
          </Menu.Item> */}

          <Menu.Item
            className={
              location?.pathname === "/admins" ? "ant-menu-item-selected" : ""
            }
            key="9"
            icon={<UserOutlined />}
          >
            <Link to="/admins">مدیران</Link>
          </Menu.Item>

          {/* <Menu.Item
            className={
              location?.pathname === "/units" ? "ant-menu-item-selected" : ""
            }
            key="11"
            icon={<UsergroupAddOutlined />}
          >
            <Link to="/units"> یونیت ها</Link>
          </Menu.Item> */}
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
