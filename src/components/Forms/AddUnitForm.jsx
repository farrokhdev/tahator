import React from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
      <Form.List
        name="name"

        // rules={[
        //   {
        //     validator: async (_, names) => {
        //       if (!names || names.length < 2) {
        //         return Promise.reject(new Error("حد اقل مجاز"));
        //       }
        //     },
        //   },
        // ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, key) => {
              return (
                <>
                  <Form.Item
                    key={key}
                    label="نام یونیت"
                    {...field}
                    name={[field.name, "value"]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    key={key}
                    label="زبان"
                    {...field}
                    name={[field.name, "lang"]}
                  >
                    <Input />
                  </Form.Item>
                </>
              );
            })}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                افزودن یونیت
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
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
