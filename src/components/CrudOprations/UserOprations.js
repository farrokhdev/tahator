import { message } from "antd";

// get
export const getUsersHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      const data = res?.data?.getUsers;
      const filtered = res?.data?.getUsers.filter((user) => !user.isDeleted);
      set(filtered);
    });
  } catch (err) {
    console.log(err);
  }
};

// create
export const UserCreate = async (
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

// filter
export const UserGetByfilter = async (
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
export const UserEdit = async (
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
        userId: id,
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
export const UserDelete = async (
  deleteF = "",
  id = "",
  refetch = "",
  error = ""
) => {
  try {
    await deleteF({
      variables: {
        userId: id,
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
export const UserGetSingle = async (
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
      formRef.setFieldsValue({
        ...res.data.getUser,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
