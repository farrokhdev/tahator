import {useQuery, gql, useMutation} from '@apollo/client';

export const GetQueryUsersPayments = gql`
 query {
  getPayments {
     amount
  }
 }
`;

export const GetUsersPayments = () => {
  const { error, data, loading } = useQuery(GetQueryUsersPayments);
  return {errorUsersPayments: error, usersPayments: data, loadingUsersPayments: loading};
};

/// //*******//////
export const GetQuerySettlementRequests = gql`
 query {
  getSettlementRequests(filters:{status:1}){
     amount
  }
 }
`;

export const GetSettlementRequests = () => {
  const { error, data, loading } = useQuery(GetQuerySettlementRequests);
  return {errorSettlementRequests: error, settlementRequests: data, loadingSettlementRequests: loading};
};

/// //*******//////
export const GetQueryUsersWallet = gql`
query {
  getUsers{
    wallet
  }
}
`;

export const GetUsersWallet = () => {
  const { error, data, loading } = useQuery(GetQueryUsersWallet);
  return {errorUsersWallet: error, usersWallet: data, loadingUsersWallet: loading};
};

/// //*******//////
export const GetQueryCallLogsStep = gql`
query {
  listCallLogs{
    step
  }
}
`;

export const GetCallLogsStep = () => {
  const { error, data, loading } = useQuery(GetQueryCallLogsStep);
  return {errorCallLogsStep: error, callLogsStep: data, loadingCallLogsStep: loading};
};

/// //*******//////
export const GetQueryReservesCall = gql`
 query {
  getReserves{
    _id
  }
}
`;

export const GetReservesCall = () => {
  const { error, data, loading } = useQuery(GetQueryReservesCall);
  return {errorReservesCall: error, reservesCall: data, loadingReservesCall: loading};
};
/// //*******//////
export const GetQueryUsersAmountBlocked = gql`
query {
  getUsers{
    amountBlocked
  }
}
`;
export const GetUsersAmountBlocked = () => {
  const { error, data, loading } = useQuery(GetQueryUsersAmountBlocked);
  return {errorUsersAmountBlocked: error, usersAmountBlocked: data, loadingUsersAmountBlocked: loading};
};
/// //*******//////
export const GetQueryUsers = gql`
query {
  getUsers{
    _id
  }
}
`;

export const GetUsers = () => {
  const { error, data, loading } = useQuery(GetQueryUsers);
  return {errorUsers: error, users: data, loadingUsers: loading};
};

/// //*******//////
export const GetQueryUsersEnable = gql`
query {
  getUsers{
    enable
  }
}
`;

export const GetUsersEnable = () => {
  const { error, data, loading } = useQuery(GetQueryUsersEnable);
  return {errorUsersEnable: error, usersEnable: data, loadingUsersEnable: loading};
};

/// //*******//////
export const GetQueryUsersUsername = gql`
query u{
  getUsers{
    username
    enable
  }
}
`;

export const GetUsersUsername = () => {
  const { error, data, loading } = useQuery(GetQueryUsersUsername);
  return {errorUsersUsername: error, usersUsername: data, loadingUsersUsersUsername: loading};
};
