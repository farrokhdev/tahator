import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Spin, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import { useGetUser } from "../../hooks/useUsers";

import { SingleUserTopBox } from "../Globals/SingleUserTopBox";
import { SingleUserDetails } from "../Single/SingleUserDetails";
import { useParams } from "react-router-dom";

export const SingleUserComp = () => {
  let { id } = useParams();

  console.log(id);
  // Form Refs

  // Form Refs End

  // Id
  // const [id, setId] = useState(1);

  //   CRUD OPRATIONS

  // add

  // get single
  const {
    getUser,
    singleUserData,
    singleUserLoading,
    singleUserError,
    singlerefetchHandler,
  } = useGetUser();

  useEffect(() => {
    getUser({
      variables: {
        id: id,
      },
    });
  }, []);

  // edit
  // const { updateUser, editData, editLoading, editError } = useEditUser();

  // const editOp = (input) => {
  //   UserEdit(updateUser, input, id, refetchHandler, hideEditModal, editError);
  // };

  // delete
  // const { removeUser, deleteData, deleteLoading, deleteError } =
  //   useDeleteUser();

  // const deleteOp = (id) => {
  //   UserDelete(removeUser, id, refetchHandler, deleteError);
  // };
  //   CRUD OPRATIONS END

  // MODAL OPRATIONS
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  console.log(singleUserData);

  // MODAL OPRATIONS END

  return (
    <>
      <SingleUserTopBox />
      {singleUserLoading ? (
        <Spin spinning={singleUserLoading} />
      ) : (
        <SingleUserDetails
          data={singleUserData?.getUser}
          loading={singleUserLoading}
        />
      )}
    </>
  );
};
