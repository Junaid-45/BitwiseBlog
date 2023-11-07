import { createSlice } from "@reduxjs/toolkit";

// export const getPosts =

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { getPosts } = postSlice.actions;
