import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import {
  getUsersHandler,
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
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router";

export const FinancialManagementComp = () => {
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
  const { getUsersList, usersLoading, usersError } = useGetUsers();

  const [users, setUsers] = useState([]);
  const refetchHandler = () => {
    getUsersHandler(getUsersList, setUsers);
  };

  useEffect(() => {
    getUsersHandler(getUsersList, setUsers);
  }, []);

  // filter
  const FilterOp = (filter) => {
    UserGetByfilter(getUsersList, setUsers, filter, searchForm);
  };

  // add
  const { createUser, addData, addLoading, addError, addrefetchHandler } =
    useAddUser();

  const createOp = (input) => {
    console.log(input);
    UserCreate(
      createUser,
      input,
      refetchHandler,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getUser,
    singleUserData,
    singleUserLoading,
    singleUserError,
    singlerefetchHandler,
  } = useGetUser();

  const getSingleOp = (id) => {
    UserGetSingle(getUser, id, setId, editForm);
  };

  // edit
  const { updateUser, editData, editLoading, editError } = useEditUser();

  const editOp = (input) => {
    UserEdit(updateUser, input, id, refetchHandler, hideEditModal, editError);
  };

  // delete
  const { removeUser, deleteData, deleteLoading, deleteError } =
    useDeleteUser();

  const deleteOp = (id) => {
    UserDelete(removeUser, id, refetchHandler, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "درصد سود ماهیانه نقدی",
      // dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      // render: (_, record) => {
      //   return <>{record?.fullName}</>;
      // },
    },
    {
      title: "درصد سود ماهیانه تهاتری",
      // dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      // render: (_, record) => {
      //   return <>{record?.fullName}</>;
      // },
    },
    {
      title: "تاریخ فعال سازی",
      // dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      // render: (_, record) => {
      //   return <>{record?.fullName}</>;
      // },
    },

    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "20%",
      align: "center",
      render: (_, record) => {
        return (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography.Link onClick={() => showEditModal(record)}>
              <EditOutlined />
            </Typography.Link>
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

  // Navigate
  const Navigate = useNavigate();

  const singleUser = (id) => {
    Navigate(`/users/${id}`);
  };

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
        data={users}
        columns={columns}
        loading={usersLoading}
        error={usersError}
      />
    </>
  );
};
