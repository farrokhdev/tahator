// get
export const GetFinancialHandler = async (getF, set) => {
  try {
    await getF().then((res) => {
      console.log(res);
      const data = res?.data?.getFinancial;
      // const filtered = res?.data?.getFinancial.filter(
      //   (financial) => !financial.isDeleted
      // );
      set([res?.data?.getFinancial]);

      // set.value = res.data;
    });
  } catch (err) {
    console.log(err);
  }
};
