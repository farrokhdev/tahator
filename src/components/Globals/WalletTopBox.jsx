import React, { useEffect, useState } from "react";
import { Button, Input, Dropdown, Menu, Space, message } from "antd";
import AddUserModal from "../modals/AddUserModal";
import { AddUserForm } from "../Forms/AddUserForm";
import { useNavigate } from "react-router";

const { Search } = Input;

export const WalletTopBox = ({ openModal }) => {
  // NAVIGATE HANDLER
  const Navigate = useNavigate();

  return (
    <>
      <div className="top-box">
        <Button type="primary" onClick={() => openModal()}>
          افزایش موجودی
        </Button>

        <div className="create-btn">
          <Button type="primary" onClick={() => openModal()}>
            کاهش موجودی
          </Button>
        </div>
      </div>
    </>
  );
};
