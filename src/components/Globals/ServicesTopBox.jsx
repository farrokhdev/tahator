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

import { AddServiceForm } from "../Forms/AddServiceForm";
import { EditServiceForm } from "../Forms/EditServiceForm";

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

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

export const ServicesTopBox = ({
  filter = {},
  showModal = "",
  visible = "",
  hideModal = "",
  editVisible = "",
  hideEditModal = "",
  edit = "",
  create = "",
  getAll = "",
  getByFilter = "",
  createForm = "",
  editForm = "",
  searchForm = "",
  loading,
  usersData = "",
  usersLoading = "",
  CategoriesData = "",
  CategoriesLoading = "",
  CurrencysData = "",
  CurrencysLoading = "",
}) => {
  // DROP DOWN OPRATIONS
  const [dropVisible, setDropVisible] = useState(false);
  const openDrop = () => {
    setDropVisible(!dropVisible);
  };

  // on search
  const onSearch = (values) => {
    console.log(values);
    try {
      getByFilter({
        name: {
          lang: values.name,
          value: values.name,
        },
        accepted: values.accepted,
      });
      setDropVisible(!dropVisible);
    } catch (err) {
      console.log(err);
    }
  };

  // get all
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
                    name={"name"}
                    label={filter && filter?.first}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select defaultValue={"زبان"}>
                      <Option value={"en"}>en</Option>
                      <Option value={"tr"}>tr</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={"accepted"}
                    label={filter && filter?.second}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select defaultValue={"وضعیت"}>
                      <Option value={true}>تایید شده</Option>
                      <Option value={false}>تایید نشده</Option>
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
        title={" ایجاد سرویس"}
        visible={visible}
        hideModal={hideModal}
        formName={"add-service"}
      >
        <AddServiceForm
          onFinish={create}
          formRef={createForm}
          usersData={usersData}
          usersLoading={usersLoading}
          CategoriesData={CategoriesData}
          CategoriesLoading={CategoriesLoading}
          CurrencysData={CurrencysData}
          CurrencysLoading={CurrencysLoading}
        />
      </GlobModal>
      {/* ADD MODAL END */}
      {/* EDIT MODAL */}
      <GlobModal
        title={" ویرایش سرویس"}
        visible={editVisible}
        hideModal={hideEditModal}
        formName={"edit-service"}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <EditServiceForm
            onFinish={edit}
            formRef={editForm}
            usersData={usersData}
            usersLoading={usersLoading}
            CategoriesData={CategoriesData}
            CategoriesLoading={CategoriesLoading}
            CurrencysData={CurrencysData}
            CurrencysLoading={CurrencysLoading}
          />
        )}
      </GlobModal>
      {/* EDIT MODAL END */}
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

        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            ایجاد
          </Button>
        </div>
      </div>
    </>
  );
};
