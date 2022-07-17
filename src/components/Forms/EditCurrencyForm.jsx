import React from "react";
import { Form, Input, Select } from "antd";
import { CurrencyUnits } from "../../lib/CurrencyUnits";

const validateMessages = {
  required: "${label} پر کردن این فیلد ضروری میباشد!",
  types: {
    email: "${label} ایمیل معتبر نمیباشد!",
    number: "${label} شماره تلفن معتبر نیست!",
  },
  number: {
    range: "${label} باید بین ${min} و ${max} باشد",
  },
};

const { Option } = Select;

export const EditCurrencyForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="edit-currency"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        name={"unit"}
        label="واحد"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"واحد ها"}>
          {CurrencyUnits?.map((item) => {
            return <Option value={item.code}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={"status"}
        label="وضعیت"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"وضعیت"}>
          <Option value={"Active"}>فعال</Option>
          <Option value={"Disable"}>غیر فعال</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"description"} label="توضیحات">
        <Input />
      </Form.Item>
    </Form>
  );
};
