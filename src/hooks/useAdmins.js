import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET ALL ADMINS
export const GET_Admins = gql`
  query getAdminsList($filters: GetAdminsByAdminQueryInput) {
    getAdmins(filters: $filters) {
      username
      name
      family
      role
      _id
    }
  }
`;

export const useGetAdmins = (filters) => {
  const [
    getAdminsList,
    {
      data: adminsData,
      loading: adminsLoading,
      error: adminsError,
      refetch: adminRefetch,
    },
  ] = useLazyQuery(GET_Admins, {
    manual: true,
    variables: {
      filters: filters,
      fetchPolicy: "no-cache",
    },
  });

  return {
    getAdminsList,
    adminsData,
    adminsLoading,
    adminsError,
    adminRefetch,
  };
};

// GET ALL ADMINS END

// GET_ADMIN
export const GET_ADMIN = gql`
  query getSingleAdmin($id: ID!) {
    getAdmin(id: $id) {
      username
      name
      family

      role
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
    fetchPolicy: "no-cache",
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
  mutation addAdmin($input: CreateAdminByAdminInput) {
    createAdminByAdmin(input: $input) {
      username
      name
      family
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
  mutation editAdmin($input: UpdateAdminByAdminInput, $id: ID!) {
    updateAdminByAdmin(input: $input, id: $id) {
      _id
      username
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
