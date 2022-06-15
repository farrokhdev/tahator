import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Spin, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useFilterUsers,
  useGetUsers,
  useAddUser,
  useDeleteUser,
  useEditUser,
  useGetUser,
} from "../../hooks/useUsers";
import { TopBox } from "../Globals/TopBox";
import EditUserModal from "../modals/EditUserModal";
import { EditUserForm } from "../Forms/EditUserForm";
import { useNavigate, useParams } from "react-router";
import {
  useAddAdmin,
  useDeleteAdmin,
  useEditAdmin,
  useGetAdmin,
  useGetAdmins,
} from "../../hooks/useAdmins";
import { UserCatTopBox } from "../Globals/UserCatTopBox";
import EditAdminModal from "../modals/EditAdminModal";
import { EditAdminForm } from "../Forms/EditAdminForm";
import {
  useAddUserCat,
  useDeleteUserCat,
  useEditUserCat,
  useGetUserCats,
} from "../../hooks/useUserCategories";
import { AddUserCatForm } from "../Forms/AddUserCatForm";

import AddUserCatModal from "../modals/AddUserCatModal";
import EditUserCatModal from "../modals/EditUserCatModal";
import { EditUserCatForm } from "../Forms/EditUserCatForm";

export const UserCategoriesComp = () => {
  // CRUD OPRATIONS
  const { userCatsData, userCatsLoading, userCatsError, refetch } =
    useGetUserCats();

  const { createUserCat, addData, addLoading, addError } = useAddUserCat();
  const { removeUserCat, deleteData, deleteLoading, deleteError } =
    useDeleteUserCat();

  const { updateUserCat, editData, editLoading, editError, editRefetch } =
    useEditUserCat();

  // CRUD OPRATIONS END

  // user ID
  const [userID, setUserId] = useState(null);
  // user ID END

  // TABLE COLUMN
  const columns = [
    {
      title: "عنوان ",
      dataIndex: "title",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "کلید واژه",
      dataIndex: "key",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      width: "20%",
      editable: true,
      align: "center",
    },

    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "40%",
      align: "center",
      render: (_, record) => {
        return (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Typography.Link onClick={() => showEditModal(record)}>
              <EditOutlined />
            </Typography.Link>

            <Typography.Link>
              <Popconfirm
                onConfirm={() => remove(record)}
                title="آیا مطمئن هستید؟"
                okText={"حذف"}
                cancelText={"انصراف"}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  // TABLE COLUMN END

  // TABLE ACTIONS
  const remove = (record) => {
    console.log(record);
    try {
      removeUserCat({
        variables: {
          id: record._id,
        },
      }).then(() => {
        message.success("دسته بندی با موفقیت حذف شد");
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(
        deleteError?.message ? deleteError?.message : "حذف با خطا مواجه شد"
      );
    }
  };

  // EDIT MODAL
  const [initialVal, setInitialVal] = useState({
    title: "",
    key: "",
    description: "",
  });

  const [editModal, setEditModal] = useState(false);
  const showEditModal = async (record) => {
    setEditModal(true);

    setUserId(record._id);
    setInitialVal({
      ...initialVal,
      title: record.title,
      key: record.key,
      description: record.description,
    });
  };

  const hideEditModal = () => {
    setEditModal(false);
    setInitialVal({
      ...initialVal,
      title: "",
      key: "",
      description: "",
    });
  };

  // EDIT MODAL END

  // TABLE ACTIONS END

  // form validation
  const [form] = Form.useForm();
  // form validation end

  // NAVIGATE HANDLER
  const Navigate = useNavigate();

  const gotToDetailsPage = (id) => {
    Navigate(`/users/wallet/${id}`);
  };

  return (
    <>
      {/* EDIT MODAL  */}
      <EditUserCatModal visible={editModal} closeModal={hideEditModal}>
        <EditUserCatForm
          update={updateUserCat}
          refetch={refetch}
          userID={userID}
          editError={editError}
          hideEditModal={hideEditModal}
          userCatsData={userCatsData?.getUserCategories}
        />
      </EditUserCatModal>
      {/* EDIT MODAL END */}
      <UserCatTopBox
        btnText={"ایجاد دسته بندی جدید"}
        refetch={refetch}
        createUserCat={createUserCat}
      />
      <DefaultTable
        form={form}
        data={userCatsData?.getUserCategories}
        columns={columns}
        loading={userCatsLoading}
        error={userCatsError}
      />
    </>
  );
};
