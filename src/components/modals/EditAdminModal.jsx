import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const EditAdminModal = ({ editModal, showModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="بروز رسانی ادمین"
        visible={editModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button
              type="primary"
              form="edit-user"
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

export default EditAdminModal;
