import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    GET_TASKS_LOADING: (state, action) => {
      state.isLoading = true;
      state.data = [];
      state.error = null;
    },
    GET_TASKS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    GET_TASKS_ERROR: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { GET_TASKS_LOADING, GET_TASKS_SUCCESS, GET_TASKS_ERROR } =
  tasksSlice.actions;

export default tasksSlice.reducer;
