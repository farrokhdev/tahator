import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Orders = gql`
  query getOrdersList($filters: GetOrdersQueryInput) {
    getOrders(filters: $filters) {
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
      data: OrdersData,
      loading: OrdersLoading,
      error: OrdersError,
      refetch: OrdersRefetch,
    },
  ] = useLazyQuery(GET_Orders, {
    manual: true,
  });

  return {
    getOrdersList,
    OrdersData,
    OrdersLoading,
    OrdersError,
    OrdersRefetch,
  };
};

// GET

// GET SINGLE
export const GET_Order = gql`
  query getSingleOrder($id: ID!) {
    getOrder(id: $id) {
      name {
        value
      }
      presenter {
        fullName
      }
      _id
    }
  }
`;

export const useGetOrder = (id) => {
  const [
    getSingleOrder,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_Order, {
    variables: { id: id },
  });

  return {
    getSingleOrder,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE

// DELETE

export const DeleteOrder = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrderByOrder(id: $id)
  }
`;

export const useDeleteOrder = (id) => {
  const [
    removeOrder,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteOrder, {
    variables: {
      id: id,
    },
  });

  return {
    removeOrder,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// ADD
export const AddOrder = gql`
  mutation addOrder(
    $name: [MultiLanguageInput]!
    $presenter: ID!
    $category: ID!
    $value: Float!
    $barter: PayUnit!
    $discount: Float
    $expireDate: expireDate
    $cash: PayUnit!
    $profit: Float
  ) {
    createOrderByOrder(
      input: {
        name: $name
        presenter: $presenter
        category: $category
        value: $value
        barter: $barter
        discount: $discount
        expireDate: $expireDate
        cash: $cash
        profit: $profit
      }
    ) {
      name {
        value
      }
      presenter
      category
      value
      barter
      discount
      expireDate
      cash
      profit
    }
  }
`;

export const useAddOrder = (input) => {
  const [createOrder, { data: addData, loading: addLoading, error: addError }] =
    useMutation(AddOrder, {
      variables: { input: input },
    });

  return { createOrder, addData, addLoading, addError };
};
// ADD END

// EDIT Order

export const EditOrder = gql`
  mutation editOrder($input: UpdateOrderByAdminInput, $id: ID!) {
    updateOrderByOrder(input: $input, id: $id) {
      name {
        value
      }
      presenter
      category
      value
      barter
      discount
      expireDate
      cash
      profit
    }
  }
`;

export const useEditOrder = (input) => {
  const [
    editOrder,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EditOrder, {
    variables: { input: input },
  });

  return { editOrder, editData, editLoading, editError };
};
// EDIT Order END
