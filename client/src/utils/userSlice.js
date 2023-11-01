import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: undefined,
    walletMoney: 0,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload.message != "user not found")
        state.userData = action.payload;
    },
    setWalletMoney: (state, action) => {
      state.walletMoney = action.payload;
    },
  },
});

export const { setUser, setWalletMoney } = userSlice.actions;
export default userSlice.reducer;
