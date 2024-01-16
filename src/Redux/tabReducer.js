import { createSlice } from "@reduxjs/toolkit";

const initialState = { cheap: true, fast: false, optimal: false};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    updateTab: (state, action) => {
      state.cheap = action.payload.cheap;
      state.fast = action.payload.fast;
      state.optimal = action.payload.optimal;
    },
  },
});

export const { updateTab } = tabSlice.actions;
export default tabSlice.reducer;