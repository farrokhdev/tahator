import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { TransactionImageUploadHandler } from "../CrudOprations/UploadImage";

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
export const TransactionImageForm = ({ onFinish, formRef }) => {
  const [fileData, setFileData] = useState({});

  const props = {
    name: "file",
    action: "http://api.getgiveservice.com:8080/upload/admin/payment",
    data: {
      id: "62d3b35ae8d08e78b96b0112",
      image: fileData,
    },
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmFkN2E0YWY5YTNiYzFmOGYzZmY2NTIiLCJzdWIiOiI2MmFkN2E0YWY5YTNiYzFmOGYzZmY2NTIiLCJpc3MiOiJ0YWhhdG9yLmNvbSIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInJvbGVzIjoiQURNSU4iLCJ0b2tlbktleSI6ImIxMjM1NzI4LTI4YTQtNGE4My1iMDgxLWQ5MWUzZTRmMDhkNCIsImlhdCI6MTY1ODA1NDI4MiwiZXhwIjoxNjU4MjI3MDgyfQ.0TXUDpZLwq_cdWFZYz9aTSJq8bHxsRpapzWC10TEqzk",
    },

    onChange(info) {
      console.log(info);
      setFileData({ ...info.file });
      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }

      // if (info.file.status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
  };

  const upload = () => {
    TransactionImageUploadHandler(
      "http://api.getgiveservice.com:8080/upload/admin/payment",
      fileData
    );
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>آپلود</Button>
      </Upload>
    </>
  );
};
