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
import { langs } from "../../lib/globalLangs";
import { t } from "i18next";

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
    Object.keys(input.value).forEach((k) => {
      if (input?.value[k] === "" || input?.value[k] === undefined) {
        delete input?.value[k];
      }
    });

    CatsCreate(
      createCategorie,

      {
        name: langs?.map((lng) => {
          return {
            value:
              lng === "en"
                ? input?.value?.en
                : lng === "tr"
                ? input?.value?.tr
                : "",
            lang: lng,
          };
        }),
        parent: input.parent,
      },
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
    Object.keys(input.value).forEach((k) => {
      if (
        input?.value[k] === "" ||
        input?.value[k] === undefined ||
        input?.value[k] === null
      ) {
        delete input?.value[k];
      }
    });
    console.log(input);
    CatsEdit(
      editCategorie,
      {
        name: langs?.map((lng) => {
          return {
            value:
              lng === "en"
                ? input?.value?.en
                : lng === "tr"
                ? input?.value?.tr
                : "",
            lang: lng,
          };
        }),
        parent: input.parent,
      },
      id,
      editForm,
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
      title: t("categories.nameEn"),
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
      title: t("categories.nameTr"),
      // dataIndex: "name",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <div className="d-flex-row gap-10">
            {record?.name.map((val) => (
              <> {val.lang === "tr" && val.value} </>
            ))}
          </div>
        );
      },
    },
    {
      title: t("categories.parentCat"),
      dataIndex: "name",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        console.log(record);
        return (
          <div className="d-flex-row gap-10">
            {record?.parent?.name.map((val) => (
              <> {val.lang === "tr" && val.value} </>
            ))}
          </div>
        );
      },
    },

    {
      title: t("categories.status"),
      dataIndex: "accepted",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.accepted ? (
              <Tag color={"success"}>تایید شده</Tag>
            ) : (
              <Tag color={"warning"}>تایید نشده</Tag>
            )}
          </>
        );
      },
    },
    {
      title: t("categories.acceptProvider"),
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.user?.fullName == null ? "ادمین" : record?.user?.fullName}
          </>
        );
      },
    },

    {
      title: t("categories.changes"),
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

            <Typography.Link>
              <Popconfirm
                onConfirm={() =>
                  CatsEdit(
                    editCategorie,
                    {
                      name: record?.name?.map((val) => {
                        return {
                          lang: val.lang,
                          value: val.value,
                        };
                      }),
                      accepted: true,
                      parent: record?.parent._id,
                    },
                    record?._id,
                    editForm,
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
        categories={cats}
        CategoriesLoading={CategoriesLoading}
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
