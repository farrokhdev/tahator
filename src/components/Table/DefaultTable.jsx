import React, { useState } from "react";
import { Form, Table, message } from "antd";

const DefaultTable = ({
  form = "",
  data = "",
  columns = "",
  loading = "",
  error = "",
  EditableCell = "",
  cancel = "",
}) => {
  if (error) {
    message.error("خطا در برقراری ارتباط با سرور");
  }
  return (
    <Form form={form} component={false}>
      <Table
        className="custom-table"
        locale={{
          emptyText: "دیتایی موجود نیست",
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        // pagination={{
        //   onChange: cancel,
        // }}
        loading={loading}
      />
    </Form>
  );
};

export default DefaultTable;
