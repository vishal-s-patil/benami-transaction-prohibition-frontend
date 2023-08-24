import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import propertySlice from "./propertySlice";
import userListSlice from "./userListSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    property: propertySlice,
    userList: userListSlice,
  },
});

export default store;
