import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_ListCallLogs = gql`
  query {
    listCallLogs {
      user {
        username
        amountBlocked
      }
      status
      caller
      isReserved
    }
  }
`;
export const useListCallLogs = () => {
  const {
    data: callsData,
    error: callsError,
    loading: callsLoading,
    refetch,
  } = useQuery(GET_ListCallLogs, {
    manual: true,
  });

  return { callsData, callsError, callsLoading, refetch };
};

const GET_getCallLog = gql`
  query getCallLog($id: ID!) {
    getCallLog {
      user {
        username
        amountBlocked
      }
    }
  }
`;

export const useGetCallLog = (id) => {
  const [
    getCallLogs,
    {
      data: singleCallData,
      error: singleCallError,
      loading: singleCallLoading,
    },
  ] = useLazyQuery(GET_getCallLog, {
    variables: { id },
  });

  return { getCallLogs, singleCallData, singleCallError, singleCallLoading };
};
