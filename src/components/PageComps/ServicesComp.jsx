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
import { getCurrencyHandler } from "../CrudOprations/CurrencyOprations";
import GlobModal from "../modals/GlobModal";
import { useNavigate } from "react-router";
import { t } from "i18next";

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

  // add

  // get single

  // edit

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
      title: t("services.name"),
      editable: true,
      width: "30%",
      align: "center",
      render: (_, record) => {
        return (
          <div className="d-flex-row gap-10">
            {record?.name?.map((val) => (
              <>{val.value}</>
            ))}
          </div>
        );
      },
    },

    {
      title: t("services.presenter"),
      editable: true,
      width: "30%",
      align: "center",
      render: (_, record) => {
        return <>{record?.presenter?.fullName}</>;
      },
    },
    {
      title: t("services.category"),
      editable: true,
      width: "30%",
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.category?.name?.map((item) => {
              return <>{item.lang === "en" && item.value}</>;
            })}
          </>
        );
      },
    },
  ];

  // TABLE COLUMN END

  // MODAL OPRATIONS
  // MODAL OPRATIONS END

  return (
    <>
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
