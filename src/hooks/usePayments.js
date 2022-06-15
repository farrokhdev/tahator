import {useQuery, gql, useLazyQuery} from '@apollo/client';

export const GET_UserPayments_ByID = gql`
  query getPayment($id: ID!) {
    getPayment(id: $id){
      userId{
        username
        phoneNumber
      }
    }
  }
`;
export const useGetPayment = (id) => {
  const {
      data: singlePaymentData, 
      loading: singlePaymentLoading, 
      error: singlePaymentError,
      } = useQuery(GET_UserPayments_ByID, {
    variables: { id }
  });

  return { singlePaymentData, singlePaymentLoading, singlePaymentError }
}

const GET_Payments = gql`
query {
  getPayments{
    _id
    status
    amount
    description
  }
}
`;

export const useGetPayments = () => {
  const { 
    error: paymentsError, 
    data: paymentsData, 
    loading: paymentsLoading, refetch } = useQuery(GET_Payments, {
    manual: true
  });
  return {paymentsError, paymentsData, paymentsLoading, refetch};
};
