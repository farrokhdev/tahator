import React, { useEffect, useState } from "react";
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
import TokenManager from "../../lib/tokenManager";
import GlobModal from "../modals/GlobModal";

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const { Option } = Select;
export const TransactionImageForm = ({ onFinish, formRef, id }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState("");

  const props = {
    name: "image",
    action: "http://api.getgiveservice.com:8080/upload/admin/payment",
    data: {
      id: id,
    },
    listType: "picture",
    multiple: false,
    maxCount: 1,
    headers: {
      authorization: TokenManager.getToken().access_token,
    },
    onPreview: async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`فایل ${info.file.name} با موفقیت آپلود شد`);
      } else if (info.file.status === "error") {
        message.error(`آپلود فایل ${info.file.name} با خطا مواجه شد`);
      }
    },
  };

  const handleCancel = () => setPreviewVisible(false);

  return (
    <>
      {/* Preview Modal  */}
      <GlobModal visible={previewVisible} hideModal={handleCancel} noFooter>
        <img src={previewImage} alt="" />
      </GlobModal>
      {/* Preview Modal end  */}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>آپلود</Button>
      </Upload>
    </>
  );
};
