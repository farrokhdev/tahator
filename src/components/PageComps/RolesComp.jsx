import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Typography } from "antd";
import {
  useAddRole,
  useGetRole,
  useGetRoles,
  useEditRole,
} from "../../hooks/useRoles";
import { getRoles } from "@testing-library/react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  RoleCreate,
  RoleGetSingle,
  RoleEdit,
} from "../CrudOprations/RolesOprations";
import { RolesTopBox } from "../Globals/RolesTopBox";

export const RolesComp = () => {
  // form refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  // form refs end

  // id
  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getRoles, RolesData, RolesLoading, RolesError, RolesRefetch } =
    useGetRoles();

  useEffect(() => {
    getRoles();
  }, []);

  // add
  const { createRole, addData, addLoading, addError, addRefetch } =
    useAddRole();

  const createOp = (input) => {
    RoleCreate(
      createRole,
      input,
      RolesRefetch,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleRole,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  } = useGetRole();

  const getSingleOp = (id) => {
    RoleGetSingle(getSingleRole, id, setId, editForm);
  };

  // edit
  const { editRole, editData, editLoading, editError } = useEditRole();

  const editOp = (input) => {
    RoleEdit(editRole, input, id, RolesRefetch, hideEditModal, editError);
  };

  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      width: "30%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.name}</>;
      },
    },
    {
      title: "واژه کلیدی",
      dataIndex: "key",
      width: "30%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.key}</>;
      },
    },
    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "20%",
      align: "center",
      render: (_, record) => {
        return (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Typography.Link onClick={() => showEditModal(record)}>
              <EditOutlined />
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  // TABLE COLUMN END

  // MODAL OPRATIONS
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };

  // MODAL OPRATIONS END

  return (
    <>
      <RolesTopBox
        filter={{ first: "نام", second: "وضعیت" }}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        showEditModal={showEditModal}
        create={createOp}
        edit={editOp}
        createForm={createForm}
        editForm={editForm}
        loading={singleLoading}
      />
      <DefaultTable
        form={form}
        data={RolesData?.getAdminRoles}
        columns={columns}
        loading={RolesLoading}
        error={RolesError}
      />
    </>
  );
};
