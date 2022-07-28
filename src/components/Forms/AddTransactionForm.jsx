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
export const AddTransactionForm = ({ onFinish, formRef }) => {
  return (
    <Form
      name="wallet"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        label={"کیف پول"}
        name="wallet"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          defaultValue="نوع کیف پول"
          style={{
            width: "50%",
          }}
        >
          <Option value={"Barter"}>تهاتری</Option>
          <Option value={"Cash"}>نقدی</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={"نوع تغییرات"}
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          defaultValue={"افزایش یا کاهش"}
          style={{
            width: "50%",
          }}
        >
          <Option value={"ASC"}>افزایش</Option>
          <Option value={"DESC"}>کاهش</Option>
        </Select>
      </Form.Item>
      {/* <Form.Item
        label={"نوع تراکنش "}
        name="transactionType"
        // rules={[
        //   {
        //     required: true,
        //   },
        // ]}
      >
        <Select
          defaultValue="نوع  تراکنش"
          style={{
            width: "50%",
          }}
        >
          <Option value={"Offline"}>آفلاین</Option>
          <Option value={"Online"}>آنلاین</Option>
          <Option value={"Wallet"}>کیف پول</Option>
        </Select>
      </Form.Item> */}
      <Form.Item
        name={"amount"}
        label={"مقدار"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  );
};
