import React, { useState, useEffect } from "react";
import DefaultTable from "../Table/DefaultTable";
import { useGetPayment, useGetPayments } from "../../hooks/usePayments";
import { Form, message, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const PaymentsComp = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  const { paymentsError, paymentsData, paymentsLoading, refetch } =
    useGetPayments();
  const { singlePaymentData, singlePaymentLoading, singlePaymentError } =
    useGetPayment();

  const paymentList = paymentsData?.getPayments;

  const columns = [
    {
      title: "وضعیت ",
      dataIndex: "status",
      width: "25%",
      editable: true,
      align: "center",
    },
    {
      title: "ID ",
      dataIndex: "_id",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: " مقدار",
      dataIndex: "amount",
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
  ];

  return (
    <DefaultTable
      form={form}
      data={paymentList}
      error={paymentsError}
      loading={paymentsLoading}
      columns={columns}
    />
  );
};

export default PaymentsComp;
