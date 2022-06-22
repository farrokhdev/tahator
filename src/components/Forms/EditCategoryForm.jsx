import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Password from "antd/lib/input/Password";

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

export const EditCategoryForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="edit-category"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item name={"name"} label="زبان">
        <Select defaultValue={"زبان"}>
          <Option value="en">en</Option>
          <Option value="tr">tr</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
