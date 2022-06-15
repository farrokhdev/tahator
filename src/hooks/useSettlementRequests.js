import {useQuery, gql} from '@apollo/client';

const GET_SettlementRequests = gql`
query {
  getSettlementRequests{
    userId{
      _id
      username
      phoneNumber
      fullName
      enable
    }
    amount
    shebaNo
    creditCardNo
    bankName
    status
    description

  }
}
`;
export const useSettlementRequests = () => {
  const { error, data, loading } = useQuery(GET_SettlementRequests);
  return {error, data, loading};
};
