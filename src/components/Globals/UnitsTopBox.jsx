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
import { AddCategoryForm } from "../Forms/AddCategoryForm";
import { EditCategoryForm } from "../Forms/EditCategoryForm";
import { AddUnitForm } from "../Forms/AddUnitForm";
import { EditUnitForm } from "../Forms/EditUnitForm";

const { Search } = Input;
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

const { Option } = Select;

export const UnitsTopBox = ({
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
  servicesData = "",
  servicesLoading = "",
  servicesError = "",
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
        name: { lang: values.name, value: values.name },
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
                    <Select defaultValue={"نام زبان"}>
                      <Option value="en">en</Option>
                      <Option value="tr">tr</Option>
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
                    <Select defaultValue={true}>
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
        title={" ایجاد یونیت"}
        visible={visible}
        hideModal={hideModal}
        formName={"add-unit"}
      >
        <AddUnitForm
          onFinish={create}
          formRef={createForm}
          data={servicesData?.getServices}
          loading={servicesLoading}
          error={servicesError}
        />
      </GlobModal>
      {/* ADD MODAL END */}
      {/* EDIT MODAL */}
      <GlobModal
        title={" ویرایش  یونیت"}
        visible={editVisible}
        hideModal={hideEditModal}
        formName={"edit-unit"}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <EditUnitForm
            onFinish={edit}
            formRef={editForm}
            data={servicesData?.getServices}
            loading={servicesLoading}
            error={servicesError}
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
