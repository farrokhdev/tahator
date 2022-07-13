import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET

export const GET_Services = gql`
  query getServicesList($filters: GetServicesQueryInput) {
    getServices(filters: $filters) {
      _id
      name {
        lang
        value
      }
      presenter {
        fullName
      }
      category {
        name {
          value
          lang
        }
      }
    }
  }
`;

export const useGetServices = () => {
  const [
    getServicesList,
    {
      data: servicesData,
      loading: servicesLoading,
      error: servicesError,
      refetch: servicesRefetch,
    },
  ] = useLazyQuery(GET_Services, {
    manual: true,
    fetchPolicy: "no-cache",
  });

  return {
    getServicesList,
    servicesData,
    servicesLoading,
    servicesError,
    servicesRefetch,
  };
};

// GET

// GET SINGLE
export const GET_Service = gql`
  query getSingleService($id: ID!) {
    getService(id: $id) {
      _id
      name {
        value
        lang
      }
      presenter {
        _id
        fullName
        phoneNumber
        address
        type
      }
      category {
        _id
        name {
          lang
          value
        }
        accepted
      }
      barter {
        unit {
          _id
        }
        amount
      }
      cash {
        unit {
          _id
        }
        amount
      }
      value
    }
  }
`;

export const useGetService = (id) => {
  const [
    getSingleService,
    {
      data: singleData,
      loading: singleLoading,
      error: singleError,
      refetch: singleRefetch,
    },
  ] = useLazyQuery(GET_Service, {
    variables: { id: id },
    fetchPolicy: "no-cache",
  });

  return {
    getSingleService,
    singleData,
    singleLoading,
    singleError,
    singleRefetch,
  };
};
// GET SINGLE

// DELETE

export const DeleteService = gql`
  mutation deleteService($id: ID!) {
    deleteServiceByAdmin(id: $id)
  }
`;

export const useDeleteService = (id) => {
  const [
    removeService,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      refetch: deleteRefetch,
    },
  ] = useMutation(DeleteService, {
    variables: {
      id: id,
    },
  });

  return {
    removeService,
    deleteData,
    deleteLoading,
    deleteError,
    deleteRefetch,
  };
};

// ADD
export const AddService = gql`
  mutation addService($input: CreateServiceByAdminInput) {
    createServiceByAdmin(input: $input) {
      _id
    }
  }
`;

export const useAddService = (input) => {
  const [
    createService,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(AddService, {
    variables: { input: input },
  });

  return { createService, addData, addLoading, addError };
};
// ADD END

// EDIT Service

export const EditService = gql`
  mutation editService($input: UpdateServiceByAdminInput, $id: ID!) {
    updateServiceByAdmin(input: $input, id: $id) {
      _id
    }
  }
`;

export const useEditService = (input) => {
  const [
    editService,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EditService, {
    variables: { input: input },
  });

  return { editService, editData, editLoading, editError };
};
// EDIT Service END
