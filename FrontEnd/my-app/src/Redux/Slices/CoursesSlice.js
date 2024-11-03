import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async () => {
    try {
      const response = await axios.get("http://localhost:5555/course");
      toast.success("Successfully fetched the data!");
      return response.data.Courses;

    } catch (error) {
      toast.error("Fail to fetch the Course");
    }
  }
);

const CoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      // console.log(action?.payload)
      state.courseData = action.payload; // Set the fetched data
    });
  },
});

export default CoursesSlice.reducer;
