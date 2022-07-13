import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import Password from "antd/lib/input/Password";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { langs } from "../../lib/globalLangs";

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

export const EditCategoryForm = ({
  categories,
  loading,
  onFinish,
  formRef,
}) => {
  return (
    <Form
      name="edit-category"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={formRef}

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
      {langs.map((item) => {
        return (
          <>
            <Form.Item label={`نام دسته (${item}) `} name={["value", item]}>
              <Input />
            </Form.Item>
          </>
        );
      })}
      <Form.Item label={"نام دسته اصلی"} name={"parent"}>
        <Select defaultValue={"نام  دسته"}>
          {loading ? (
            <Spin spinning={loading} />
          ) : (
            <>
              {categories &&
                categories?.map((cat) => {
                  return (
                    <Option value={cat._id}>
                      {cat.name.map((val) => (
                        <>{val.lang === "en" && val.value}</>
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
