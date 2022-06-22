import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Currencys = gql`
  query getCurrencysList($filters: GetCurrencysQueryInput) {
    getCurrencys(filters: $filters) {
      _id
      unit
      status

      # barter
      # expireDate
      # cash
      # profit
      # accepted
    }
  }
`;

export const useGetCurrencys = () => {
  const [
    getCurrencysList,
    {
      data: CurrencysData,
      loading: CurrencysLoading,
      error: CurrencysError,
      refetch: CurrencysRefetch,
    },
  ] = useLazyQuery(GET_Currencys, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getCurrencysList,
    CurrencysData,
    CurrencysLoading,
    CurrencysError,
    CurrencysRefetch,
  };
};
