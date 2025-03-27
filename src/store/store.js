import { configureStore } from "@reduxjs/toolkit";
import isAdminReducer from "./isAdminSlice";

const store = configureStore({
  reducer: {
    isAdmin: isAdminReducer,
  },
});

export default store;
