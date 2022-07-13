import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";

export const SingleUserTopBox = ({}) => {
  // Navigate
  const Navigate = useNavigate();

  const allUsers = () => {
    Navigate("/users");
  };

  return (
    <>
      {/* ADD MODAL */}

      {/* ADD MODAL END */}
      {/* EDIT MODAL */}

      {/* EDIT MODAL END */}
      <div className="top-box">
        <div className="create-btn">
          <Button type="primary" onClick={() => allUsers()}>
            همه کاربران
          </Button>
        </div>
      </div>
    </>
  );
};
