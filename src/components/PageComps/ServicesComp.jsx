import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, message, Popconfirm, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useAddService,
  useDeleteService,
  useEditService,
  useGetService,
  useGetServices,
} from "../../hooks/useServices";
import { ServicesTopBox } from "../Globals/ServicesTopBox";
import {
  ServiceCreate,
  ServiceDelete,
  ServiceEdit,
  ServiceGetByfilter,
  ServiceGetSingle,
} from "../CrudOprations/ServicesOpration";
import { useGetUsers } from "../../hooks/useUsers";
import { useGetCategories } from "../../hooks/useCategories";
import { useGetUnits } from "../../hooks/useUnits";
import { useGetCurrencys } from "../../hooks/useCurrency";

export const ServicesComp = () => {
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
  const { getUsersList, usersData, usersLoading, usersError, refetch } =
    useGetUsers();
  const {
    getCategoriesList,
    CategoriesData,
    CategoriesLoading,
    CategoriesError,
    CategoriesRefetch,
  } = useGetCategories();
  const {
    getCurrencysList,
    CurrencysData,
    CurrencysLoading,
    CurrencysError,
    CurrencysRefetch,
  } = useGetCurrencys();
  const {
    getServicesList,
    servicesData,
    servicesLoading,
    servicesError,
    servicesRefetch,
  } = useGetServices();

  useEffect(() => {
    getServicesList();
  }, []);

  // filter
  const FilterOp = (filters) => {
    ServiceGetByfilter(
      getServicesList,
      filters,
      servicesRefetch,
      servicesError,
      searchForm
    );
  };

  // add
  const { createService, addData, addLoading, addError, addRefetch } =
    useAddService();

  const createOp = (input) => {
    ServiceCreate(
      createService,
      {
        name: {
          lang: input.name,
          value: input.name,
        },
        presenter: input.presenter,
        category: input.category,
        value: input.value,
        barter: {
          unit: input.barter,
          amount: input.amount,
        },
        cash: {
          unit: input.cash,
          amount: input.cashAmount,
        },
      },
      servicesRefetch,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleService,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  } = useGetService();

  const getSingleOp = (id) => {
    ServiceGetSingle(getSingleService, id, setId, editForm);
  };

  // edit
  const { editService, editData, editLoading, editError } = useEditService();

  const editOp = (input) => {
    console.log(input);
    ServiceEdit(
      editService,
      {
        name: {
          lang: input.name,
          value: input.name,
        },
        presenter: input.presenter,
        category: input.category,
        value: input.value,
        barter: {
          unit: input.barter,
          amount: input.amount,
        },
        cash: {
          unit: input.cash,
          amount: input.cashAmount,
        },
      },
      id,
      servicesRefetch,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeService, deleteData, deleteLoading, deleteError } =
    useDeleteService();

  const deleteOp = (id) => {
    ServiceDelete(removeService, id, servicesRefetch, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.name.map((val) => val.value)}</>;
      },
    },

    {
      title: "ارائه کننده",
      dataIndex: "presenter",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.presenter?.fullName}</>;
      },
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.category.accepted ? (
              <Tag color={"green"}>تایید شده</Tag>
            ) : (
              <Tag color={"red"}>تایید نشده</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "مقدار",
      dataIndex: "value",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "میانگین",
      dataIndex: "discount",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "تاریخ انقضا",
      dataIndex: "expireDate",
      width: "20%",
      editable: true,
      align: "center",
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

  const getUsersCatsUnits = async () => {
    await getUsersList();
    await getCategoriesList();
    await getCurrencysList();
  };

  const showModal = () => {
    getUsersCatsUnits();
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    getUsersCatsUnits();
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };

  // MODAL OPRATIONS END

  return (
    <>
      <ServicesTopBox
        filter={{ first: "وضعیت", second: "کاربر" }}
        showModal={showModal}
        visible={visible}
        hideModal={hideModal}
        editVisible={editVisible}
        hideEditModal={hideEditModal}
        edit={editOp}
        create={createOp}
        getAll={getServicesList}
        getByFilter={FilterOp}
        createForm={createForm}
        editForm={editForm}
        searchForm={searchForm}
        loading={singleLoading}
        usersData={usersData}
        usersLoading={usersLoading}
        CategoriesData={CategoriesData}
        CategoriesLoading={CategoriesLoading}
        CurrencysData={CurrencysData}
        CurrencysLoading={CurrencysLoading}
      />
      <DefaultTable
        form={form}
        data={servicesData?.getServices}
        columns={columns}
        loading={servicesLoading}
        error={servicesError}
      />
    </>
  );
};
