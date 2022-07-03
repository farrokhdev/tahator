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

export const EditCatAtrsForm = ({
  onFinish,
  formRef,
  CategoriesData,
  CategoriesLoading,
}) => {
  return (
    <Form
      name="edit-category_attrs"
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
                    label="نام زیر دسته"
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
                افزودن دسته
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item label="نام دسته اصلی" name={"category"}>
        <Select defaultValue={"نام  دسته"}>
          {CategoriesLoading ? (
            <Spin spinning={CategoriesLoading} />
          ) : (
            <>
              {CategoriesData &&
                CategoriesData?.map((cat) => {
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
