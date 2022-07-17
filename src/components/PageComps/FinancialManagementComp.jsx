import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";

import { GetFinancialHandler } from "../CrudOprations/FinancialsOpration";

import { AddUserForm } from "../Forms/AddUserForm";

import { useGetFinancials } from "../../hooks/useWallet";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

export const FinancialManagementComp = () => {
  // redux
  const financialStates = useSelector((state) => state.financials);

  const dispatch = useDispatch();
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
  const {
    getFinancialList,
    financialError,
    financialLoading,
    financialRefetch,
  } = useGetFinancials();

  const [financial, setFinancials] = useState([]);

  const refetchHandler = () => {
    GetFinancialHandler(getFinancialList, setFinancials);
  };

  useEffect(() => {
    GetFinancialHandler(getFinancialList, setFinancials);
    // dispatch(GetFinancialHandler(getFinancialList, setFinancials));
  }, []);

  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: t("financials.mounthPercentCash"),
      // dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.profitCashFeePerMount}</>;
      },
    },
    {
      title: t("financials.mounthPercentBarter"),
      // dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return <>{record?.profitBarterFeePerMount}</>;
      },
    },
    {
      title: t("financials.incomes"),
      // dataIndex: "fullName",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.systemIncome}</>;
      },
    },

    {
      title: t("financials.changes"),
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
            <Typography.Link>
              <EditOutlined />
            </Typography.Link>
            <Typography.Link>
              <Popconfirm
                // onConfirm={() => deleteOp(record._id)}
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
  // const [visible, setVisible] = useState(false);

  // const showModal = () => {
  //   setVisible(true);
  // };
  // const hideModal = () => {
  //   setVisible(false);
  // };
  // const [editVisible, setEditVisible] = useState(false);

  // const showEditModal = async (record) => {
  //   getSingleOp(record._id);
  //   setEditVisible(true);
  // };

  // const hideEditModal = () => {
  //   setEditVisible(false);
  // };
  // const [walletVisible, setWalletVisible] = useState(false);

  // const showWalletModal = async (record) => {
  //   getSingleOp(record._id);
  //   setWalletVisible(true);
  // };

  // const hideWalletModal = () => {
  //   setWalletVisible(false);
  // };

  // MODAL OPRATIONS END

  console.log(financial);
  return (
    <>
      <DefaultTable
        form={form}
        data={financial}
        columns={columns}
        loading={financialLoading}
        error={financialError}
      />
    </>
  );
};
