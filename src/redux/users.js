import { createSlice } from "@reduxjs/toolkit";
import { getUsersHandler } from "../components/CrudOprations/UserOprations";

const initialState = {
  value: [],
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUList: async (state, action) => {
      getUsersHandler(action.payload, state).then(
        (res) => (state.value = res.data)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUList } = users.actions;

export default users.reducer;
