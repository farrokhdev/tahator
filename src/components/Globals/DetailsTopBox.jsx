import React, { useEffect, useState } from "react";
import { Button, Input, Dropdown, Menu, Space, message } from "antd";
import AddUserModal from "../modals/AddUserModal";
import { AddUserForm } from "../Forms/AddUserForm";
import { useNavigate } from "react-router";

const { Search } = Input;

export const DetailsTopBox = ({}) => {
  // NAVIGATE HANDLER
  const Navigate = useNavigate();

  return (
    <>
      <div className="top-box">
        <div className="">جزییات کیف پول</div>
        <div className="create-btn">
          <Button type="primary" onClick={() => Navigate(-1)}>
            بازگشت
          </Button>
        </div>
      </div>
    </>
  );
};
