import { createSlice } from "@reduxjs/toolkit";

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState: {
    post: null,
  },
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export default singlePostSlice.reducer;
export const { setPost } = singlePostSlice.actions;
