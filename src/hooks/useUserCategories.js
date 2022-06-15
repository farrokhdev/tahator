import { useQuery, gql, useMutation } from "@apollo/client";

// GET
export const GET_UserCategories = gql`
  query {
    getUserCategories {
      _id
      title
      key
      description
    }
  }
`;

export const useGetUserCats = () => {
  const {
    data: userCatsData,
    loading: userCatsLoading,
    error: userCatsError,
    refetch,
  } = useQuery(GET_UserCategories, {
    manual: true,
  });

  return { userCatsData, userCatsLoading, userCatsError, refetch };
};
// GET

// DELETE
export const DeleteUserCategory = gql`
  mutation deleteUserCategory($id: ID!) {
    deleteUserCategoryByAdmin(id: $id)
  }
`;

export const useDeleteUserCat = (input) => {
  const [
    removeUserCat,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DeleteUserCategory, {
    variables: { input: input },
  });

  return { removeUserCat, deleteData, deleteLoading, deleteError };
};

// DELETE

// ADD
export const AddUserCategory = gql`
  mutation addUserCategory(
    $title: String
    $key: String!
    $description: String!
  ) {
    createUserCategoryByAdmin(
      input: { title: $title, key: $key, description: $description }
    ) {
      _id
      title
      key
      description
      __typename
    }
  }
`;

export const useAddUserCat = (input) => {
  const [
    createUserCat,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(AddUserCategory, {
    variables: { input: input },
  });

  return { createUserCat, addData, addLoading, addError };
};

// ADD

// EDIT
export const EditUserCategory = gql`
  mutation editUserCategory(
    $title: String
    $key: String!
    $description: String!
    $id: ID!
  ) {
    updateUserCategoryByAdmin(
      input: { title: $title, key: $key, description: $description }
      id: $id
    ) {
      _id
      title
      key
      description
      __typename
    }
  }
`;

export const useEditUserCat = (input) => {
  const [
    updateUserCat,
    {
      data: editData,
      loading: editLoading,
      error: editError,
      refetch: editRefetch,
    },
  ] = useMutation(EditUserCategory, {
    variables: { input: input },
  });

  return { updateUserCat, editData, editLoading, editError, editRefetch };
};

// EDIT
