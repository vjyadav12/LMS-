import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

const getAllCourses = createAsyncThunk("/course", async () => {
  try {
    const Result = await axios.get("http://localhost:5555/course");

    toast.promise(Result,{
        loading:"Wait fetching your data ",
        success:"SuccessFully Fetch the data ",
        error:"Fail to fetch the Course "
    })

    return await Result?.data?.Courses 
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const CoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {});
    if(action?.payload){
        state.courseData = action?.payload
    }
  },
});

export const {} = CoursesSlice.actions;

export default CoursesSlice.reducer;
