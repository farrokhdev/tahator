import React, { useEffect, useState } from "react";
import {
  Tabs,
  Button,
  Input,
  Dropdown,
  Menu,
  Space,
  message,
  Spin,
  Form,
  Select,
} from "antd";
import { DownOutlined, UpOutlined, SearchOutlined } from "@ant-design/icons";
import GlobModal from "../modals/GlobModal";
import { AddAdminForm } from "../Forms/AddAdminForm";
import { EditAdminForm } from "../Forms/EditAdminForm";
import { useGetServices } from "../../hooks/useServices";
import { useGetUsers } from "../../hooks/useUsers";

const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const validateMessages = {
  required: "${label} پر کردن این فیلد ضروری میباشد!",
  types: {
    email: "${label} ایمیل معتبر نمیباشد!",
    number: "${label} شماره تلفن معتبر نیست!",
  },
  number: {
    range: "${label} باید بین ${min} و ${max} باشد",
  },
};

export const OrdersTopBox = ({
  filter = {},
  showModal = "",
  visible = "",
  hideModal = "",
  editVisible = "",
  hideEditModal = "",
  detVisible = "",
  hideDetailModal = "",
  edit = "",
  create = "",
  getAll = "",
  getByFilter = "",
  createForm = "",
  editForm = "",
  searchForm = "",
  loading,
  orderDetails = "",
}) => {
  // get services
  const {
    getServicesList,
    servicesData,
    servicesLoading,
    servicesError,
    servicesRefetch,
  } = useGetServices();
  const { getUsersList, usersData, usersLoading, usersError, refetch } =
    useGetUsers();

  // DROP DOWN OPRATIONS
  const [dropVisible, setDropVisible] = useState(false);
  const openDrop = async () => {
    await getServicesAndUsers();
    setDropVisible(!dropVisible);
  };

  const getServicesAndUsers = async () => {
    await getServicesList();
    await getUsersList();
  };

  // on search
  const onSearch = (values) => {
    try {
      getByFilter({
        ...values,
      });
      setDropVisible(!dropVisible);
    } catch (err) {
      console.log(err);
    }
  };

  //   get all
  const getAllData = async () => {
    await getAll()
      .then(() => searchForm.resetFields())
      .then(() => setDropVisible(false));
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Tabs defaultActiveKey="1">
              <TabPane key="1">
                <Form
                  form={searchForm}
                  onFinish={onSearch}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name={"accepted"}
                    label={filter && filter?.first}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select defaultValue={true}>
                      <Option value={true}>تایید شده</Option>
                      <Option value={false}>تایید نشده</Option>
                    </Select>
                  </Form.Item>
                  {/* <Form.Item
                    name={"service"}
                    label={filter && filter?.second}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select defaultValue={servicesData?.getServices[0]._id}>
                      {servicesLoading ? (
                        <Spin spinning={servicesLoading} />
                      ) : (
                        <>
                          {servicesData?.getServices.map((service) => {
                            return (
                              <Option value={service._id}>
                                {service?.name.map((item) => (
                                  <>{item.value} ,</>
                                ))}
                              </Option>
                            );
                          })}
                        </>
                      )}
                    </Select>
                  </Form.Item> */}
                  <Form.Item
                    name={"buyer"}
                    label={filter && filter?.third}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select defaultValue={usersData?.getUsers[0]._id}>
                      {usersLoading ? (
                        <Spin spinning={usersLoading} />
                      ) : (
                        <>
                          {usersData?.getUsers?.map((user, i) => {
                            return (
                              <Option key={i} value={user._id}>
                                {user.fullName}
                              </Option>
                            );
                          })}
                        </>
                      )}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                    >
                      جستجو
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          ),
          key: "0",
        },
      ]}
    />
  );
  // DROP DOWN OPRATIONS END
  // MODAL OPRATIONS

  // MODAL OPRATIONS END

  return (
    <>
      {/* ADD MODAL */}
      <GlobModal
        title={"جزییات خرید"}
        visible={detVisible}
        hideModal={hideDetailModal}
      >
        <div className="details-box">
          {loading ? (
            <Spin spinning={loading} />
          ) : (
            <>
              <div className="det-title">جزییات خرید</div>
              <div className="det-content"></div>
            </>
          )}
        </div>
      </GlobModal>
      {/* ADD MODAL END */}

      <div className="top-box">
        <div className="search">
          <Dropdown overlay={menu} trigger={["click"]} visible={dropVisible}>
            <Button
              type="primary"
              icon={dropVisible ? <UpOutlined /> : <DownOutlined />}
              onClick={openDrop}
            >
              فیلتر
            </Button>
          </Dropdown>
          <Button type="primary" onClick={getAllData}>
            همه
          </Button>
        </div>
      </div>
    </>
  );
};
