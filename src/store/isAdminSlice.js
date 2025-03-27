import { createSlice } from "@reduxjs/toolkit";

const isAdminSlice = createSlice({
  name: "isAdmin",
  initialState: {
    value: false,
  },
  reducers: {
    setIsAdmin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsAdmin } = isAdminSlice.actions;

export default isAdminSlice.reducer;
