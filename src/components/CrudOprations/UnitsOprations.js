import { message } from "antd";

// get unit
export const getUnitsHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      const data = res?.data?.getUnits;
      const filtered = res?.data?.getUnits.filter((unit) => !unit.isDeleted);
      set(filtered);
    });
  } catch (err) {
    console.log(err);
  }
};
// get currency

export const getCurrencyHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      const data = res?.data?.getCurrencys;
      const filtered = res?.data?.getCurrencys.filter(
        (unit) => !unit.isDeleted
      );
      set(filtered);
    });
  } catch (err) {
    console.log(err);
  }
};

// create
export const UnitsCreate = async (
  create = "",
  input = "",
  refetch = "",
  formRef = "",
  hide = "",
  error = ""
) => {
  try {
    await create({
      variables: {
        input: { ...input },
      },
    })
      .then(() => {
        message.success("یونیت جدید با موفقیت ایجاد شد");
        refetch();
      })
      .then(() => {
        formRef.resetFields();
        hide();
      });
  } catch (err) {
    console.log(err);
    await message.error(error ? error.message : "خطا");
  }
};

// filter
export const UnitsGetByfilter = async (
  getF = "",
  filters = "",
  refetch = "",
  error = "",
  formRef = ""
) => {
  try {
    await getF({
      variables: {
        filters: {
          ...filters,
        },
      },
    }).then(() => refetch());
  } catch (err) {
    console.log(err);
    message.error(error && error.message);
  }
};

// edit
export const UnitsEdit = async (
  edit = "",
  input = "",
  id = "",
  refetch = "",
  hide = "",
  error = ""
) => {
  try {
    await edit({
      variables: {
        id: id,
        input: { ...input },
      },
    })
      .then(() => {
        message.success("یونیت با موفقیت ویرایش شد");
        refetch();
      })
      .then(() => {
        hide();
      });
  } catch (err) {
    console.log(err);
    await message.error(error ? error.message : "");
  }
};
// delete
export const UnitsDelete = async (
  deleteF = "",
  id = "",
  refetch = "",
  error = ""
) => {
  try {
    await deleteF({
      variables: {
        id: id,
      },
    }).then(() => {
      message.success("یونیت با موفقیت حذف شد");
      refetch();
    });
  } catch (err) {
    console.log(err);
    message.error(error ? error.message : "خطا");
  }
};
// get single
export const UnitsGetSingle = async (
  getF = "",
  id = "",
  setId = "",
  formRef = ""
) => {
  try {
    await getF({
      variables: {
        id: id,
      },
    }).then((res) => {
      setId(id);
      console.log(res);
      formRef.setFieldsValue({
        name: res?.data?.getUnit?.name?.map((item) => {
          return {
            value: item.value,
            lang: item.lang,
          };
        }),
        service: res?.data?.getUnit?.service?._id,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
