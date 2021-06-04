import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload) => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    return data;
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [loginUser.rejected]: (state, action) => {
      state.data = action.payload;
      state.status = "failed";
    },
  },
});

export default loginUserSlice.reducer;
