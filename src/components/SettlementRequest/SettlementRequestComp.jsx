import React, { useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Table, Input, InputNumber, Typography, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  GET_SettlementRequests,
  useSettlementRequests,
} from "../../hooks/useSettlementRequests";

import { useQuery } from "@apollo/client";
import { TopBox } from "../Globals/TopBox";

export const SettlementRequestComp = () => {
  const { loading, data, error, refetch } = useSettlementRequests();

  console.log(data);

  const settlementRequestList = data?.getSettlementRequests;
  const [form] = Form.useForm();
  const [settlementRequest, setSettlementRequest] = useState(
    settlementRequestList
  );
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    form.setFieldsValue({
      username: "",
      name: "",
      family: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...settlementRequestList];
      const index = newData.findIndex((item) => key === item._id);

      console.log(newData);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setSettlementRequest(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setSettlementRequest(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const remove = () => {};

  const columns = [
    {
      title: "نام کاربری",
      dataIndex: "username",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.userId.username}</>;
      },
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.userId.phoneNumber}</>;
      },
    },
    {
      title: "نام کامل",
      dataIndex: "fullName",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.userId.fullName}</>;
      },
    },
    // {
    //   title: "تغییرات",
    //   dataIndex: "actions",
    //   align: "center",
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => save(record.key)}
    //           style={{
    //             marginRight: 8,
    //           }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}  okText={"حذف"}
    // cancelText={"انصراف"}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <span
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "space-evenly",
    //         }}
    //       >
    //         <Typography.Link
    //           disabled={editingKey !== ""}
    //           onClick={() => edit(record)}
    //         >
    //           <EditOutlined />
    //         </Typography.Link>
    //         <Typography.Link>
    //           <DeleteOutlined />
    //         </Typography.Link>
    //       </span>
    //     );
    //   },
    // },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <TopBox searchText={"جستجو..."} btnText={"ایجاد جدید"} />
      <DefaultTable
        form={form}
        data={settlementRequestList}
        columns={mergedColumns}
        EditableCell={EditableCell}
        loading={loading}
        error={error}
      />
    </>
  );
};
