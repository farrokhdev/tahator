import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersHandler } from "../components/CrudOprations/UserOprations";

const initialState = {
  users: [],
  loading: false,
  error: "",
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllStatus",
  async (getF) => {
    try {
      const res = await getF();
      const data = res?.data?.getUsers;
      const filtered = res?.data?.getUsers.filter((user) => !user.isDeleted);
      // set(filtered);
      return filtered;
    } catch (err) {
      console.log(err);
    }
  }
);

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error.push(action.payload.message);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUList } = users.actions;

export default users.reducer;
