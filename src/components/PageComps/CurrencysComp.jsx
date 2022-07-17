import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import {
  CatsCreate,
  CatsDelete,
  CatsEdit,
  CatsGetByfilter,
  CatsGetSingle,
} from "../CrudOprations/CategoriesOpration";
import { useGetServices } from "../../hooks/useServices";
import {
  useAddUnit,
  useDeleteUnit,
  useEditUnit,
  useGetUnit,
  useGetUnits,
} from "../../hooks/useUnits";
import { CurrencysTopBox } from "../Globals/CurrencysTopBox";
import {
  CurrencyDelete,
  CurrencyEdit,
  CurrencyGetSingle,
  getCurrencyHandler,
  UnitsDelete,
} from "../CrudOprations/CurrencyOprations";
import { getServicesHandler } from "../CrudOprations/ServicesOpration";
import {
  useAddCurrency,
  useDeleteCurrency,
  useEditCurrency,
  useGetCurrency,
  useGetCurrencys,
} from "../../hooks/useCurrency";
import { t } from "i18next";

export const CurrencysComp = () => {
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
    getCurrencysList,
    CurrencysData,
    CurrencysLoading,
    CurrencysError,
    CurrencysRefetch,
  } = useGetCurrencys();
  const [units, setUnits] = useState([]);
  const refetchHandler = () => {
    getCurrencyHandler(getCurrencysList, setUnits);
  };

  useEffect(() => {
    getCurrencyHandler(getCurrencysList, setUnits);
  }, []);

  const {
    getServicesList,
    servicesData,
    servicesLoading,
    servicesError,
    servicesRefetch,
  } = useGetServices();

  const [services, sestServices] = useState([]);
  const refetchServicesHandler = () => {
    getServicesHandler(getServicesList, sestServices);
  };

  // add
  const { createUnit, addData, addLoading, addError, addRefetch } =
    useAddCurrency();

  const createOp = (input) => {
    console.log(input);
    CatsCreate(
      createUnit,
      {
        unit: input?.unit,
        status: input?.status,
        description: input?.description,
      },
      refetchHandler,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleCurrency,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  } = useGetCurrency();

  const getSingleOp = (id) => {
    CurrencyGetSingle(getSingleCurrency, id, setId, editForm);
  };

  // edit
  const { editCurrency, editData, editLoading, editError } = useEditCurrency();

  const editOp = (input) => {
    CurrencyEdit(
      editCurrency,
      {
        unit: input?.unit,
        status: input?.status,
        description: input?.description,
      },
      id,
      refetchHandler,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeCurrency, deleteData, deleteLoading, deleteError } =
    useDeleteCurrency();

  const deleteOp = (id) => {
    CurrencyDelete(removeCurrency, id, refetchHandler, deleteError);
  };
  //   CRUD OPRATIONS END

  // TABLE COLUMN
  const columns = [
    {
      title: t("currencys.currency"),
      // dataIndex: "unit",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.unit}</>;
      },
    },
    {
      title: t("currencys.status"),
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.status === "Active" ? (
              <Tag color={"success"}> فعال</Tag>
            ) : (
              <Tag color={"processing"}>غیر فعال</Tag>
            )}
          </>
        );
      },
    },
    {
      title: t("currencys.desc"),
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.description}</>;
      },
    },
    {
      title: t("currencys.changes"),
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

  const showModal = async () => {
    await refetchServicesHandler();
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    await refetchServicesHandler();
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };

  // MODAL OPRATIONS END
  return (
    <>
      <CurrencysTopBox
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
        getAll={refetchHandler}
        servicesData={services}
        servicesLoading={servicesLoading}
        servicesError={servicesError}
      />
      <DefaultTable
        form={form}
        data={units}
        columns={columns}
        loading={CurrencysLoading}
        error={CurrencysError}
      />
    </>
  );
};
