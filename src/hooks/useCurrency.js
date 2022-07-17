import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Currencys = gql`
  query getCurrencysList($filters: GetCurrencysQueryInput) {
    getCurrencys(filters: $filters) {
      _id
      unit
      status
      description
      isDeleted
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

// ADD
export const AddCurrency = gql`
  mutation addUnit($input: CreateCurrencyByAdminInput) {
    createCurrencyByAdmin(input: $input) {
      unit
      status
      description
    }
  }
`;

export const useAddCurrency = (input) => {
  const [createUnit, { data: addData, loading: addLoading, error: addError }] =
    useMutation(AddCurrency, {
      variables: { input: input },
    });

  return { createUnit, addData, addLoading, addError };
};
// ADD END
// GET SINGLE
export const GET_Currency = gql`
  query getSingleCurrency($id: ID!) {
    getCurrency(id: $id) {
      _id
      unit
      status
      description
      isDeleted
    }
  }
`;

export const useGetCurrency = (id) => {
  const [
    getSingleCurrency,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_Currency, {
    variables: { id: id },
  });

  return {
    getSingleCurrency,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE
// DELETE

export const DeleteCurrency = gql`
  mutation deleteCurrency($id: ID!) {
    deleteCurrencyByAdmin(id: $id)
  }
`;

export const useDeleteCurrency = (id) => {
  const [
    removeCurrency,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteCurrency, {
    variables: {
      id: id,
    },
  });

  return {
    removeCurrency,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// EDIT

export const EditCurrency = gql`
  mutation editCurrency($input: UpdateCurrencyByAdminInput, $id: ID!) {
    updateCurrencyByAdmin(input: $input, id: $id) {
      _id
      unit
      status
      description
    }
  }
`;

export const useEditCurrency = (input) => {
  const [
    editCurrency,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EditCurrency, {
    variables: { input: input },
  });

  return { editCurrency, editData, editLoading, editError };
};
// EDIT
