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
  InputNumber,
} from "antd";
import { DownOutlined, UpOutlined, SearchOutlined } from "@ant-design/icons";
import GlobModal from "../modals/GlobModal";
import { AddUserForm } from "../Forms/AddUserForm";
import { EditUserForm } from "../Forms/EditUserForm";
import { BsFillWalletFill } from "react-icons/bs";
import { useChargeWallet } from "../../hooks/useWallet";
import { t } from "i18next";

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
  // charge wallet hook
  const {
    chargeUserWallet,
    chargeData,
    chargeLoading,
    chargeError,
    walletRefetch,
  } = useChargeWallet();

  // DROP DOWN OPRATIONS
  const [dropVisible, setDropVisible] = useState(false);
  const openDrop = () => {
    setDropVisible(!dropVisible);
  };

  // on search
  const onSearch = async (values) => {
    Object.keys(values).forEach((k) => values[k] == null && delete values[k]);

    try {
      getByFilter(values);
      setDropVisible(!dropVisible);
    } catch (err) {
      console.log(err);
    }
  };

  // Increase number
  const [walletNumber, setWalletNumber] = useState();
  const increase = (e) => {
    console.log(e);
    setWalletNumber(e);
  };
  // Decrease number
  const decrease = (e) => {
    console.log(e);
    setWalletNumber(e);
  };
  const handleCharge = async () => {
    try {
      chargeUserWallet({
        variables: {
          amount: walletNumber,
          id: singleUserData?.getUser?._id,
        },
      }).then(() => walletRefetch());
    } catch (err) {
      console.log(err);
    }
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={"phoneNumber"}
                    label={filter && filter?.second}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name={"email"} label={filter && filter?.third}>
                    <Input />
                  </Form.Item>
                  <Form.Item label={filter && filter?.forth} name="type">
                    <Select
                      defaultValue="حقیقی"
                      style={{
                        width: "50%",
                      }}
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
          <Spin spinning={loading ? loading : chargeLoading} />
        ) : (
          <div className="flex-col-center gap-10">
            <div className="wallet-card flex-col-center">
              <h4>مشخصات کاربر</h4>
              <div className="flex-row fwidth gap-10">
                <span>{t("users.fullname") + ":"}</span>
                <span>{singleUserData && singleUserData.getUser.fullName}</span>
              </div>
              <div className="flex-row fwidth gap-10">
                <span>{t("users.phoneNumber") + ":"}</span>
                <span>
                  {singleUserData && singleUserData.getUser.phoneNumber}
                </span>
              </div>
              <div className="flex-row fwidth gap-10">
                <span>{t("users.adress") + ":"}</span>
                <span>{singleUserData && singleUserData.getUser.address}</span>
              </div>
            </div>
            <BsFillWalletFill className="wallet-icon" />
            <div className="flex-row">
              <div className="wallet-amount">
                <span> {t("users.cash") + ":"} </span>
                <span>
                  {singleUserData && singleUserData.getUser.cashWallet.amount}
                </span>
              </div>
            </div>
            <div className="wallet-func">
              <div>
                <InputNumber defaultValue={0} onChange={(e) => decrease(e)} />
                <Button type="primary" onClick={handleCharge}>
                  کاهش
                </Button>
              </div>
              <div>
                <InputNumber defaultValue={0} onChange={(e) => increase(e)} />
                <Button type="primary" onClick={handleCharge}>
                  افزایش{" "}
                </Button>
              </div>
            </div>
          </div>
        )}
      </GlobModal>
      {/* Wallet MODAL END */}
      {/* ADD MODAL */}
      <GlobModal
        title={" ایجاد کاربر"}
        visible={visible}
        hideModal={hideModal}
        formName={"add-user"}
      >
        <AddUserForm onFinish={create} formRef={createForm} />
      </GlobModal>
      {/* ADD MODAL END */}
      {/* EDIT MODAL */}
      <GlobModal
        title={" ویرایش کاربر"}
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
              {t("topBox.filter")}
            </Button>
          </Dropdown>
          <Button type="primary" onClick={() => getByFilter()}>
            {t("topBox.all")}
          </Button>
        </div>

        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            {t("topBox.create")}
          </Button>
        </div>
      </div>
    </>
  );
};
