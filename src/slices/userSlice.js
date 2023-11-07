import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.status = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.status = false;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
