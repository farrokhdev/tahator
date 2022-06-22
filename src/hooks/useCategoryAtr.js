import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_CategoryAtrs = gql`
  query getCategoryAtrsList($filters: GetCategory_attrsQueryInput) {
    getCategory_attrs(filters: $filters) {
      _id
      name {
        value
      }

      accepted
      category {
        _id
      }

      # barter
      # expireDate
      # cash
      # profit
      # accepted
    }
  }
`;

export const useGetCategoryAtrs = () => {
  const [
    getCategoryAtrsList,
    {
      data: CategoryAtrsData,
      loading: CategoryAtrsLoading,
      error: CategoryAtrsError,
      refetch: CategoryAtrsRefetch,
    },
  ] = useLazyQuery(GET_CategoryAtrs, {
    manual: true,
  });

  return {
    getCategoryAtrsList,
    CategoryAtrsData,
    CategoryAtrsLoading,
    CategoryAtrsError,
    CategoryAtrsRefetch,
  };
};

// GET

// GET SINGLE
export const GET_CategoryAtr = gql`
  query getSingleCategoryAtr($id: ID!) {
    getCategory_attr(id: $id) {
      name {
        value
      }
      category {
        _id
      }

      _id
      accepted
    }
  }
`;

export const useGetCategoryAtr = (id) => {
  const [
    getSingleCategoryAtr,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_CategoryAtr, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    getSingleCategoryAtr,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE

// DELETE

export const DeleteCategoryAtr = gql`
  mutation deleteCategoryAtr($id: ID!) {
    deleteCategory_attrByAdmin(id: $id)
  }
`;

export const useDeleteCategoryAtr = (id) => {
  const [
    removeCategoryAtr,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteCategoryAtr, {
    variables: {
      id: id,
    },
  });

  return {
    removeCategoryAtr,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// ADD
export const AddCategoryAtr = gql`
  mutation addCategoryAtr($input: CreateCategory_attrByAdminInput) {
    createCategory_attrByAdmin(input: $input) {
      name {
        value
      }
      _id
    }
  }
`;

export const useAddCategoryAtr = (input) => {
  const [
    createCategoryAtr,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(AddCategoryAtr, {
    variables: { input: input },
  });

  return { createCategoryAtr, addData, addLoading, addError };
};
// ADD END

// EDIT CategoryAtr

export const EditCategoryAtr = gql`
  mutation editCategoryAtr($input: UpdateCategory_attrByAdminInput, $id: ID!) {
    updateCategory_attrByAdmin(input: $input, id: $id) {
      _id
    }
  }
`;

export const useEditCategoryAtr = (input) => {
  const [
    editCategoryAtr,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EditCategoryAtr, {
    variables: { input: input },
  });

  return { editCategoryAtr, editData, editLoading, editError };
};
// EDIT CategoryAtr END
