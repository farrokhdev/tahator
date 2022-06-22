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
                usersData.getUsers.map((user) => {
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
      <Form.Item
        name={"barter"}
        label="واحد currency"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"یونیت"}>
          {CurrencysLoading ? (
            <Spin spinning={CurrencysLoading} />
          ) : (
            <>
              {CurrencysData &&
                CurrencysData.getCurrencys.map((currency) => {
                  return <Option value={currency._id}>{currency.unit}</Option>;
                })}
            </>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        name={"amount"}
        label="میزان currency"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={"cash"}
        label="پول"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue={"یونیت"}>
          {CurrencysLoading ? (
            <Spin spinning={CurrencysLoading} />
          ) : (
            <>
              {CurrencysData &&
                CurrencysData.getCurrencys.map((currency) => {
                  return <Option value={currency._id}>{currency.unit}</Option>;
                })}
            </>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        name={"cashAmount"}
        label="میزان پول"
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
