import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "users",
  initialState: { userList: [] },
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;
