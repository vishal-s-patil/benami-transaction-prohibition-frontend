import { createSlice } from "@reduxjs/toolkit";
import { baseURL } from "./constants";
import axios from "axios";

const changeStatusOfProperty = async (index, propertyList, status) => {
  const res = await axios.post(`${baseURL}/property/status_change`, {
    id: propertyList[index]?._id,
    status,
  });
  console.log(res.data);
};

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
        (property) => property._id == action.payload.id
      );
      if (index !== -1) {
        changeStatusOfProperty(
          index,
          state.propertyList,
          action.payload.status
        );
      }
    },
  },
});

export const { setPropertyList, changeSaleOfProperty } = propertySlice.actions;
export default propertySlice.reducer;
