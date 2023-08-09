import { createSlice } from "@reduxjs/toolkit";

// Define a new slice for the auth state
const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
