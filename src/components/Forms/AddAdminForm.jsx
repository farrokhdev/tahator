import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Password from "antd/lib/input/Password";
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

export const AddAdminForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="add-admin"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        name={"name"}
        label={t("admins.name")}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"username"}
        label={t("admins.username")}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"family"}
        label={t("admins.family")}
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
        label={t("admins.password")}
        rules={[
          {
            required: true,
            min: 8,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Form.Item
        name={"phoneNumber"}
        label="شماره تماس"
        rules={[
          {
            required: true,
            min: 0,
            max: 11,
          },
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        name={"role"}
        label={t("admins.role")}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"انتخاب"}>
          <Option value="62ad78660e6f4119f9208983">Admin</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
