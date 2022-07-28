import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router";
import { t } from "i18next";
import { useAcceptPayment, useGetPayments } from "../../hooks/usePayment";
import {
  getPaymentsHandler,
  PaymentAccept,
} from "../CrudOprations/PaymentOprations";

export const OfflineTransactionsComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  // Form Refs End

  // Id
  // const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const {
    getPaymentList,
    paymentData,
    paymentLoading,
    paymentError,
    paymentRefetch,
  } = useGetPayments();

  const [payments, setPayments] = useState([]);
  const refetchHandler = () => {
    getPaymentsHandler(getPaymentList, setPayments);
  };

  useEffect(() => {
    getPaymentsHandler(getPaymentList, setPayments);
  }, []);
  // get end
  // accept
  const { acceptPaymentByAdmin, acceptError } = useAcceptPayment();

  const acceptOp = (id) => {
    PaymentAccept(acceptPaymentByAdmin, id, refetchHandler, acceptError);
  };

  // accept end

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

      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.user && record?.user?.fullName}</>;
      },
    },
    {
      title: t("users.transactionType"),
      dataIndex: "transactionType",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: t("users.accepted"),
      dataIndex: "accepted",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>{record?.accepted ? <Tag color={"green"}>تایید شده</Tag> : ""}</>
        );
      },
    },
    {
      title: t("users.accept"),
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <Button type="primary" onClick={() => acceptOp(record._id)}>
            {" "}
            {t("users.accept")}
          </Button>
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

  // MODAL OPRATIONS END

  // Navigate
  const Navigate = useNavigate();

  const singleUser = (id) => {
    Navigate(`/users/${id}`);
  };

  return (
    <>
      <DefaultTable
        form={form}
        data={payments}
        columns={columns}
        loading={paymentLoading}
        error={paymentError}
      />
    </>
  );
};
