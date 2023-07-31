import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLogedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    bio: "",
    bbio: "",
    photo: "",
  },
  userID: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set IsLogedIn to boolean from action.payload
    SET_LOGIN(state, action) {
      state.isLogedIn = action.payload;
    },
    // stay logged in if refresh page
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    // save user credentials to redux
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLogedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
