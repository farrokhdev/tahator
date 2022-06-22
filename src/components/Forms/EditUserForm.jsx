import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";

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

export const EditUserForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="edit-user"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
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
        name={"password"}
        label="کلمه عبور"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input.Password />
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
      <Form.Item
        name={"email"}
        label="ایمیل"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"نوع"}
        name="type"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Select
          defaultValue="حقیقی"
          style={{
            width: "50%",
          }}
        >
          <Option value={"Real"}>حقیقی</Option>
          <Option value={"Legal"}>حقوقی</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
