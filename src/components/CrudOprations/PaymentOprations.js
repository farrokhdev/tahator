import { message } from "antd";

// get
export const getPaymentsHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      const data = res?.data?.getPayments;
      const filtered = res?.data?.getPayments.filter(
        (payment) => !payment.isDeleted && payment.transactionType === "Offline"
      );
      set(filtered);
      // set.value = res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

// accept
export const PaymentAccept = async (
  accept = "",
  id = "",
  refetch = "",
  error = ""
) => {
  try {
    await accept({
      variables: {
        id: id,
      },
    }).then(() => {
      message.success("تراکنش با موفقیت تایید شد");
      refetch();
    });
  } catch (err) {
    console.log(err);
    await message.error(error ? error.message : "");
  }
};
