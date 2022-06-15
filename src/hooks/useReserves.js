import {useQuery, gql} from '@apollo/client';

const GET_Reserves = gql`
query {
  getReserves{
  date
  time
  provider{
    username
    amountBlocked
  }
  userId{
    amountBlocked
  }

}
}
`;

export const useReserves = () => {
  const { error, data, loading } = useQuery(GET_Reserves);
  return {error, data, loading};
};
