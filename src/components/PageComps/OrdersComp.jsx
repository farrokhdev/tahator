import React, { useEffect } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TopBox } from "../Globals/TopBox";
import { useGetOrders } from "../../hooks/useOrder";

export const OrdersComp = () => {
  const [form] = Form.useForm();

  const {
    getOrdersList,
    ordersData,
    ordersLoading,
    ordersError,
    ordersRefetch,
  } = useGetOrders();

  useEffect(() => {
    getOrdersList();
  }, []);

  // TABLE COLUMN
  const columns = [
    {
      title: "ارائه کننده",
      dataIndex: "presenter",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.services?.presenter?.fullName}</>;
      },
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.services?.category?.name?.value}</>;
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
            <Typography.Link
            //  onClick={() => showEditModal(record)}
            >
              <EditOutlined />
            </Typography.Link>

            <Typography.Link>
              <Popconfirm
                // onConfirm={() => remove(record)}
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

  return (
    <>
      <TopBox
        query={""}
        mutation={""}
        filter={{ first: "سرویس", second: "خریدار" }}
        showModal={""}
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
