import { message } from "antd";

// get
export const getSettelmentsHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      const data = res?.data?.getSettelments;
      const filtered = res?.data?.getSettelments.filter(
        (Settelment) => !Settelment.isDeleted
      );
      set(filtered);
      // set.value = res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

// filter
export const SettelmentGetByfilter = async (
  getF = "",
  set,
  filters = "",
  formRef
) => {
  try {
    if (filters) {
      await getF({
        variables: {
          filters: {
            ...filters,
          },
        },
      }).then((res) => {
        const data = res?.data?.getSettelments;
        const filtered = res?.data?.getSettelments.filter(
          (Settelment) => !Settelment.isDeleted
        );
        set(filtered);
        formRef.resetFields();
      });
    } else {
      getSettelmentsHandler(getF, set);
    }
  } catch (err) {
    console.log(err);
  }
};

// create
export const SettelmentCreate = async (
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
        message.success("کاربر جدید با موفقیت ایجاد شد");
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

// edit
export const SettelmentEdit = async (
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
        SettelmentId: id,
        input: { ...input },
      },
    })
      .then(() => {
        message.success("کاربر با موفقیت ویرایش شد");
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
export const SettelmentDelete = async (
  deleteF = "",
  id = "",
  refetch = "",
  error = ""
) => {
  try {
    await deleteF({
      variables: {
        SettelmentId: id,
      },
    }).then(() => {
      message.success("کاربر با موفقیت حذف شد");
      refetch();
    });
  } catch (err) {
    console.log(err);
    message.error(error ? error.message : "خطا");
  }
};
// get single
export const SettelmentGetSingle = async (
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
      console.log(res);
      setId(id);
      formRef.setFieldsValue({
        ...res.data.getSettelment,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
