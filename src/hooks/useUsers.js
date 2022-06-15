import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET_USERS
export const GET_USERS = gql`
  query {
    getUsers {
      fullName
      username
      phoneNumber
      wallet
      rate
      _id
      createdAt
    }
  }
`;

export const useGetUsers = () => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch,
  } = useQuery(GET_USERS, {
    manual: true,
  });

  return { usersData, usersLoading, usersError, refetch };
};

// for filter users
export const FILTER_USERS = gql`
  query getUsers($filters: GetUsersQueryInput) {
    getUsers(filters: $filters) {
      fullName
      phoneNumber
      username
      wallet
      rate
      _id
    }
  }
`;

export const useFilterUsers = (filters) => {
  const [
    filterUsers,
    {
      data: filterUsersData,
      loading: filterUsersLoading,
      error: filterUsersError,
    },
  ] = useLazyQuery(FILTER_USERS, {
    variables: { filters: filters },
  });

  return { filterUsers, filterUsersData, filterUsersLoading, filterUsersError };
};

// GET_USERS END

// GET_USER
export const GET_USER = gql`
  query getSingleUser($id: ID!) {
    getUser(id: $id) {
      fullName
      username
      phoneNumber
      wallet
      rate
      _id
    }
  }
`;

export const useGetUser = (id) => {
  const [
    getSingleUser,
    {
      data: singleUserData,
      loading: singleUserLoading,
      error: singleUserError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_USER, {
    variables: { id: id },
  });

  return {
    getSingleUser,
    singleUserData,
    singleUserLoading,
    singleUserError,
    singleRefetch,
  };
};
// GET_USER END

// DELETE USER
export const DeleteUser = gql`
  mutation deleteUser($userId: ID!) {
    deleteUserByAdmin(userId: $userId)
  }
`;

export const useDeleteUser = (input) => {
  const [
    removeUser,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DeleteUser, {
    variables: { input: input },
  });

  return { removeUser, deleteData, deleteLoading, deleteError };
};

// DELETE USER

// ADD USER
export const AddUser = gql`
  mutation addUser(
    $username: String
    $fullName: String!
    $phoneNumber: String!
  ) {
    createUserByAdmin(
      input: {
        username: $username
        fullName: $fullName
        phoneNumber: $phoneNumber
      }
    ) {
      _id
    }
  }
`;
export const useAddUser = (input) => {
  const [createUser, { data: addData, loading: addLoading, error: addError }] =
    useMutation(AddUser, {
      variables: { input: input },
    });

  return { createUser, addData, addLoading, addError };
};

// ADD USER END

// EDIT USER
export const editUser = gql`
  mutation editUser(
    $username: String
    $fullName: String!
    $wallet: Float!
    $phoneNumber: String!
    $userId: ID!
  ) {
    updateUserByAdmin(
      input: {
        username: $username
        wallet: $wallet
        fullName: $fullName
        phoneNumber: $phoneNumber
      }
      userId: $userId
    ) {
      _id
    }
  }
`;
export const useEditUser = (input) => {
  const [
    updateUser,
    {
      data: editData,
      loading: editLoading,
      error: editError,
      refetch: editRefetch,
    },
  ] = useMutation(editUser, {
    variables: { input: input },
  });

  return { updateUser, editData, editLoading, editError, editRefetch };
};

// EDIT USER
