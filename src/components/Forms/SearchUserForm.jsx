import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

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

export const SearchUserForm = ({ onFinish }) => {
  return (
    <Form
      name="search-user"
      onFinish={onFinish}
      validateMessages={validateMessages}
      className="flex-row-center gap-10"
    >
      <Form.Item
        name={"username"}
        label="نام کاربری"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"fullName"}
        label="نام کامل"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"phoneNumber"}
        label="شماره تماس"
        rules={[
          {
            // required: true,
            min: 0,
            max: 11,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          فیلتر
        </Button>
      </Form.Item>
    </Form>
  );
};
