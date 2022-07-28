import { gql, useLazyQuery, useMutation } from "@apollo/client";

export const getPayments = gql`
  query getPeymentList($filters: GetPaymentsQueryInput) {
    getPayments(filters: $filters) {
      _id
      user {
        fullName
      }
      admin {
        username
      }
      description
      transactionType
      accepted
    }
  }
`;

export const useGetPayments = (filters) => {
  const [
    getPaymentList,
    {
      data: paymentData,
      loading: paymentLoading,
      error: paymentError,
      refetch: paymentRefetch,
    },
  ] = useLazyQuery(getPayments, {
    variables: { filters: filters },
    fetchPolicy: "no-cache",
  });

  return {
    getPaymentList,
    paymentData,
    paymentLoading,
    paymentError,
    paymentRefetch,
  };
};

// accept
export const acceptPayment = gql`
  mutation acceptUserPayment($id: ID!) {
    acceptUserChargeWalletByAdmin(id: $id) {
      _id
    }
  }
`;

export const useAcceptPayment = (id) => {
  const [
    acceptPaymentByAdmin,
    {
      data: acceptData,
      loading: acceptLoading,
      error: acceptError,
      refetch: acceptRefetch,
    },
  ] = useMutation(acceptPayment, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    acceptPaymentByAdmin,
    acceptData,
    acceptLoading,
    acceptError,
    acceptRefetch,
  };
};
// accept end
