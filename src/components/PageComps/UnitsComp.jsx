import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Popconfirm, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { CategoriesTopBox } from "../Globals/CategoriesTopBox";

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
  getUnitsHandler,
  UnitsDelete,
  UnitsEdit,
  UnitsGetSingle,
} from "../CrudOprations/UnitsOprations";
import { getServicesHandler } from "../CrudOprations/ServicesOpration";

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
  const { getUnitsList, UnitsLoading, UnitsError } = useGetUnits();
  const [units, setUnits] = useState([]);
  const refetchHandler = () => {
    getUnitsHandler(getUnitsList, setUnits);
  };

  useEffect(() => {
    getUnitsHandler(getUnitsList, setUnits);
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

  // filter
  const FilterOp = (filters) => {
    CatsGetByfilter(
      refetchHandler,
      filters,
      refetchHandler,
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
        name: [...input.name],
        service: input.service,
      },
      refetchHandler,
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
        name: [...input.name],
        service: input.service,
      },
      id,
      refetchHandler,
      hideEditModal,
      editError
    );
  };

  // delete
  const { removeUnit, deleteData, deleteLoading, deleteError } =
    useDeleteUnit();

  const deleteOp = (id) => {
    UnitsDelete(removeUnit, id, refetchHandler, deleteError);
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
      title: "تایید شده",
      dataIndex: "accepted",
      width: "20%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record?.accepted ? (
              <Tag color={"success"}>تایید شده</Tag>
            ) : (
              <Tag color={"processing"}>تایید نشده</Tag>
            )}
          </>
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
                  UnitsEdit(
                    editUnit,
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
        getAll={refetchHandler}
        getByFilter={FilterOp}
        servicesData={services}
        servicesLoading={servicesLoading}
        servicesError={servicesError}
      />
      <DefaultTable
        form={form}
        data={units}
        columns={columns}
        loading={UnitsLoading}
        error={UnitsError}
      />
    </>
  );
};
