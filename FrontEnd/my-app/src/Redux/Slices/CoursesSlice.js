import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("courses/getAllCourses", async () => {
  try {
    const response = await axios.get("http://localhost:5555/course");
    console.log(response.data.Courses);

    toast.promise(response,{
      loading:"wait Fetching Your Courses",
      success:"successfully fetched the data",
      error:"fail to fetch your course"
    })

    return response.data.Courses; // Return without extra await
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch courses");
    throw error; // Re-throw to ensure promise rejection
  }
});

const CoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(getAllCourses.fulfilled,(state, action)=>{
      if(action?.payload){
        state.courseData = action?.payload
      }
     })
  },
});

export const {} = CoursesSlice.actions;

export default CoursesSlice.reducer;
