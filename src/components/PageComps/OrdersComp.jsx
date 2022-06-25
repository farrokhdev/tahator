import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Typography } from "antd";
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
    getUserOrdersList,
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
      title: "ارایه دهنده",
      // dataIndex: "presenter",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.service?.presenter?.fullName}</>;
      },
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.service?.category?.name?.map((item) => {
              return <>{item.value} ,</>;
            })}
          </>
        );
      },
    },
    {
      title: "خریدار",
      dataIndex: "buyer",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.buyer?.fullName}</>;
      },
    },

    {
      title: "وضعیت",
      dataIndex: "accepted",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return <>{record?.accepted ? "تایید شده" : " تایید نشده"}</>;
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
            <Typography.Link onClick={() => showDetailModal(record)}>
              جزییات خرید
            </Typography.Link>
            {/* <Typography.Link
             onClick={() => showEditModal(record)}
            >
              <EditOutlined />
            </Typography.Link>

            <Typography.Link>
              <Popconfirm
                onConfirm={() => remove(record)}
                title="آیا مطمئن هستید؟"
                okText={"حذف"}
                cancelText={"انصراف"}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Typography.Link> */}
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
    // getSingleOp(record._id);a
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };
  // details modal
  const [detVisible, setDetVisible] = useState(false);

  const showDetailModal = async (record) => {
    await getUserOrdersList();
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
        // loading={}
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
