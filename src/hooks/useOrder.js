import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Orders = gql`
  query getOrdersList($filters: GetOrdersQueryInput) {
    getOrders(filters: $filters) {
      _id
      accepted
      description
      status
      cash

      # service {
      #   presenter {
      #     fullName
      #     phoneNumber
      #     _id
      #   }
      #   country

      #   category {
      #     name {
      #       value
      #     }
      #   }
      # }
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
  query getUserOrdersList($filters: GetOrdersQueryInput, $userId: ID!) {
    getUserOrdersByAdmin(filters: $filters, userId: $userId) {
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
    getUserOrders,
    {
      data: userOrdersData,
      loading: userOrdersLoading,
      error: userOrdersError,
      refetch: userOrdersRefetch,
    },
  ] = useLazyQuery(GET_UserOrders, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getUserOrders,
    userOrdersData,
    userOrdersLoading,
    userOrdersError,
    userOrdersRefetch,
  };
};

// GET

// GET SINGLE
