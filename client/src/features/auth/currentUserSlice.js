import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    data: "",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    clearCurrentUser: (state, action) => {
      state.data = "";
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
