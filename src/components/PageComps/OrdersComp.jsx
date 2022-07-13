import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Popover, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TopBox } from "../Globals/TopBox";
import { useGetOrders, useGetUserOrders } from "../../hooks/useOrder";
import { OrdersGetByfilter } from "../CrudOprations/OrdersOpration";
import { OrdersTopBox } from "../Globals/OrdersTopBox";

export const OrdersComp = () => {
  // form refs
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();

  // CRUD OPRATION
  const {
    getOrdersList,
    ordersData,
    ordersLoading,
    ordersError,
    ordersRefetch,
  } = useGetOrders();

  // user orders
  const {
    getUserOrders,
    usesrOrdersData,
    userOrdersLoading,
    userOrdersError,
    userOrdersRefetch,
  } = useGetUserOrders();

  useEffect(() => {
    getOrdersList();
  }, []);

  const filterOrders = (input) => {
    OrdersGetByfilter(getOrdersList, input, ordersRefetch, ordersError);
  };
  // CRUD OPRATION END

  // TABLE COLUMN
  const columns = [
    {
      title: "مشخصات کاربر",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.service?.presenter?.fullName}</>;
      },
    },
    {
      title: "موضوع",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.description}</>;
      },
    },
    {
      title: "دسته بندی",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.service?.category?.name.map(
              (n) => n.lang === "en" && n.value
            )}
          </>
        );
      },
    },
    {
      title: "کشور",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.service?.country}</>;
      },
    },
    {
      title: "واحد شمارش",
      editable: true,
      align: "center",
    },
    {
      title: "واحد پول",
      editable: true,
      align: "center",
    },
    {
      title: "قیمت هر واحد",
      editable: true,
      align: "center",
    },
    {
      title: "قیمت با تخفیف",
      editable: true,
      align: "center",
    },
    {
      title: "مبلغ نقدی",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.cash}</>;
      },
    },
    {
      title: "مبلغ تهاتری",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.barter}</>;
      },
    },
    {
      title: "تاریخ اعتبار",
      editable: true,
      align: "center",
    },
    {
      title: "تعداد فروش",
      editable: true,
      align: "center",
    },
    {
      title: "وضعیت",

      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.status}</>;
      },
    },
    {
      title: "ویژگی ها",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <> {record?.service?.name?.map((n) => n.lang === "en" && n.value)}</>
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
    // getSingleOp(record._id);
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };
  // details modal
  const [detVisible, setDetVisible] = useState(false);

  const showDetailModal = async (record, records) => {
    console.log(record?.service);
    await getUserOrders({
      variables: {
        userId: record?.service?.presenter?._id,
      },
    });
    setDetVisible(true);
  };

  const hideDetailModal = () => {
    setDetVisible(false);
  };

  // MODAL OPRATIONS END

  return (
    <>
      <OrdersTopBox
        filter={{ first: "وضعیت", second: "سرویس", third: "خریدار" }}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        detVisible={detVisible}
        hideDetailModal={hideDetailModal}
        // edit = {}
        // create = {}
        getAll={getOrdersList}
        getByFilter={filterOrders}
        // createForm = {}
        // editForm = {}
        searchForm={searchForm}
        loading={userOrdersLoading}
        orderDetails={usesrOrdersData}
      />
      <DefaultTable
        form={form}
        data={ordersData?.getOrders}
        columns={columns}
        loading={ordersLoading}
        error={ordersError}
      />
    </>
  );
};
