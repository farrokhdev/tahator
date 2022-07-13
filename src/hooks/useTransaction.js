import { gql, useMutation } from "@apollo/client";

// ADD Transaction
export const addTransaction = gql`
  mutation addTransaction(
    $amount: Float!
    $id: ID!
    $type: Direction!
    $wallet: WalletEnum!
  ) {
    chargeWalletByAdmin(amount: $amount, id: $id, type: $type, wallet: $wallet)
  }
`;

export const useAddTransaction = (input) => {
  const [
    createTransaction,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(addTransaction, {
    variables: { ...input },
  });

  return { createTransaction, addData, addLoading, addError };
};
// ADD Transaction END
