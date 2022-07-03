import React from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

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

export const AddServiceForm = ({
  onFinish,
  formRef,
  usersData,
  usersLoading,
  CategoriesData,
  CategoriesLoading,
  CurrencysData,
  CurrencysLoading,
}) => {
  return (
    <Form
      name="add-service"
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
                    label="نام "
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
                  {fields.length > 0 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
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
      <Form.Item
        name={"presenter"}
        label="ارایه دهنده سرویس "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"نام ارایه دهنده"}>
          {usersLoading ? (
            <Spin spinning={usersLoading} />
          ) : (
            <>
              {usersData &&
                usersData?.map((user) => {
                  return <Option value={user._id}>{user.fullName}</Option>;
                })}
            </>
          )}
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
      <Form.Item
        name={"value"}
        label="مقدار"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name={"unit"}
          label="واحد پول tahatori"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue={"tahator"}>
            {CurrencysLoading ? (
              <Spin spinning={CurrencysLoading} />
            ) : (
              <>
                {CurrencysData &&
                  CurrencysData?.map((currency) => {
                    return (
                      <Option value={currency._id}>{currency.unit}</Option>
                    );
                  })}
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name={"amount"}
          label="مقدار پول tahatori"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          name={"cash"}
          label="واحد پول"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue={"cash"}>
            {CurrencysLoading ? (
              <Spin spinning={CurrencysLoading} />
            ) : (
              <>
                {CurrencysData &&
                  CurrencysData?.map((currency) => {
                    return (
                      <Option value={currency._id}>{currency.unit}</Option>
                    );
                  })}
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name={"cashAmount"}
          label="مقدار پول"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
