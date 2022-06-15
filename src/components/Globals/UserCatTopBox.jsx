import React, { useEffect, useState } from "react";
import { Button, Input, Dropdown, Menu, Space, message } from "antd";
import AddAdminModal from "../modals/AddAdminModal";
import { AddAdminForm } from "../Forms/AddAdminForm";
import AddUserCatModal from "../modals/AddUserCatModal";
import { AddUserCatForm } from "../Forms/AddUserCatForm";

const { Search } = Input;

export const UserCatTopBox = ({
  searchText,
  btnText,
  filterUsers = "",
  refetch = "",
  error = "",
  createUserCat = "",
}) => {
  // MODAL OPRATIONS
  const [addModal, setAddModal] = useState(false);
  const showModal = () => {
    setAddModal(true);
  };
  const hideModal = () => {
    setAddModal(false);
  };
  // MODAL OPRATIONS END

  const addUserCategory = (values) => {
    try {
      createUserCat({
        variables: {
          title: values.title,
          key: values.key,
          description: values.description,
        },
      }).then(() => {
        message.success("دسته بندی با موفقیت ساخته شد");
        hideModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(error?.message ? error?.message : "خطا مجددا تلاش کنید");
    }
  };
  return (
    <>
      {/* ADD USER MODAL */}
      <AddUserCatModal addModal={addModal} hideModal={hideModal}>
        <AddUserCatForm onFinish={addUserCategory} />
      </AddUserCatModal>
      {/* ADD USER MODAL END */}
      <div className="top-box">
        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            {btnText}
          </Button>
        </div>
      </div>
    </>
  );
};
