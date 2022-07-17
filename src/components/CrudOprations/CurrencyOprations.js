import { message } from "antd";

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
export const CurrencyCreate = async (
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
        message.success("واحد پول جدید با موفقیت ایجاد شد");
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
export const CurrencyGetByfilter = async (
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
export const CurrencyEdit = async (
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
        input: input,
      },
    })
      .then(() => {
        message.success("واحد پول با موفقیت ویرایش شد");
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
export const CurrencyDelete = async (
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
      message.success("واحد پول با موفقیت حذف شد");
      refetch();
    });
  } catch (err) {
    console.log(err);
    message.error(error ? error.message : "خطا");
  }
};
// get single
export const CurrencyGetSingle = async (
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
        unit: res.data?.getCurrency.unit,
        status: res.data?.getCurrency.status,
        description: res.data?.getCurrency.description,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
