import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Orders = gql`
  query getOrdersList($filters: GetOrdersQueryInput) {
    getOrders(filters: $filters) {
      _id
      accepted
      description

      service {
        presenter {
          fullName
          phoneNumber
        }
        category {
          name {
            value
          }
        }
      }
      buyer {
        fullName
      }
    }
  }
`;

export const useGetOrders = () => {
  const [
    getOrdersList,
    {
      data: ordersData,
      loading: ordersLoading,
      error: ordersError,
      refetch: ordersRefetch,
    },
  ] = useLazyQuery(GET_Orders, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getOrdersList,
    ordersData,
    ordersLoading,
    ordersError,
    ordersRefetch,
  };
};

export const GET_UserOrders = gql`
  query getUserOrdersList($filters: GetOrdersQueryInput) {
    getUserOrdersByAdmin(filters: $filters) {
      _id
      accepted
      description

      # service {
      #   presenter {
      #     fullName
      #     phoneNumber
      #   }
      #   category {
      #     name {
      #       value
      #     }
      #   }
      # }
      # buyer {
      #   fullName
      # }
    }
  }
`;

export const useGetUserOrders = () => {
  const [
    getUserOrdersList,
    {
      data: userOrdersData,
      loading: userOrdersLoading,
      error: userOrdersError,
      refetch: userOrdersRefetch,
    },
  ] = useLazyQuery(GET_Orders, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getUserOrdersList,
    userOrdersData,
    userOrdersLoading,
    userOrdersError,
    userOrdersRefetch,
  };
};

// GET

// GET SINGLE
