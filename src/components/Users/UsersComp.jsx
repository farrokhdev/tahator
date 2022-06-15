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

export const UsersComp = () => {
  // CRUD OPRATIONS
  const { usersData, usersLoading, usersError, refetch } = useGetUsers();
  const { filterUsers, filterUsersData, filterUsersLoading, filterUsersError } =
    useFilterUsers();
  const { createUser, addData, addLoading, addError } = useAddUser();
  const { removeUser, deleteData, deleteLoading, deleteError } =
    useDeleteUser();
  const { updateUser, editData, editLoading, editError, editRefetch } =
    useEditUser();
  const {
    getSingleUser,
    singleUserData,
    singleUserLoading,
    singleUserError,
    singleRefetch,
  } = useGetUser();

  // CRUD OPRATIONS END

  // user ID
  const [userID, setUserId] = useState(null);
  // user ID END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام کامل",
      dataIndex: "fullName",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "نام کاربری",
      dataIndex: "username",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "کیف پول",
      dataIndex: "wallet",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "امتیاز",
      dataIndex: "rate",
      width: "10%",
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
            <Button type="primary" onClick={() => gotToDetailsPage(record._id)}>
              جزییات کیف پول
            </Button>
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
    try {
      removeUser({
        variables: {
          userId: record._id,
        },
      }).then(() => {
        message.success("کاربر با موفقیت حذف شد");
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(
        deleteError?.message
          ? deleteError?.message
          : "حذف کاربر با مشکل مواجه شد دوباره تلاش کنید"
      );
    }
  };

  // EDIT MODAL
  const [editModal, setEditModal] = useState(false);
  const showEditModal = (record) => {
    setUserId(record._id);
    setEditModal(true);
  };

  const hideEditModal = () => {
    setEditModal(false);
  };

  // EDIT MODAL END

  // TABLE ACTIONS END

  // form validation
  const [form] = Form.useForm();
  // form validation end

  // NAVIGATE HANDLER
  const Navigate = useNavigate();

  const gotToDetailsPage = (id) => {
    Navigate(`/users/wallet/${id}`, {
      state: { singleUserData, singleUserLoading, singleUserError },
    });
  };

  return (
    <>
      {/* EDIT MODAL  */}
      <EditUserModal
        editModal={editModal}
        showModal={showEditModal}
        hideModal={hideEditModal}
      >
        {singleUserLoading ? (
          <>
            <Spin spinning={singleUserLoading} />
          </>
        ) : (
          <EditUserForm
            userID={userID}
            singleUserData={singleUserData}
            getSingleUser={getSingleUser}
            singleRefetch={singleRefetch}
            refetch={refetch}
            updateUser={updateUser}
            editError={editError}
            hideEditModal={hideEditModal}
          />
        )}
      </EditUserModal>
      {/* EDIT MODAL END */}
      <TopBox
        searchText={"جستجو کاربر ..."}
        btnText={"ایجاد کاربر جدید"}
        filterUsers={filterUsers}
        refetch={refetch}
        data={filterUsersData}
        createUser={createUser}
      />
      <DefaultTable
        form={form}
        data={
          filterUsersData?.getUsers.length
            ? filterUsersData?.getUsers
            : usersData?.getUsers
        }
        columns={columns}
        loading={filterUsersLoading ? filterUsersLoading : usersLoading}
        error={usersError}
      />
    </>
  );
};
