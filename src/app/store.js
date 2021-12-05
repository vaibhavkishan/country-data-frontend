import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../countries/countrySlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});
