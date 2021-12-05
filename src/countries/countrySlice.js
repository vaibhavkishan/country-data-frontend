import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: { countries: [] },
  reducers: {
    initializeState: (state, action) => {
      state.countries = action.payload;
    },
    addCountry: (state, action) => {
      state.countries.push(action.payload);
    },
  },
});

export const { initializeState, addCountry } = countrySlice.actions;
export default countrySlice.reducer;
