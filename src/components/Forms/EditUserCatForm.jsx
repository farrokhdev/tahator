import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";

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

export const EditUserCatForm = ({
  userID,
  refetch,
  update,
  editError,
  hideEditModal,
  userCatsData,
}) => {
  const edit = async (value) => {
    try {
      await update({
        variables: {
          id: userID,
          title: value.title,
          key: value.key,
          description: value.description,
        },
      }).then(() => {
        message.success("دسته بندی کاربر با موفقیت بروزرسانی شد");
        hideEditModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      await message.error(editError.message);
    }
  };

  const initialVal = userCatsData.filter((val) => val._id === userID);

  console.log(initialVal);

  return (
    <Form
      name="edit-user-cat"
      onFinish={edit}
      validateMessages={validateMessages}
      initialValues={{
        title: initialVal.title,
        key: initialVal.key,
        description: initialVal.description,
      }}
    >
      <Form.Item
        name={"title"}
        label="عنوان "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"key"}
        label="کلید واژه "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"description"}
        label="توضیحات"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          ثبت
        </Button>
      </Form.Item> */}
    </Form>
  );
};
