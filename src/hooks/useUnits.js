import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Units = gql`
  query getUnitsList($filters: GetUnitsQueryInput) {
    getUnits(filters: $filters, pagination: { limit: 5 }) {
      _id
      name {
        value
      }
      service {
        presenter {
          fullName
        }
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

export const useGetUnits = () => {
  const [
    getUnitsList,
    {
      data: UnitsData,
      loading: UnitsLoading,
      error: UnitsError,
      refetch: UnitsRefetch,
    },
  ] = useLazyQuery(GET_Units, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getUnitsList,
    UnitsData,
    UnitsLoading,
    UnitsError,
    UnitsRefetch,
  };
};

// GET

// GET SINGLE
export const GET_Unit = gql`
  query getSingleUnit($id: ID!) {
    getUnit(id: $id) {
      name {
        value
        lang
      }
      service {
        presenter {
          fullName
        }
        _id
      }

      _id
    }
  }
`;

export const useGetUnit = (id) => {
  const [
    getSingleUnit,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_Unit, {
    variables: { id: id },
  });

  return {
    getSingleUnit,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE

// DELETE

export const DeleteUnit = gql`
  mutation deleteUnit($id: ID!) {
    deleteUnitByAdmin(id: $id)
  }
`;

export const useDeleteUnit = (id) => {
  const [
    removeUnit,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteUnit, {
    variables: {
      id: id,
    },
  });

  return {
    removeUnit,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// ADD
export const AddUnit = gql`
  mutation addUnit($input: CreateUnitByAdminInput) {
    createUnitByAdmin(input: $input) {
      name {
        value
      }
      _id
    }
  }
`;

export const useAddUnit = (input) => {
  const [createUnit, { data: addData, loading: addLoading, error: addError }] =
    useMutation(AddUnit, {
      variables: { input: input },
    });

  return { createUnit, addData, addLoading, addError };
};
// ADD END

// EDIT Unit

export const EditUnit = gql`
  mutation editUnit($input: UpdateUnitByAdminInput, $id: ID!) {
    updateUnitByAdmin(input: $input, id: $id) {
      name {
        value
        lang
      }
    }
  }
`;

export const useEditUnit = (input) => {
  const [editUnit, { data: editData, loading: editLoading, error: editError }] =
    useMutation(EditUnit, {
      variables: { input: input },
    });

  return { editUnit, editData, editLoading, editError };
};
// EDIT Unit END
