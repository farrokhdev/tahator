import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, message, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import {
  useAddAtrValue,
  useAddCategoryAtr,
  useDeleteCategoryAtr,
  useEditCategoryAtr,
  useGetCategoryAtr,
  useGetCategoryAtrs,
} from "../../hooks/useCategoryAtr";
import {
  AtrsValueCreate,
  CategoriesAtrCreate,
  CategoriesAtrDelete,
  CategoriesAtrEdit,
  CategoriesAtrGetByfilter,
  CategoriesAtrGetSingle,
  getCatsAtrHandler,
} from "../CrudOprations/CategoriesAtrOprations";
import { CategoriesAtrTopBox } from "../Globals/CategoriesAtrTopBox";
import { useGetCategories } from "../../hooks/useCategories";
import { getCatsHandler } from "../CrudOprations/CategoriesOpration";

export const CategorieAtrComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [createAtrForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // Form Refs End

  // Id
  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getCategoriesList, CategoriesLoading } = useGetCategories();
  const [cat, setCat] = useState([]);
  const catRefetchHandler = () => {
    getCatsHandler(getCategoriesList, setCat);
  };

  const { getCategoryAtrsList, CategoryAtrsLoading, CategoryAtrsError } =
    useGetCategoryAtrs();

  const [catAtr, setCatAtr] = useState([]);
  const refetchHandler = () => {
    getCatsAtrHandler(getCategoryAtrsList, setCatAtr);
  };

  useEffect(() => {
    getCatsAtrHandler(getCategoryAtrsList, setCatAtr);
  }, []);

  // filter
  const FilterOp = (filters) => {
    CategoriesAtrGetByfilter(
      getCategoryAtrsList,
      filters,
      refetchHandler,
      CategoryAtrsError,
      searchForm
    );
  };

  // add
  const { createAtrValue, addValData, addValLoading, addValError } =
    useAddAtrValue();

  const createAtrValOp = (input) => {
    console.log(input);
    AtrsValueCreate(
      createAtrValue,
      { ...input },
      refetchHandler,
      createAtrForm,
      hideAtrValModal,
      addValError
    );
  };
  const { createCategoryAtr, addData, addLoading, addError, addRefetch } =
    useAddCategoryAtr();

  const createOp = (input) => {
    console.log(input);
    CategoriesAtrCreate(
      createCategoryAtr,
      { ...input },
      refetchHandler,
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
      input,
      id,
      refetchHandler,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeCategoryAtr, deleteData, deleteLoading, deleteError } =
    useDeleteCategoryAtr();

  const deleteOp = (id) => {
    CategoriesAtrDelete(removeCategoryAtr, id, refetchHandler, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: " ویژگی",
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div className="d-flex-row gap-10">
              {record?.name.map((item) => {
                return <>{item.value}</>;
              })}
            </div>
          </>
        );
      },
    },
    {
      title: "نام دسته بندی",
      // dataIndex: "name",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <div className="d-flex-row gap-10">
            {record?.name.map((val) => (
              <> {val.lang === "en" && val.value} </>
            ))}
          </div>
        );
      },
    },
    {
      title: "وضعیت",
      // dataIndex: "name",
      width: "15%",
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
      title: "ثبت کننده",
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.userId?.fullName == null
              ? "ادمین"
              : record?.userId?.fullName}
          </>
        );
      },
    },

    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "30%",
      align: "center",
      render: (_, record) => {
        console.log(record);
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
                  CategoriesAtrEdit(
                    editCategoryAtr,
                    {
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

  const showModal = async () => {
    await catRefetchHandler();
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    await catRefetchHandler();
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };
  const [atrValVisble, setAtrValVisible] = useState(false);

  const showAtrValModal = async (record) => {
    getSingleOp(record._id);
    setAtrValVisible(true);
  };

  const hideAtrValModal = () => {
    setAtrValVisible(false);
  };

  // MODAL OPRATIONS END

  return (
    <>
      <CategoriesAtrTopBox
        filter={{ first: "نام", second: "وضعیت" }}
        showAtrValModal={showAtrValModal}
        atrValVisble={atrValVisble}
        hideAtrValModal={hideAtrValModal}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        edit={editOp}
        createAtrValue={createAtrValOp}
        create={createOp}
        getAll={getCategoryAtrsList}
        getByFilter={FilterOp}
        createForm={createForm}
        createAtrForm={createAtrForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleLoading}
        CategoriesData={cat}
        CategoriesAtrData={catAtr}
        CategoriesAtrLoading={CategoryAtrsLoading}
        CategoriesLoading={CategoriesLoading}
      />
      <DefaultTable
        form={form}
        data={catAtr}
        columns={columns}
        loading={CategoryAtrsLoading}
        error={CategoryAtrsError}
      />
    </>
  );
};
