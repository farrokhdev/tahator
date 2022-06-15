import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const IncreamentWalletModal = ({
  visible,
  openModal,
  closeModal,
  children,
}) => {
  return (
    <>
      <Modal
        title="فرم افزایش موجودی"
        visible={visible}
        onCancel={closeModal}
        footer={[
          <>
            <Button
              type="primary"
              form="update-wallet-form"
              key="submit"
              htmlType="submit"
            >
              ثبت
            </Button>
            <Button type="primary" onClick={closeModal}>
              انصراف
            </Button>
          </>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default IncreamentWalletModal;
