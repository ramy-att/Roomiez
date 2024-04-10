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
      return {
        token: "",
        email: "",
      };
    },
  },
});

export const { signIn } = authSlice.actions;

export default authSlice.reducer;
