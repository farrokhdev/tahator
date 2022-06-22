import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, message, Popconfirm, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TopBox } from "../Globals/TopBox";
import { useGetUnits } from "../../hooks/useUnits";

import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetByfilter,
  UserGetSingle,
} from "../CrudOprations/UserOprations";

import { AddUserForm } from "../Forms/AddUserForm";
import {
  useAddUser,
  useGetUser,
  useGetUsers,
  useDeleteUser,
  useEditUser,
} from "../../hooks/useUsers";
import { UsersTopBox } from "../Globals/UsersTopBox";

export const UsersComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // Form Refs End

  // Id
  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getUsersList, usersData, usersLoading, usersError, refetch } =
    useGetUsers();

  useEffect(() => {
    getUsersList();
  }, []);

  // filter
  const FilterOp = (filters) => {
    UserGetByfilter(getUsersList, filters, refetch, usersError, searchForm);
  };

  // add
  const { createUser, addData, addLoading, addError, addRefetch } =
    useAddUser();

  const createOp = (input) => {
    console.log(input);
    UserCreate(createUser, input, refetch, createForm, hideModal, addError);
  };

  // get single
  const {
    getUser,
    singleUserData,
    singleUserLoading,
    singleUserError,
    singleRefetch,
  } = useGetUser();

  const getSingleOp = (id) => {
    UserGetSingle(getUser, id, setId, editForm);
  };

  // edit
  const { updateUser, editData, editLoading, editError } = useEditUser();

  const editOp = (input) => {
    UserEdit(updateUser, input, id, refetch, hideEditModal, editError);
  };

  // delete
  const { removeUser, deleteData, deleteLoading, deleteError } =
    useDeleteUser();

  const deleteOp = (id) => {
    UserDelete(removeUser, id, refetch, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام کامل",
      dataIndex: "fullName",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.fullName}</>;
      },
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.phoneNumber}</>;
      },
    },
    {
      title: "type",
      dataIndex: "type",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record.type == "Real" ? (
              <Tag color={"yellow"}>{record.type}</Tag>
            ) : (
              <Tag color={"green"}>{record.type}</Tag>
            )}
          </>
        );
      },
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
            <Typography.Link onClick={() => showWalletModal(record)}>
              کیف پول
            </Typography.Link>
            <Typography.Link>جزییات</Typography.Link>

            <Typography.Link>
              <Popconfirm
                onConfirm={() => deleteOp(record._id)}
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

  // MODAL OPRATIONS
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };
  const [walletVisible, setWalletVisible] = useState(false);

  const showWalletModal = async (record) => {
    getSingleOp(record._id);
    setWalletVisible(true);
  };

  const hideWalletModal = () => {
    setWalletVisible(false);
  };

  // MODAL OPRATIONS END

  return (
    <>
      <UsersTopBox
        filter={{
          first: "نام",
          second: "شماره",
          third: "ایمیل",
          forth: "نوع",
        }}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        walletVisible={walletVisible}
        hideWalletModal={hideWalletModal}
        edit={editOp}
        create={createOp}
        getAll={getUsersList}
        getByFilter={FilterOp}
        createForm={createForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleUserLoading}
        singleUserData={singleUserData}
      />
      <DefaultTable
        form={form}
        data={usersData?.getUsers}
        columns={columns}
        loading={usersLoading}
        error={usersError}
      />
    </>
  );
};
