import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";

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
export const FinishSettelmentForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="finish-settelment"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        name={"description"}
        label="توضیح"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* 
      <Form.Item
        label={"وضعیت"}
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <div className="flex-row gap-10">
          <Button type="primary">تایید</Button>
          <Button type="primary" danger>
            رد
          </Button>
        </div>
      </Form.Item> */}
    </Form>
  );
};
