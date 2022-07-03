import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import {
  Button,
  Form,
  message,
  Modal,
  Popconfirm,
  Tag,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import {
  useAddService,
  useDeleteService,
  useEditService,
  useGetService,
  useGetServices,
} from "../../hooks/useServices";
import { ServicesTopBox } from "../Globals/ServicesTopBox";
import {
  getServicesHandler,
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
import { getUsersHandler } from "../CrudOprations/UserOprations";
import { getCatsHandler } from "../CrudOprations/CategoriesOpration";
import { getCurrencyHandler } from "../CrudOprations/UnitsOprations";
import GlobModal from "../modals/GlobModal";
import { useNavigate } from "react-router";

export const ServicesComp = () => {
  // Form Refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // Form Refs End

  // Id
  const [id, setId] = useState(null);
  const [catDetails, setCatDetails] = useState({});

  //   CRUD OPRATIONS

  // get
  const { getUsersList, usersLoading, usersError } = useGetUsers();

  const [users, setUsers] = useState([]);
  const usersRefetchHandler = () => {
    getUsersHandler(getUsersList, setUsers);
  };

  const { getCategoriesList, CategoriesLoading, CategoriesError } =
    useGetCategories();
  const [cats, setCats] = useState([]);
  const catsRefetchHandler = () => {
    getCatsHandler(getCategoriesList, setCats);
  };

  const { getCurrencysList, CurrencysLoading } = useGetCurrencys();
  const [units, setUnits] = useState([]);
  const unitsRefetchHandler = () => {
    getCurrencyHandler(getCurrencysList, setUnits);
  };

  const { getServicesList, servicesLoading, servicesError } = useGetServices();

  const [services, sestServices] = useState([]);
  const refetchHandler = () => {
    getServicesHandler(getServicesList, sestServices);
  };

  useEffect(() => {
    getServicesHandler(getServicesList, sestServices);
  }, []);

  // filter
  const FilterOp = (filters) => {
    ServiceGetByfilter(
      getServicesList,
      filters,
      refetchHandler,
      servicesError,
      searchForm
    );
  };

  // add
  const { createService, addData, addLoading, addError, addRefetch } =
    useAddService();

  const createOp = (input) => {
    console.log(input);
    ServiceCreate(
      createService,
      {
        name: [...input.name],
        presenter: input.presenter,
        category: input.category,
        value: input.value,
        barter: {
          unit: input.unit,
          amount: input.amount,
        },
        cash: {
          unit: input.cash,
          amount: input.cashAmount,
        },
      },
      refetchHandler,
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
        name: [...input.name],
        presenter: input.presenter,
        category: input.category,
        value: input.value,
        barter: {
          unit: input.unit,
          amount: input.amount,
        },
        cash: {
          unit: input.cash,
          amount: input.cashAmount,
        },
      },
      id,
      refetchHandler,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeService, deleteData, deleteLoading, deleteError } =
    useDeleteService();

  const deleteOp = (id) => {
    ServiceDelete(removeService, id, refetchHandler, deleteError);
  };
  //   CRUD OPRATIONS END

  const Navigation = useNavigate();

  const navigate = () => {
    Navigation("/categories-atribute");
  };
  // TABLE COLUMN
  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <div className="d-flex-row gap-10">
            {record?.name.map((val) => (
              <Tag color={"processing"}>{val.value}</Tag>
            ))}
          </div>
        );
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
            <Button type="primary" onClick={navigate}>
              جزییات دسته بندی
            </Button>
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
                onConfirm={() =>
                  ServiceEdit(
                    editService,
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

  const getUsersCatsUnits = async () => {
    await usersRefetchHandler();
    await catsRefetchHandler();
    await unitsRefetchHandler();
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
        usersData={users}
        usersLoading={usersLoading}
        CategoriesData={cats}
        CategoriesLoading={CategoriesLoading}
        CurrencysData={units}
        CurrencysLoading={CurrencysLoading}
      />
      <DefaultTable
        form={form}
        data={services}
        columns={columns}
        loading={servicesLoading}
        error={servicesError}
      />
    </>
  );
};
