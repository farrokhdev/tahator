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
} from "antd";
import { DownOutlined, UpOutlined, SearchOutlined } from "@ant-design/icons";
import GlobModal from "../modals/GlobModal";
import { AddAdminForm } from "../Forms/AddAdminForm";
import { EditAdminForm } from "../Forms/EditAdminForm";
import { AddRoleForm } from "../Forms/AddRoleForm";
import { EditRoleForm } from "../Forms/EditRoleForm";

const { Search } = Input;
const { TabPane } = Tabs;

export const RolesTopBox = ({
  showModal = "",
  visible = "",
  hideModal = "",
  editVisible = "",
  hideEditModal = "",
  edit = "",
  create = "",
  createForm = "",
  editForm = "",
  loading,
}) => {
  return (
    <>
      {/* ADD MODAL */}
      <GlobModal
        title={" ایجاد نقش"}
        visible={visible}
        hideModal={hideModal}
        formName={"add-role"}
      >
        <AddRoleForm onFinish={create} formRef={createForm} />
      </GlobModal>
      {/* ADD MODAL END */}
      {/* EDIT MODAL */}
      <GlobModal
        title={" ویرایش نقش"}
        visible={editVisible}
        hideModal={hideEditModal}
        formName={"edit-role"}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <>
            <EditRoleForm onFinish={edit} formRef={editForm} />
          </>
        )}
      </GlobModal>
      {/* EDIT MODAL END */}
      <div className="top-box">
        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            ایجاد نقش جدید
          </Button>
        </div>
      </div>
    </>
  );
};
