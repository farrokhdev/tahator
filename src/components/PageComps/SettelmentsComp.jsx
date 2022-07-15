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
import {
  useFinishSettelment,
  useGetSettlements,
} from "../../hooks/useSettelments";
import {
  getSettelmentsHandler,
  SettelmentFinish,
  SettelmentGetByfilter,
} from "../CrudOprations/SettelmentOprations";
import GlobModal from "../modals/GlobModal";
import { FinishSettelmentForm } from "../Forms/FinishSettelmentForm";

export const SettelmentsComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [finishForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // Form Refs End

  // Id
  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getSettlementList, settlementLoading, settlementError } =
    useGetSettlements();

  const [settelments, setSettelments] = useState([]);
  const refetchHandler = () => {
    getSettelmentsHandler(getSettlementList, setSettelments);
  };

  useEffect(() => {
    getSettelmentsHandler(getSettlementList, setSettelments);
  }, []);

  // filter
  const FilterOp = (filter) => {
    SettelmentGetByfilter(
      getSettlementList,
      setSettelments,
      filter,
      searchForm
    );
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

  // finish
  const { finishSettelmentReq, finishData, finishError, finishLoading } =
    useFinishSettelment();

  const finishOp = (input) => {
    console.log(input);
    SettelmentFinish(
      finishSettelmentReq,
      {
        description: input.description,
        status: 2,
      },
      id,
      refetchHandler,
      finishForm,
      hideModal,
      finishError
    );
  };

  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "شناسه",
      // dataIndex: "_id",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return num;
      },
    },
    {
      title: "نام کامل",
      dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return <>{record?.userId?.fullName}</>;
      },
    },

    {
      title: "کشور",
      dataIndex: "country",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.userId?.country}</>;
      },
    },
    {
      title: "آدرس",
      dataIndex: "address",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.userId?.address}</>;
      },
    },

    {
      title: "نوع",
      dataIndex: "type",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.userId.type == "Real" ? (
              <Tag color={"yellow"}>{"حقیقی"}</Tag>
            ) : (
              <Tag color={"green"}>{"حقوقی"}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: " موجودی نقدی",
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
                value={record?.userId?.cashWallet}
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
      title: " شماره حساب",
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
                value={record?.creditCardNO}
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
      title: "میزان درخواستی",
      // dataIndex: "wallet",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return <>{record?.amount}</>;
      },
    },
    {
      title: "وضعیت",
      // dataIndex: "wallet",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return (
          <>
            {record?.status == 1
              ? "ساخته شده"
              : record?.status == 2
              ? " پرداخت شده"
              : record?.status == 3
              ? " رد شده"
              : ""}
          </>
        );
      },
    },
    {
      title: "تایید",
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
            <Typography.Link
              onClick={() => showFinishModal(record)}
              style={{ color: "green" }}
            >
              <CheckSquareOutlined style={{ color: "green" }} />
              تایید
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

  const hideWalletModal = () => {
    setWalletVisible(false);
  };

  const [finishVisible, setFinishVisible] = useState(false);

  const showFinishModal = async (record) => {
    setId(record._id);
    setFinishVisible(true);
  };

  const hideFinishModal = () => {
    setFinishVisible(false);
  };

  // MODAL OPRATIONS END

  // Navigate
  const Navigate = useNavigate();

  const singleUser = (id) => {
    Navigate(`/users/${id}`);
  };

  return (
    <>
      {/* FINISH MODAL  */}
      <GlobModal
        title={"کیف پول"}
        visible={finishVisible}
        hideModal={hideFinishModal}
        formName={"finish-settelment"}
      >
        <FinishSettelmentForm onFinish={finishOp} formRef={finishForm} />
      </GlobModal>
      {/* FINISH MODAL END */}
      {/* <UsersTopBox
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
        getAll={getSettlementList}
        getByFilter={FilterOp}
        createForm={createForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleUserLoading}
        singleUserData={singleUserData}
      /> */}
      <DefaultTable
        form={form}
        data={settelments}
        columns={columns}
        loading={settlementLoading}
        error={settlementError}
      />
    </>
  );
};
