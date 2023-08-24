import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyList: {},
  },
  reducers: {
    setPropertyList: (state, action) => {
      state.propertyList = action.payload;
    },
    changeSaleOfProperty: (state, action) => {
      const index = state.propertyList.findIndex(
        (property) => property.id === action.payload
      );
      if (index !== -1) {
        state.propertyList[index].isSale = !state.propertyList[index].isSale;
      }
    },
  },
});

export const { setPropertyList, changeSaleOfProperty } = propertySlice.actions;
export default propertySlice.reducer;
