import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { t } from "i18next";

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
export const AddUserForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="add-user"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        name={"fullName"}
        label={t("users.fullname")}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"password"}
        label={t("users.password")}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name={"phoneNumber"}
        label={t("users.phoneNumber")}
        rules={[
          {
            required: true,
            min: 0,
            max: 11,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label={t("users.email")}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"نوع"}
        name={t("users.type")}
        rules={[
          {
            required: true,
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
      <Form.Item
        label={t("users.language")}
        name="language"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          defaultValue="زبان کاربر"
          style={{
            width: "50%",
          }}
        >
          <Option value={"en"}>انگلیسی</Option>
          <Option value={"tr"}>ترکی</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
