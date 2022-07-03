import { message } from "antd";

// get
export const getCatsHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      // console.log(res.data.getCategorys);
      const catsData = res?.data?.getCategorys;
      const filteredCats = res?.data?.getCategorys.filter(
        (cat) => !cat.isDeleted
      );
      set(filteredCats);
    });
  } catch (err) {
    console.log(err);
  }
};

// create
export const CatsCreate = async (
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
        message.success("دسته جدید با موفقیت ایجاد شد");
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
export const CatsGetByfilter = async (
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
export const CatsEdit = async (
  edit = "",
  input = "",
  id = "",
  refetch = "",
  hide = "",
  error = ""
) => {
  console.log(input);
  try {
    await edit({
      variables: {
        id: id,
        input: input,
      },
    })
      .then(() => {
        message.success("دسته با موفقیت ویرایش شد");
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
export const CatsDelete = async (
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
      message.success("دسته با موفقیت حذف شد");
      refetch();
    });
  } catch (err) {
    console.log(err);
    message.error(error ? error.message : "خطا");
  }
};
// get single
export const CatsGetSingle = async (
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
      console.log(res.data.getCategory.name);
      setId(id);
      formRef.setFieldsValue({
        name: res.data.getCategory.name.map((item) => {
          return {
            lang: item.lang,
            value: item.value,
          };
        }),
      });
    });
  } catch (err) {
    console.log(err);
  }
};
