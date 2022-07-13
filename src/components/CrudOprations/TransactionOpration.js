import { message } from "antd";

// create
export const TransactionCreate = async (
  create = "",
  input = "",
  refetch = "",
  formRef = "",
  hide = "",
  error = ""
) => {
  console.log(input);
  try {
    await create({
      variables: { ...input },
    })
      .then(() => {
        message.success("با موفقیت ایجاد شد");
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

// get single
// export const TransactionGetSingle = async (getF = "", id = "", setId = "") => {
//   try {
//     await getF({
//       variables: {
//         id: id,
//       },
//     }).then((res) => {
//       console.log(res);
//       setId(id);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
