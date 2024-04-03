import { createSlice } from "@reduxjs/toolkit";
//redux slice
const initialState = {
  uid: null,
  firstName: null,
  email: null,
  role: null,
  friends: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.uid = action.payload.uid;
      state.firstName = action.payload.firstName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.friends = action.payload.friends;
    },
    setLogout: (state) => {
      state.uid = null;
      state.firstName = null;
      state.email = null;
      state.role = null;
      state.friends = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
