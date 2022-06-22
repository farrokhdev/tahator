import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
  const {
    getCategoriesList,
    CategoriesData,
    CategoriesLoading,
    CategoriesError,
    CategoriesRefetch,
  } = useGetCategories();

  useEffect(() => {
    getCategoriesList();
  }, []);

  // filter
  const FilterOp = (filters) => {
    CatsGetByfilter(
      getCategoriesList,
      filters,
      CategoriesRefetch,
      CategoriesError,
      searchForm
    );
  };

  // add
  const { createCategorie, addData, addLoading, addError, addRefetch } =
    useAddCategorie();

  const createOp = (input) => {
    console.log(input);
    CatsCreate(
      createCategorie,
      { name: { lang: input.name, value: input.name } },
      CategoriesRefetch,
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
    console.log(input);
    CatsEdit(
      editCategorie,
      {
        name: { lang: input.name, value: input.name },
      },
      id,
      CategoriesRefetch,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeCategorie, deleteData, deleteLoading, deleteError } =
    useDeleteCategorie();

  const deleteOp = (id) => {
    CatsDelete(removeCategorie, id, CategoriesRefetch, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return (
          <>
            {record?.name.map((val) => (
              <>{val.value},</>
            ))}
          </>
        );
      },
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.category?.name?.value}</>;
      },
    },
    {
      title: "تایید شده",
      dataIndex: "accepted",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.accepted ? "تایید شده" : "تایید نشده"}</>;
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
        data={CategoriesData?.getCategorys}
        columns={columns}
        loading={CategoriesLoading}
        error={CategoriesError}
      />
    </>
  );
};
