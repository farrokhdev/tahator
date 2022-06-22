import React from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
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

export const AddUnitForm = ({ onFinish, formRef, data, loading, error }) => {
  return (
    <Form
      name="add-unit"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        name={"name"}
        label="زبان"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"زبان"}>
          <Option value="en">en</Option>
          <Option value="tr">tr</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={"service"}
        label="خدمات"
        rules={[
          {
            required: true,
          },
        ]}
      >
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Select defaultValue={"خدمات"} loading={loading}>
            {data?.map((item) => {
              return (
                <Option value={item._id}>{item.presenter.fullName}</Option>
              );
            })}
          </Select>
        )}
      </Form.Item>
    </Form>
  );
};
