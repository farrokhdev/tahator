import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const AddAdminModal = ({ addModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="ایجاد ادمین جدید"
        visible={addModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button
              type="primary"
              form="add-user"
              key="submit"
              htmlType="submit"
            >
              ثبت
            </Button>
            <Button type="primary" onClick={hideModal}>
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

export default AddAdminModal;
