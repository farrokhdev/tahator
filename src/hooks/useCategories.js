import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Categories = gql`
  query getCategoriesList($filters: GetCategorysQueryInput) {
    getCategorys(filters: $filters) {
      _id
      name {
        lang
        value
      }
      categoryAttrs {
        name {
          lang
          value
        }
      }
      accepted
      isDeleted
    }
  }
`;

export const useGetCategories = () => {
  const [
    getCategoriesList,
    {
      data: CategoriesData,
      loading: CategoriesLoading,
      error: CategoriesError,
      refetch: CategoriesRefetch,
    },
  ] = useLazyQuery(GET_Categories, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getCategoriesList,
    CategoriesData,
    CategoriesLoading,
    CategoriesError,
    CategoriesRefetch,
  };
};

// GET

// GET SINGLE
export const GET_Categorie = gql`
  query getSingleCategorie($id: ID!) {
    getCategory(id: $id) {
      name {
        value
        lang
      }

      _id
    }
  }
`;

export const useGetCategorie = (id) => {
  const [
    getSingleCategorie,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_Categorie, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    getSingleCategorie,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE

// DELETE

export const DeleteCategorie = gql`
  mutation deleteCategorie($id: ID!) {
    deleteCategoryByAdmin(id: $id)
  }
`;

export const useDeleteCategorie = (id) => {
  const [
    removeCategorie,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteCategorie, {
    variables: {
      id: id,
    },
  });

  return {
    removeCategorie,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// ADD
export const AddCategorie = gql`
  mutation addCategorie($input: CreateCategoryByAdminInput) {
    createCategoryByAdmin(input: $input) {
      _id
    }
  }
`;

export const useAddCategorie = (input) => {
  const [
    createCategorie,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(AddCategorie, {
    variables: { input: input },
  });

  return { createCategorie, addData, addLoading, addError };
};
// ADD END

// EDIT Categorie

export const EditCategorie = gql`
  mutation editCategorie($input: UpdateCategoryByAdminInput, $id: ID!) {
    updateCategoryByAdmin(input: $input, id: $id) {
      _id
    }
  }
`;

export const useEditCategorie = (input) => {
  const [
    editCategorie,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EditCategorie, {
    variables: { input: input },
  });

  return { editCategorie, editData, editLoading, editError };
};
// EDIT Categorie END
