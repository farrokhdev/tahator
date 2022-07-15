import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersHandler } from "../components/CrudOprations/UserOprations";

const initialState = {
  financials: [],
  loading: "false",
};

export const getFinancialListRedux = createAsyncThunk(
  "financials/fetchFinancials",
  async (getF, set) => {
    try {
      await getF().then((res) => {
        const data = res?.data?.getFinancials;
        const filtered = res?.data?.getFinancials.filter(
          (financial) => !financial.isDeleted
        );
        //   set(filtered);
        return filtered;
        // set.value = filtered;
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const financials = createSlice({
  name: "financials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFinancialListRedux.fulfilled, (state, action) => {
      // Add user to the state array
      state.financials.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
// export const { getUList } = financials.actions;

export default financials.reducer;
