import { message } from "antd";

// create
export const ServiceCreate = async (
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
        message.success("سرویس جدید با موفقیت ایجاد شد");
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
export const ServiceGetByfilter = async (
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
export const ServiceEdit = async (
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
        message.success("سرویس با موفقیت ویرایش شد");
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
export const ServiceDelete = async (
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
      message.success("سرویس با موفقیت حذف شد");
      refetch();
    });
  } catch (err) {
    console.log(err);
    message.error(error ? error.message : "خطا");
  }
};
// get single
export const ServiceGetSingle = async (
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
      console.log(res.data.getService);
      setId(id);
      formRef.setFieldsValue({
        // name: res.data.getService.name.map((val) => val.value),
        presenter: res.data.getService.presenter._id,
        category: res.data.getService.category._id,
        value: res.data.getService.value,

        // barter: res.data.getService.barter.unit._id,
        amount: res.data.getService.barter.amount,
        // cash: res.data.getService.cash.unit._id,
        cashAmount: res.data.getService.barter.amount,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
