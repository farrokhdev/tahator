import { gql, useLazyQuery, useMutation } from "@apollo/client";

export const chargeWallet = gql`
  mutation chargeWallet($id: ID!, $amount: Float!) {
    chargeWalletByAdmin(id: $id, amount: $amount)
  }
`;

export const useChargeWallet = (id, amount) => {
  const [
    chargeUserWallet,
    {
      data: chargeData,
      loading: chargeLoading,
      error: chargeError,
      refetch: walletRefetch,
    },
  ] = useMutation(chargeWallet, {
    variables: { id: id, amount: amount },
    fetchPolicy: "no-cache",
  });

  return {
    chargeUserWallet,
    chargeData,
    chargeLoading,
    chargeError,
    walletRefetch,
  };
};

export const getUserFinancial = gql`
  query getFinancial {
    getFinancial {
      _id
      profitBarterFeePerMount
      systemIncome
      profitCashFeePerMount
    }
  }
`;

export const useGetFinancials = () => {
  const [
    getFinancialList,
    {
      data: financialData,
      error: financialError,
      loading: financialLoading,
      refetch: financialRefetch,
    },
  ] = useLazyQuery(getUserFinancial, {
    fetchPolicy: "no-cache",
  });

  return {
    getFinancialList,
    financialData,
    financialError,
    financialLoading,
    financialRefetch,
  };
};
