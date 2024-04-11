import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    email: "",
  },
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    signOut: (_state, _action) => {
      console.log("here");
      return {
        token: "",
        email: "",
      };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
