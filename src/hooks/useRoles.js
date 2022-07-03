import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Roles = gql`
  query getRolesList {
    getAdminRoles {
      name
      key
      _id
      # permissions
    }
  }
`;

export const useGetRoles = () => {
  const [
    getRoles,
    {
      data: RolesData,
      loading: RolesLoading,
      error: RolesError,
      refetch: RolesRefetch,
    },
  ] = useLazyQuery(GET_Roles, {
    manual: true,
  });

  return {
    getRoles,
    RolesData,
    RolesLoading,
    RolesError,
    RolesRefetch,
  };
};

// GET

// GET SINGLE
export const GET_Role = gql`
  query getSingleRole($id: ID!) {
    getAdminRole(id: $id) {
      name
      key
    }
  }
`;

export const useGetRole = (id) => {
  const [
    getSingleRole,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_Role, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    getSingleRole,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE

// ADD
export const AddRole = gql`
  mutation addRole($input: AdminRoleByAdminInput) {
    createAdminRoleByAdmin(input: $input) {
      name
      key
      # permissions
    }
  }
`;

export const useAddRole = (input) => {
  const [createRole, { data: addData, loading: addLoading, error: addError }] =
    useMutation(AddRole, {
      variables: { input: input },
    });

  return { createRole, addData, addLoading, addError };
};

//  ADD END

// EDIT Role

export const EditRole = gql`
  mutation editRole($input: AdminRoleByAdminInput, $id: ID!) {
    updateAdminRoleByAdmin(input: $input, id: $id) {
      name
      key
    }
  }
`;

export const useEditRole = (input) => {
  const [editRole, { data: editData, loading: editLoading, error: editError }] =
    useMutation(EditRole, {
      variables: { input: input },
    });

  return { editRole, editData, editLoading, editError };
};
// EDIT Role END
