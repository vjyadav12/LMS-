import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

const getAllCourses = createAsyncThunk("/course", async () => {
  try {
    const Result = axios.get("http://localhost:5555/course");

    toast.promise(Result, {
      loading: "Wait fetching your data",
      success: "Successfully fetched the data",
      error: "Failed to fetch the course",
    });

    return Result?.data?.Courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; // Ensure the error is propagated to handle rejection
  }
});

const CoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

export const {} = CoursesSlice.actions;

export default CoursesSlice.reducer;
