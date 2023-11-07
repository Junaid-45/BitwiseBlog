import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import postSlice from "../slices/postSlice";
import singlepostslice from "../slices/singlepostslice";

const store = configureStore({
  reducer: {
    userState: userSlice,
    postState: postSlice,
    singlePostState: singlepostslice,
  },
});

export default store;
