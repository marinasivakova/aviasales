import { createSlice } from "@reduxjs/toolkit";

const initialState = { button: true};

export const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    updateButton: (state, action) => {
      state.button = action.payload.button;
    },
  },
});

export const { updateButton } = buttonSlice.actions;
export default buttonSlice.reducer;