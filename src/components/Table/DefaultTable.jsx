import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    if (error) {
      message.error(error?.message);
    }
  }, [error]);
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
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: true,
          showPrevNextJumpers: true,
          locale: { items_per_page: "صفحه" },
          defaultPageSize: 5,
          pageSizeOptions: [5, 10, 15],
          itemRender: (_, type, originalElement) => {
            if (type === "prev") {
              return <a style={{ fontFamily: "iranyekan" }}>قبلی</a>;
            }
            if (type === "next") {
              return <a style={{ fontFamily: "iranyekan" }}>بعدی</a>;
            }
            return originalElement;
          },
        }}
        loading={loading}
      />
    </Form>
  );
};

export default DefaultTable;
