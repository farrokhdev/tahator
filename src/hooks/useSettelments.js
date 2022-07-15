import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

// GET
export const GET_Settlements = gql`
  query getSettlements($filters: GetSettlementRequestFiltersInput) {
    getSettlementRequests(filters: $filters) {
      _id
      userId {
        _id
        type
        fullName
        phoneNumber
        address
        country
        cashWallet
        creditCardNO
        # image
        # profit
        # services
        # boughtServices
        # email
        # bio
        # orders
        # barter
        # birthday
        # city
        # enable
        # rate
        # token
        # currency
        # isDeleted
        # blockedCash
        # blockedBarter
        # language
        # payments
      }
      amount
      shebaNo
      creditCardNo
      bankName
      status
      description
      isDeleted
    }
  }
`;

export const useGetSettlements = (filters) => {
  const [
    getSettlementList,
    {
      data: settlementData,
      loading: settlementLoading,
      error: settlementError,
      refetch,
    },
  ] = useLazyQuery(GET_Settlements, {
    variables: {
      filters: filters,
    },
    fetchPolicy: "no-cache",
  });

  return {
    getSettlementList,
    settlementData,
    settlementLoading,
    settlementError,
    refetch,
  };
};

// GET_USERS END

// Finish_settelment
export const finishSettelment = gql`
  mutation finishSet($input: FinishSettlementRequestInput!, $id: ID!) {
    finishSettlementRequest(input: $input, id: $id)
  }
`;
export const useFinishSettelment = (input) => {
  const [
    finishSettelmentReq,
    { data: finishData, loading: finishLoading, error: finishError },
  ] = useMutation(finishSettelment, {
    variables: { input: input },
  });

  return { finishSettelmentReq, finishData, finishLoading, finishError };
};

// Finish_settelment End

// GET_Single
// export const GET_USER = gql`
//   query getSingleUser($id: ID!) {
//     getUser(id: $id) {
//       _id
//       type
//       fullName
//       phoneNumber
//       address
//       image
//       email
//       type
//       profit
//       payments {
//         _id
//         order {
//           buyer {
//             fullName
//           }
//         }
//         transaction {
//           _id
//           payment
//           type
//           increase
//           decrease
//           deposit
//           withDraw
//           isDeleted
//         }
//         # settlementRequest
//         user {
//           fullName
//         }
//         provider {
//           fullName
//         }
//         status
//         type
//         description
//         isDeleted
//         image
//         createdAt
//         updatedAt
//         from
//       }
//       # services {
//       #   _id
//       #   name {
//       #     lang
//       #     value
//       #   }
//       # creditCardNO
//       # country
//       # bio

//       cashWallet
//       barter
//       enable
//       currency {
//         _id
//         unit
//         status
//       }
//     }
//   }
// `;

// export const useGetUser = (id) => {
//   const [
//     getUser,
//     {
//       data: singleUserData,
//       loading: singleUserLoading,
//       error: singleUserError,
//       refetch: singleRefetch,
//     },
//   ] = useLazyQuery(GET_USER, {
//     variables: { id: id },
//     fetchPolicy: "no-cache",
//   });

//   return {
//     getUser,
//     singleUserData,
//     singleUserLoading,
//     singleUserError,
//     singleRefetch,
//   };
// };
// GET_Single END

// DELETE
// export const DeleteUser = gql`
//   mutation deleteUser($userId: ID!) {
//     deleteUserByAdmin(userId: $userId)
//   }
// `;

// export const useDeleteUser = (input) => {
//   const [
//     removeUser,
//     { data: deleteData, loading: deleteLoading, error: deleteError },
//   ] = useMutation(DeleteUser, {
//     variables: { input: input },
//   });

//   return { removeUser, deleteData, deleteLoading, deleteError };
// };

// DELETE

// ADD
// export const AddUser = gql`
//   mutation addUser($input: CreateUserByAdminInput) {
//     createUserByAdmin(input: $input) {
//       _id
//     }
//   }
// `;
// export const useAddUser = (input) => {
//   const [createUser, { data: addData, loading: addLoading, error: addError }] =
//     useMutation(AddUser, {
//       variables: { input: input },
//     });

//   return { createUser, addData, addLoading, addError };
// };

// ADD END

// EDIT
// export const editUser = gql`
//   mutation editUser($input: UpdateUserByAdminInput, $userId: ID!) {
//     updateUserByAdmin(input: $input, userId: $userId) {
//       _id
//     }
//   }
// `;
// export const useEditUser = (input) => {
//   const [
//     updateUser,
//     {
//       data: editData,
//       loading: editLoading,
//       error: editError,
//       refetch: editRefetch,
//     },
//   ] = useMutation(editUser, {
//     variables: { input: input },
//   });

//   return { updateUser, editData, editLoading, editError, editRefetch };
// };

// EDIT
