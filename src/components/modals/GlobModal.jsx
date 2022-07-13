import React from "react";
import { Button, Modal } from "antd";

const GlobModal = ({
  className = "",
  title,
  formName,
  hideModal,
  visible,
  children,
}) => {
  return (
    <>
      <Modal
        className={className}
        title={title}
        visible={visible}
        onCancel={hideModal}
        footer={[
          <>
            <Button
              type="primary"
              form={formName}
              key="submit"
              htmlType="submit"
            >
              ثبت
            </Button>
            <Button type="primary" onClick={hideModal}>
              انصراف
            </Button>
          </>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default GlobModal;
