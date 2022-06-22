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

export const EditAdminForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="edit-admin"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item name={"name"} label="نام ">
        <Input />
      </Form.Item>
      <Form.Item name={"username"} label="نام کاربری">
        <Input />
      </Form.Item>
      <Form.Item name={"family"} label="نام خانوادگی">
        <Input />
      </Form.Item>

      <Form.Item name={"password"} label="کلمه عبور">
        <Input.Password />
      </Form.Item>
      {/* <Form.Item name={"phoneNumber"} label="شماره تماس">
        <Input />
      </Form.Item> */}
      <Form.Item name={"role"} label="نقش">
        <Select defaultValue={"انتخاب"}>
          <Option value="62ad78660e6f4119f9208983">Admin</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          ثبت
        </Button>
      </Form.Item> */}
    </Form>
  );
};
