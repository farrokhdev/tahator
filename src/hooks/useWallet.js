import { gql, useMutation } from "@apollo/client";

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
