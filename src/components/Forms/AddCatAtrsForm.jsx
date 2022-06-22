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

export const AddCatAtrsForm = ({
  onFinish,
  formRef,
  CategoriesData,
  CategoriesLoading,
}) => {
  return (
    <Form
      name="add-category_atrrs"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}
    >
      <Form.Item
        name={"name"}
        label="نام "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"زبان"}>
          <Option value={"en"}>en</Option>
          <Option value={"tr"}>tr</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={"category"}
        label="دسته بندی "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"نام  دسته"}>
          {CategoriesLoading ? (
            <Spin spinning={CategoriesLoading} />
          ) : (
            <>
              {CategoriesData &&
                CategoriesData.getCategorys.map((cat) => {
                  return (
                    <Option value={cat._id}>
                      {cat.name.map((value) => (
                        <>{value.value} ,</>
                      ))}
                    </Option>
                  );
                })}
            </>
          )}
        </Select>
      </Form.Item>
    </Form>
  );
};
