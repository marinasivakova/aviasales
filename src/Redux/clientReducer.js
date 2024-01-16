import { createSlice } from "@reduxjs/toolkit";

const initialState = { tickets: [] };

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    updateClient: (state, action) => {
      let tickets = state.tickets
      state.tickets = [...tickets, ...action.payload];
    },
  },
});

export const { updateClient } = clientSlice.actions;

export default clientSlice.reducer;
