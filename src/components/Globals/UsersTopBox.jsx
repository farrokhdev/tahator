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
  Card,
  Typography,
} from "antd";
import { DownOutlined, UpOutlined, SearchOutlined } from "@ant-design/icons";
import GlobModal from "../modals/GlobModal";
import { AddUserForm } from "../Forms/AddUserForm";
import { EditUserForm } from "../Forms/EditUserForm";
import { BsFillWalletFill } from "react-icons/bs";

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

export const UsersTopBox = ({
  filter = "",
  showModal = "",
  visible = "",
  hideModal = "",
  editVisible = "",
  hideEditModal = "",
  walletVisible = "",
  hideWalletModal = "",
  edit = "",
  create = "",
  getAll = "",
  getByFilter = "",
  createForm = "",
  editForm = "",
  searchForm = "",
  loading = "",
  singleUserData = "",
}) => {
  // DROP DOWN OPRATIONS
  const [dropVisible, setDropVisible] = useState(false);
  const openDrop = () => {
    setDropVisible(!dropVisible);
  };
  const [realVals, setRealVals] = useState({});

  const onChange = (value) => {
    switch (value.id) {
      case "fullName":
        // code block
        setRealVals({ ...realVals, fullName: value.value });
        break;
      case "phoneNumber":
        setRealVals({ ...realVals, phoneNumber: value.value });

        break;
      case "email":
        // code block
        setRealVals({ ...realVals, email: value.value });
        break;
      case "type":
        // code block
        setRealVals({ ...realVals, type: value.value });
        break;
      default:
        // code block
        setRealVals({});
    }
  };

  // on search
  const onSearch = (values) => {
    console.log(realVals);
    try {
      getByFilter({ ...realVals });
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
                  <Form.Item name={"fullName"} label={filter && filter?.first}>
                    <Input onChange={(e) => onChange(e.target)} />
                  </Form.Item>
                  <Form.Item
                    name={"phoneNumber"}
                    label={filter && filter?.second}
                  >
                    <Input onChange={(e) => onChange(e.target)} />
                  </Form.Item>
                  <Form.Item name={"email"} label={filter && filter?.third}>
                    <Input onChange={(e) => onChange(e.target)} />
                  </Form.Item>
                  <Form.Item label={filter && filter?.forth} name="type">
                    <Select
                      defaultValue="حقیقی"
                      style={{
                        width: "50%",
                      }}
                      onChange={(e) => onChange(e.target)}
                    >
                      <Option value={"Real"}>حقیقی</Option>
                      <Option value={"Legal"}>حقوقی</Option>
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
      {/* Wallet MODAL */}
      <GlobModal
        title={"کیف پول"}
        visible={walletVisible}
        hideModal={hideWalletModal}
        formName={"wallet"}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <div className="flex-col-center gap-10">
            <div className="wallet-card flex-col-center">
              <h4>مشخصات کاربر</h4>
              <div className="flex-row fwidth gap-10">
                <span>نام کامل :</span>
                <span>{singleUserData && singleUserData.getUser.fullName}</span>
              </div>
              <div className="flex-row fwidth gap-10">
                <span>شماره تماس :</span>
                <span>
                  {singleUserData && singleUserData.getUser.phoneNumber}
                </span>
              </div>
              <div className="flex-row fwidth gap-10">
                <span>آدرس :</span>
                <span>{singleUserData && singleUserData.getUser.address}</span>
              </div>
            </div>
            <BsFillWalletFill className="wallet-icon" />
            <div className="flex-row">
              <div className="wallet-amount">
                <span> کیف پول : </span>
              <span>
                {singleUserData && singleUserData.getUser.cashWallet.amount}
              </span>
              </div>

            </div>
          </div>
        )}
      </GlobModal>
      {/* Wallet MODAL END */}
      {/* ADD MODAL */}
      <GlobModal
        title={" ایجاد ادمین"}
        visible={visible}
        hideModal={hideModal}
        formName={"add-user"}
      >
        <AddUserForm onFinish={create} formRef={createForm} />
      </GlobModal>
      {/* ADD MODAL END */}
      {/* EDIT MODAL */}
      <GlobModal
        title={" ویرایش ادمین"}
        visible={editVisible}
        hideModal={hideEditModal}
        formName={"edit-user"}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <EditUserForm onFinish={edit} formRef={editForm} />
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
