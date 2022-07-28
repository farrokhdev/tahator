import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, Popconfirm, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetByfilter,
  UserGetSingle,
} from "../CrudOprations/UserOprations";

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
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/users";

export const UsersComp = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);
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
  const { getUsersList } = useGetUsers();
  const getUserData = () => {
    dispatch(fetchAllUsers(getUsersList));
  };
  useEffect(() => {
    getUserData();
  }, []);

  // filter
  const FilterOp = (filter) => {
    // UserGetByfilter(getUsersList, setUsers, filter, searchForm);
  };

  // add
  const { createUser, addData, addLoading, addError, addrefetchHandler } =
    useAddUser();

  const createOp = (input) => {
    console.log(input);
    UserCreate(createUser, input, getUserData, createForm, hideModal, addError);
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
    UserEdit(updateUser, input, id, getUserData, hideEditModal, editError);
  };

  // delete
  const { removeUser, deleteData, deleteLoading, deleteError } =
    useDeleteUser();

  const deleteOp = (id) => {
    UserDelete(removeUser, id, getUserData, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: t("users.indicator"),
      // dataIndex: "_id",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return num;
      },
    },
    {
      title: t("users.fullname"),
      dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.fullName}</>;
      },
    },
    {
      title: t("users.phoneNumber"),
      dataIndex: "phoneNumber",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.phoneNumber}</>;
      },
    },
    {
      title: t("users.country"),
      dataIndex: "country",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.country}</>;
      },
    },
    {
      title: t("users.adress"),
      dataIndex: "address",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.address}</>;
      },
    },
    {
      title: t("users.cash"),
      // dataIndex: "wallet",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return (
          <>
            {
              <CurrencyFormat
                value={record?.cashWallet}
                // suffix={"ریال"}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </>
        );
      },
    },
    {
      title: t("users.type"),
      dataIndex: "type",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record.type == "Real" ? (
              <Tag color={"yellow"}>{"حقیقی"}</Tag>
            ) : (
              <Tag color={"green"}>{"حقوقی"}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: t("users.changes"),
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
              gap: "10px",
              justifyContent: "space-evenly",
            }}
          >
            <Button type="primary" onClick={() => singleUser(record._id)}>
              جزییات
            </Button>
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
        data={usersData.users[0]}
        columns={columns}
        loading={usersData.loading}
        error={usersData.error}
      />
    </>
  );
};
