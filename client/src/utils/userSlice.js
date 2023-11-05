import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: undefined,
    walletMoney: 0,
    userRequests: undefined,
    lendersList: undefined,
    particularUserRequest: undefined,
    particualarLenderList: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload.message != "user not found")
        state.userData = action.payload;
    },
    setWalletMoney: (state, action) => {
      state.walletMoney = action.payload;
    },
    setUserRequests: (state, action) => {
      state.userRequests = action.payload;
    },
    setLendersList: (state, action) => {
      state.lendersList = action.payload;
    },
    getParticularUserRequest: (state, action) => {
      const id = action.payload;
      const particularUserRequest = state.userRequests.filter((user) => {
        return user?.metamaskId == id;
      });
      console.log(state.userRequests);
      console.log(particularUserRequest);
      state.particularUserRequest = particularUserRequest?.data;
    },
    getParticularLendersList: (state, action) => {
      const id = action.payload;
      const particularLenderList = state.lendersList.filter((user) => {
        return user?.metamaskId == id;
      });
      console.log(particularLenderList?.data);
      state.particularLenderList = particularLenderList?.data;
    },
  },
});

export const {
  setUser,
  setWalletMoney,
  setUserRequests,
  setLendersList,
  getParticularLendersList,
  getParticularUserRequest,
} = userSlice.actions;
export default userSlice.reducer;
