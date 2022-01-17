import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types";

interface State {
  data: User | null;
}

const initialState: State = {
  data: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    clearCurrentUser: (state) => {
      state.data = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
