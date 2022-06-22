import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CategoriesTopBox } from "../Globals/CategoriesTopBox";
import {
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
import { useGetServices } from "../../hooks/useServices";
import {
  useAddUnit,
  useDeleteUnit,
  useEditUnit,
  useGetUnit,
  useGetUnits,
} from "../../hooks/useUnits";
import { UnitsTopBox } from "../Globals/UnitsTopBox";
import {
  UnitsDelete,
  UnitsEdit,
  UnitsGetSingle,
} from "../CrudOprations/UnitsOprations";

export const UnitsComp = () => {
  // form refs
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  // form refs end

  const [id, setId] = useState(null);

  //   CRUD OPRATIONS

  // get
  const { getUnitsList, UnitsData, UnitsLoading, UnitsError, UnitsRefetch } =
    useGetUnits();
  const {
    getServicesList,
    servicesData,
    servicesLoading,
    servicesError,
    servicesRefetch,
  } = useGetServices();

  useEffect(() => {
    getUnitsList();
  }, []);

  // filter
  const FilterOp = (filters) => {
    CatsGetByfilter(
      getUnitsList,
      filters,
      UnitsRefetch,
      UnitsError,
      searchForm
    );
  };

  // add
  const { createUnit, addData, addLoading, addError, addRefetch } =
    useAddUnit();

  const createOp = (input) => {
    console.log(input);
    CatsCreate(
      createUnit,
      {
        name: { lang: input.name, value: input.name },
        service: input.service,
      },
      UnitsRefetch,
      createForm,
      hideModal,
      addError
    );
  };

  // get single
  const {
    getSingleUnit,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  } = useGetUnit();

  const getSingleOp = (id) => {
    UnitsGetSingle(getSingleUnit, id, setId, editForm);
  };

  // edit
  const { editUnit, editData, editLoading, editError } = useEditUnit();

  const editOp = (input) => {
    console.log(input);
    UnitsEdit(
      editUnit,
      {
        name: { lang: input.name[0].lang, value: input.name[0].value },
        service: input.service._id,
      },
      id,
      UnitsRefetch,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeUnit, deleteData, deleteLoading, deleteError } =
    useDeleteUnit();

  const deleteOp = (id) => {
    UnitsDelete(removeUnit, id, UnitsRefetch, deleteError);
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
      title: "ارايه دهنده سرویس",
      dataIndex: "presenter",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return <>{record?.service?.presenter?.fullName}</>;
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

  const showModal = async () => {
    await getServicesList();
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const [editVisible, setEditVisible] = useState(false);

  const showEditModal = async (record) => {
    getSingleOp(record._id);
    await getServicesList();
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
  };

  // MODAL OPRATIONS END
  return (
    <>
      <UnitsTopBox
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
        getAll={getUnitsList}
        getByFilter={FilterOp}
        servicesData={servicesData}
        servicesLoading={servicesLoading}
        servicesError={servicesError}
      />
      <DefaultTable
        form={form}
        data={UnitsData?.getUnits}
        columns={columns}
        loading={UnitsLoading}
        error={UnitsError}
      />
    </>
  );
};
