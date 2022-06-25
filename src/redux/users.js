import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsers } = counterSlice.actions;

export default counterSlice.reducer;
