import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, message, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  useAddCategoryAtr,
  useDeleteCategoryAtr,
  useEditCategoryAtr,
  useGetCategoryAtr,
  useGetCategoryAtrs,
} from "../../hooks/useCategoryAtr";
import {
  CategoriesAtrCreate,
  CategoriesAtrDelete,
  CategoriesAtrEdit,
  CategoriesAtrGetByfilter,
  CategoriesAtrGetSingle,
} from "../CrudOprations/CategoriesAtrOprations";
import { CategoriesAtrTopBox } from "../Globals/CategoriesAtrTopBox";
import { useGetCategories } from "../../hooks/useCategories";

export const CategorieAtrComp = () => {
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
  const {
    getCategoriesList,
    CategoriesData,
    CategoriesLoading,
    CategoriesError,
    CategoriesRefetch,
  } = useGetCategories();
  const {
    getCategoryAtrsList,
    CategoryAtrsData,
    CategoryAtrsLoading,
    CategoryAtrsError,
    CategoryAtrsRefetch,
  } = useGetCategoryAtrs();

  useEffect(() => {
    getCategoryAtrsList();
  }, []);

  // filter
  const FilterOp = (filters) => {
    CategoriesAtrGetByfilter(
      getCategoryAtrsList,
      filters,
      CategoryAtrsRefetch,
      CategoryAtrsError,
      searchForm
    );
  };

  // add
  const { createCategoryAtr, addData, addLoading, addError, addRefetch } =
    useAddCategoryAtr();

  const createOp = (input) => {
    console.log(input);
    CategoriesAtrCreate(
      createCategoryAtr,
      {
        name: {
          lang: input.name,
          value: input.name,
        },

        category: input.category,
      },
      CategoryAtrsRefetch,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleCategoryAtr,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  } = useGetCategoryAtr();

  const getSingleOp = (id) => {
    CategoriesAtrGetSingle(getSingleCategoryAtr, id, setId, editForm);
  };

  // edit
  const { editCategoryAtr, editData, editLoading, editError } =
    useEditCategoryAtr();

  const editOp = (input) => {
    CategoriesAtrEdit(
      editCategoryAtr,
      {
        name: {
          lang: input.name,
          value: input.name,
        },

        category: input.category,
      },
      id,
      CategoryAtrsRefetch,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeCategoryAtr, deleteData, deleteLoading, deleteError } =
    useDeleteCategoryAtr();

  const deleteOp = (id) => {
    CategoriesAtrDelete(
      removeCategoryAtr,
      id,
      CategoryAtrsRefetch,
      deleteError
    );
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام زبان",
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <span>{record?.name[0].value}</span>
          </>
        );
      },
    },
    {
      title: "کد دسته بندی",
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.category._id}</>;
      },
    },
    {
      title: "وضعیت",
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.accepted ? "تایید شده" : "تایید نشده"}</>;
      },
    },

    {
      title: "تغییرات",
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

  const showModal = async () => {
    await getCategoriesList();
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    await getCategoriesList();
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };

  // MODAL OPRATIONS END

  return (
    <>
      <CategoriesAtrTopBox
        filter={{ first: "نام", second: "وضعیت" }}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        edit={editOp}
        create={createOp}
        getAll={getCategoryAtrsList}
        getByFilter={FilterOp}
        createForm={createForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleLoading}
        CategoriesData={CategoriesData}
        CategoriesLoading={CategoriesLoading}
      />
      <DefaultTable
        form={form}
        data={CategoryAtrsData?.getCategory_attrs}
        columns={columns}
        loading={CategoryAtrsLoading}
        error={CategoryAtrsError}
      />
    </>
  );
};
