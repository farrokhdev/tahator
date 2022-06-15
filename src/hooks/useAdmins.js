import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET ALL ADMINS
export const GET_Admins = gql`
  query {
    getAdmins(pagination: { limit: 5 }) {
      username
      name
      family
      phoneNumber
      _id
    }
  }
`;

export const useGetAdmins = () => {
  const {
    data: adminsData,
    loading: adminsLoading,
    error: adminsError,
    refetch: adminRefetch,
  } = useQuery(GET_Admins, {
    manual: true,
  });

  return { adminsData, adminsLoading, adminsError, adminRefetch };
};

// GET ALL ADMINS END

// GET_ADMIN
export const GET_ADMIN = gql`
  query getSingleAdmin($id: ID!) {
    getAdmin(id: $id) {
      username
      name
      family
      phoneNumber
      _id
    }
  }
`;

export const useGetAdmin = (id) => {
  const [
    getSingleAdmin,
    {
      data: singleAdminData,
      loading: singleAdminLoading,
      error: singleAdminError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_ADMIN, {
    variables: { id: id },
  });

  return {
    getSingleAdmin,
    singleAdminData,
    singleAdminLoading,
    singleAdminError,
    singleRefetch,
  };
};
// GET_USER END

// DELETE ADMIN

export const DeleteAdmin = gql`
  mutation deleteAdmin($id: ID!) {
    deleteAdminByAdmin(id: $id)
  }
`;

export const useDeleteAdmin = (id) => {
  const [
    removeAdmin,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteAdmin, {
    variables: {
      id: id,
    },
  });

  return {
    removeAdmin,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// ADD ADMIN
export const AddAdmin = gql`
  mutation addAdmin(
    $username: String!
    $name: String!
    $family: String!
    $phoneNumber: String!
    $password: String!
    $role: ID!
  ) {
    createAdminByAdmin(
      input: {
        username: $username
        name: $name
        family: $family
        phoneNumber: $phoneNumber
        password: $password
        role: $role
      }
    ) {
      username
      name
      family
      phoneNumber
      password
      status
      role
    }
  }
`;

export const useAddAdmin = (input) => {
  const [createAdmin, { data: addData, loading: addLoading, error: addError }] =
    useMutation(AddAdmin, {
      variables: { input: input },
    });

  return { createAdmin, addData, addLoading, addError };
};
// ADD ADMIN END

// EDIT ADMIN

export const EditAdmin = gql`
  mutation editAdmin($username: String, $id: ID!) {
    updateAdminByAdmin(input: { username: $username }, id: $id) {
      _id
      username
      phoneNumber
      password
      status
    }
  }
`;

export const useEditAdmin = (input) => {
  const [
    editAdmin,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EditAdmin, {
    variables: { input: input },
  });

  return { editAdmin, editData, editLoading, editError };
};
// EDIT ADMIN END
