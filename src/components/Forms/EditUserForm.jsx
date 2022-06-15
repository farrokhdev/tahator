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

export const EditUserForm = ({
  onFinish,
  userID,
  singleUserData,
  getSingleUser,
  singleRefetch,
  refetch,
  updateUser,
  editError,
  hideEditModal,
}) => {
  useEffect(() => {
    try {
      getSingleUser({
        variables: {
          id: userID,
        },
      }).then(() => {
        singleRefetch();
      });
    } catch (err) {
      console.log(err);
    }
  }, [userID]);

  const edit = (value) => {
    try {
      updateUser({
        variables: {
          userId: userID,
          username: value.username,
          fullName: value.fullName,
          phoneNumber: value.phoneNumber,
        },
      }).then(() => {
        message.success("کاربر با موفقیت بروزرسانی شد");
        hideEditModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(editError.message);
    }
  };

  return (
    <Form
      name="edit-user"
      onFinish={edit}
      validateMessages={validateMessages}
      initialValues={{
        username: singleUserData?.getUser.username,
        fullName: singleUserData?.getUser.fullName,
        phoneNumber: singleUserData?.getUser.phoneNumber,
      }}
    >
      <Form.Item
        name={"username"}
        label="نام کاربری"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"fullName"}
        label="نام کامل"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"phoneNumber"}
        label="شماره تماس"
        rules={[
          {
            required: true,
            min: 0,
            max: 11,
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
