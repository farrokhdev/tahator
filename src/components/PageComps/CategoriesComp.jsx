import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { CategoriesTopBox } from "../Globals/CategoriesTopBox";
import {
  useGetCategories,
  useAddCategorie,
  useGetCategorie,
  useEditCategorie,
  useDeleteCategorie,
} from "../../hooks/useCategories";
import {
  CatsCreate,
  CatsDelete,
  CatsEdit,
  CatsGetByfilter,
  CatsGetSingle,
  getCatsHandler,
} from "../CrudOprations/CategoriesOpration";

export const CategoriesComp = () => {
  // form refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // form refs end

  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getCategoriesList, CategoriesLoading, CategoriesError } =
    useGetCategories();

  const [cats, setCats] = useState([]);
  const refetchHandler = () => {
    getCatsHandler(getCategoriesList, setCats);
  };

  useEffect(() => {
    getCatsHandler(getCategoriesList, setCats);
  }, []);

  // filter
  const FilterOp = (filters) => {
    CatsGetByfilter(
      getCategoriesList,
      filters,
      refetchHandler,
      CategoriesError,
      searchForm
    );
  };

  // add
  const { createCategorie, addData, addLoading, addError, addRefetch } =
    useAddCategorie();

  const createOp = (input) => {
    console.log({ ...input });
    CatsCreate(
      createCategorie,
      { ...input },
      refetchHandler,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleCategorie,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  } = useGetCategorie();

  const getSingleOp = (id) => {
    CatsGetSingle(getSingleCategorie, id, setId, editForm);
  };

  // edit
  const { editCategorie, editData, editLoading, editError } =
    useEditCategorie();

  const editOp = (input) => {
    CatsEdit(
      editCategorie,
      input,
      id,
      refetchHandler,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeCategorie, deleteData, deleteLoading, deleteError } =
    useDeleteCategorie();

  const deleteOp = (id) => {
    CatsDelete(removeCategorie, id, refetchHandler, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام دسته",
      dataIndex: "name",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <div className="d-flex-row gap-10">
            {record?.name.map((val) => (
              <Tag color="success"> {val.value} </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "زیردسته ها",
      dataIndex: "name",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return (
          <div className="d-flex-row gap-10">
            {record?.categoryAttrs?.map((atr) => (
              <Tag color="processing">
                {" "}
                {atr?.name?.map((name) => {
                  return <>{name.value}</>;
                })}{" "}
              </Tag>
            ))}
          </div>
        );
      },
    },

    {
      title: "تایید شده",
      dataIndex: "accepted",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <Tag color={"success"}>
            {record?.accepted ? "تایید شده" : "تایید نشده"}
          </Tag>
        );
      },
    },
    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "40%",
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
                onConfirm={() =>
                  CatsEdit(
                    editCategorie,
                    {
                      name: record.name.map((n) => {
                        return {
                          lang: n.lang,
                          value: n.value,
                        };
                      }),
                      accepted: true,
                    },
                    record._id,
                    refetchHandler,
                    hideEditModal,
                    editError
                  )
                }
                title="آیا از تایید مطمئن هستید؟"
                okText={"تایید"}
                cancelText={"انصراف"}
              >
                <CheckSquareOutlined style={{ color: "green" }} />
              </Popconfirm>
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
      <CategoriesTopBox
        filter={{ first: "نام", second: "وضعیت" }}
        showModal={showModal}
        showEditModal={showEditModal}
        visible={visible}
        editVisible={editVisible}
        hideModal={hideModal}
        hideEditModal={hideEditModal}
        create={createOp}
        edit={editOp}
        createForm={createForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleLoading}
        getAll={getCategoriesList}
        getByFilter={FilterOp}
      />
      <DefaultTable
        form={form}
        data={cats}
        columns={columns}
        loading={CategoriesLoading}
        error={CategoriesError}
      />
    </>
  );
};
