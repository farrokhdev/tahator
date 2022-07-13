import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET_USERS
export const GET_USERS = gql`
  query getUsers($filters: GetUsersQueryInput) {
    getUsers(filters: $filters) {
      _id
      type
      fullName
      phoneNumber
      address
      image
      profit
      email
      creditCardNO
      country
      bio
      cashWallet
      barter
      isDeleted
      payments {
        _id
      }
    }
  }
`;

export const useGetUsers = (filters) => {
  const [
    getUsersList,
    { data: usersData, loading: usersLoading, error: usersError, refetch },
  ] = useLazyQuery(GET_USERS, {
    variables: {
      filters: filters,
    },
    fetchPolicy: "no-cache",
  });

  return { getUsersList, usersData, usersLoading, usersError, refetch };
};

// GET_USERS END

// GET_USER
export const GET_USER = gql`
  query getSingleUser($id: ID!) {
    getUser(id: $id) {
      _id
      type
      fullName
      phoneNumber
      address
      image
      email
      type
      profit
      payments {
        _id
        order {
          buyer {
            fullName
          }
        }
        transaction {
          _id
          payment
          type
          increase
          decrease
          deposit
          withDraw
          isDeleted
        }
        # settlementRequest
        user {
          fullName
        }
        provider {
          fullName
        }
        status
        type
        description
        isDeleted
        image
        createdAt
        updatedAt
        from
      }
      # services {
      #   _id
      #   name {
      #     lang
      #     value
      #   }
      # creditCardNO
      # country
      # bio

      cashWallet
      barter
      enable
      currency {
        _id
        unit
        status
      }
    }
  }
`;

export const useGetUser = (id) => {
  const [
    getUser,
    {
      data: singleUserData,
      loading: singleUserLoading,
      error: singleUserError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_USER, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    getUser,
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
  mutation addUser($input: CreateUserByAdminInput) {
    createUserByAdmin(input: $input) {
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
  mutation editUser($input: UpdateUserByAdminInput, $userId: ID!) {
    updateUserByAdmin(input: $input, userId: $userId) {
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
