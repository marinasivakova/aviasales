import { createSlice } from "@reduxjs/toolkit";

const initialState = {'transfer-all': true, filters: {'transfer-one': true, 'transfer-two': true, 'transfer-three': true, 'transfer-none': true}};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
      updateFilter: (state, action) => {
        state['transfer-all'] = action.payload['transfer-all'];
        state.filters['transfer-one'] = action.payload.filters['transfer-one'];
        state.filters['transfer-two'] = action.payload.filters['transfer-two'];
        state.filters['transfer-three'] = action.payload.filters['transfer-three'];
        state.filters['transfer-none'] = action.payload.filters['transfer-none'];
      },
    },
  });
  
  export const { updateFilter } = filterSlice.actions;
  
  export default filterSlice.reducer;