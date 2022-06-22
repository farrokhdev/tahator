import { gql, useMutation } from "@apollo/client";

const SET_LOGIN = gql`
  mutation adminLogin($input: adminLoginInput) {
    adminLogin(input: $input) {
      token {
        accessToken
        refreshToken
      }
    }
  }
`;

export const useLogin = (input) => {
  const [
    setLogin,
    {
      data: loginData,
      loading: loginloading,
      error: loginError,
      refetch: loginRefetch,
    },
  ] = useMutation(SET_LOGIN, {
    variables: {
      input: input,
    },
  });

  return { setLogin, loginData, loginloading, loginError, loginRefetch };
};
