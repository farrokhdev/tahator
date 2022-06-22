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
import { AddCatAtrsForm } from "../Forms/AddCatAtrsForm";
import { EditCatAtrsForm } from "../Forms/EditCatAtrsForm";

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

export const CategoriesAtrTopBox = ({
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
  CategoriesData,
  CategoriesLoading,
}) => {
  // DROP DOWN OPRATIONS
  const [dropVisible, setDropVisible] = useState(false);
  const openDrop = () => {
    setDropVisible(!dropVisible);
  };

  // on search
  const onSearch = (values) => {
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
        title={" ایجاد ادمین"}
        visible={visible}
        hideModal={hideModal}
        formName={"add-category_atrrs"}
      >
        <AddCatAtrsForm
          onFinish={create}
          formRef={createForm}
          CategoriesData={CategoriesData}
          CategoriesLoading={CategoriesLoading}
        />
      </GlobModal>
      {/* ADD MODAL END */}
      {/* EDIT MODAL */}
      <GlobModal
        title={" ویرایش ویژگی دسته بندی"}
        visible={editVisible}
        hideModal={hideEditModal}
        formName={"edit-category_atrrs"}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <EditCatAtrsForm
            onFinish={edit}
            formRef={editForm}
            CategoriesData={CategoriesData}
            CategoriesLoading={CategoriesLoading}
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
