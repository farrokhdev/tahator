import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const AddUserCatModal = ({ addModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="ایجاد دسته بندی جدید"
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

export default AddUserCatModal;
