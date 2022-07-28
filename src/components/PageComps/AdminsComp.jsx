import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, message, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TopBox } from "../Globals/TopBox";
import { useGetUnits } from "../../hooks/useUnits";
import {
  useAddAdmin,
  useDeleteAdmin,
  useEditAdmin,
  useGetAdmin,
  useGetAdmins,
} from "../../hooks/useAdmins";
import {
  AdminCreate,
  AdminDelete,
  AdminEdit,
  AdminGetByfilter,
  AdminGetSingle,
  getAdminsHandler,
} from "../CrudOprations/AdminOprations";

import { AddAdminForm } from "../Forms/AddAdminForm";
import { t } from "i18next";

export const AdminsComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // Form Refs End

  // Id
  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getAdminsList, adminsData, adminsLoading, adminsError } =
    useGetAdmins();

  const [admins, setAdmins] = useState([]);
  const refetchHandler = () => {
    getAdminsHandler(getAdminsList, setAdmins);
  };

  useEffect(() => {
    getAdminsHandler(getAdminsList, setAdmins);
  }, []);

  useEffect(() => {
    getAdminsList();
  }, []);

  // filter
  const FilterOp = (filters) => {
    AdminGetByfilter(
      getAdminsList,
      filters,
      refetchHandler,
      adminsError,
      searchForm
    );
  };

  // add
  const { createAdmin, addData, addLoading, addError, addRefetch } =
    useAddAdmin();

  const createOp = (input) => {
    AdminCreate(
      createAdmin,
      input,
      refetchHandler,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleAdmin,
    singleAdminData,
    singleAdminLoading,
    singleAdminError,
    singleRefetch,
  } = useGetAdmin();

  const getSingleOp = (id) => {
    AdminGetSingle(getSingleAdmin, id, setId, editForm);
  };

  // edit
  const { editAdmin, editData, editLoading, editError } = useEditAdmin();

  const editOp = (input) => {
    AdminEdit(editAdmin, input, id, refetchHandler, hideEditModal, editError);
  };

  // delete
  const { removeAdmin, deleteData, deleteLoading, deleteError } =
    useDeleteAdmin();

  const deleteOp = (id) => {
    AdminDelete(removeAdmin, id, refetchHandler, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: t("admins.username"),
      dataIndex: "username",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: t("admins.name"),
      dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex-row-center gap-10">
            <span>{record?.name}</span>
            <span>{record?.family}</span>
          </div>
        );
      },
    },
    {
      title: t("admins.role"),
      dataIndex: "role",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.role === "62ad78660e6f4119f9208983" && "Admin"}</>;
      },
    },

    {
      title: t("admins.changes"),
      dataIndex: "actions",
      width: "30%",
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

            <Typography.Link>
              <Popconfirm
                onConfirm={() => deleteOp(record._id)}
                title="آیا مطمئن هستید؟"
                okText={"حذف"}
                cancelText={"انصراف"}
              >
                <DeleteOutlined />
              </Popconfirm>
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
      <TopBox
        filter={{ first: "نام", second: "نام کاربری" }}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        edit={editOp}
        create={createOp}
        getAll={getAdminsList}
        getByFilter={FilterOp}
        createForm={createForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleAdminLoading}
      />
      <DefaultTable
        form={form}
        data={admins}
        columns={columns}
        loading={adminsLoading}
        error={adminsError}
      />
    </>
  );
};
