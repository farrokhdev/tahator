import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
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
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router";
import GlobModal from "../modals/GlobModal";
import { AddTransactionForm } from "../Forms/AddTransactionForm";
import { useAddTransaction } from "../../hooks/useTransaction";
import { TransactionCreate } from "../CrudOprations/TransactionOpration";

export const UserWalletComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  const [formSingle] = Form.useForm();
  const [editForm] = Form.useForm();
  const [transForm] = Form.useForm();
  // Form Refs End

  // Id
  const [id, setId] = useState(null);
  const [payId, setPayId] = useState(null);

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

  // add
  const {
    createTransaction,
    addData,
    addLoading,
    addError,
    addrefetchHandler,
  } = useAddTransaction();

  const createOp = (input) => {
    console.log(input);
    TransactionCreate(
      createTransaction,
      {
        id: id,
        type: input.type,
        wallet: input.wallet,
        amount: input.amount,
      },
      refetchHandler,
      transForm,
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
        return <>{record?.fullName}</>;
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
      title: " موجودی  تهاتری",
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
                value={record?.barter}
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
      title: "تراکنش ها ",
      // dataIndex: "wallet",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return (
          <>
            <Typography.Link onClick={() => showPeymentModal(record)}>
              نمایش
            </Typography.Link>
          </>
        );
      },
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
            <Button type="primary" onClick={() => showModal(record)}>
              شارژ موجودی
            </Button>
          </span>
        );
      },
    },
  ];

  // TABLE COLUMN END
  // Payments TABLE COLUMN
  const paymentsColumns = [
    {
      title: "نوع",
      dataIndex: "type",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return <>{record?.type}</>;
      },
    },
    {
      title: "کاربر",
      dataIndex: "user",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return <>{record?.user?.fullName}</>;
      },
    },
    {
      title: "خریدار",
      dataIndex: "provider",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return <>{record?.provider?.fullName}</>;
      },
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return <>{record?.status}</>;
      },
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record, num) => {
        return <>{record?.description}</>;
      },
    },
  ];

  //Payments TABLE COLUMN END

  // MODAL OPRATIONS
  const [visible, setVisible] = useState(false);

  const showModal = async (record) => {
    console.log(record);
    await getSingleOp(record._id);

    await setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [peymentVisible, setPeymentVisible] = useState(false);

  const showPeymentModal = async (record) => {
    getSingleOp(record._id);
    setPeymentVisible(true);
  };

  const hidePeymentModal = () => {
    setPeymentVisible(false);
  };

  // MODAL OPRATIONS END

  console.log(singleUserData);
  return (
    <>
      {/* TRANSACTION MODAL */}
      <GlobModal
        title={"شارژ موجودی"}
        visible={visible}
        hideModal={hideModal}
        formName={"wallet"}
      >
        <AddTransactionForm onFinish={createOp} formRef={transForm} />
      </GlobModal>
      {/* TRANSACTION MODAL END */}
      {/* PEYMENT MODAL */}
      <GlobModal
        className="peymentModal"
        title={"تراکنش ها"}
        visible={peymentVisible}
        hideModal={hidePeymentModal}
      >
        <DefaultTable
          // className="test"
          form={formSingle}
          data={singleUserData?.getUser?.payments}
          columns={paymentsColumns}
          loading={singleUserLoading}
          error={singleUserError}
        />
      </GlobModal>
      {/* PEYMENT MODAL END */}

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
