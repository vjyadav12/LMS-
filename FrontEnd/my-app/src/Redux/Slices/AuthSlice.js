import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role")||'',
  data: localStorage.getItem("data")||{},
};

// Create new use Account function
export const createNewAccount = createAsyncThunk(
  "/auth/signup",
  async ({ fullName, email, password }) => {
    try {
      const Result = axios.post("http://localhost:5555/user/signup", {
        fullName,
        email,
        password,
      });

      toast.promise(Result, {
        loading: "Wait creating your Account",
        success: (Result) => {
          return Result?.data?.message;
        },
        error: "fail to create Account ",
      });

      return (await Result).data;
    } catch (error) {
      //   console.log(e);
      toast.error(error?.response?.data?.message);
    }
  }
);

// login API Call
export const UserLogin = createAsyncThunk(
  "/auth/signup",
  async ({ email, password }) => {
    try {
      const Result = axios.post("http://localhost:5555/user/login", {
        email,
        password,
      });

      toast.promise(Result, {
        loading: "Wait a moment",
        success: (Result) => {
          return Result?.data?.message;
        },
        error: "fail to login ",
      });

      return (await Result).data;
    } catch (error) {
      //   console.log(e);
      toast.error(error?.response?.data?.message);
    }
  }
);


//  User LoggedOut api call.
export const userLoggedOut = createAsyncThunk(
  "/auth/logout",
  async () => {
    try {
      const Result = axios.post("http://localhost:5555/user/logout");

      toast.promise(Result, {
        loading: "Wait a moment",
        success: (Result) => {
          return Result?.data?.message;
        },
        error: "fail to logout ",
      });

      return (await Result).data;
    } catch (error) {
      //   console.log(e);
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createNewAccount.fulfilled, (state, action) => {
      console.log("Payload Creations",action?.payload)
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role",action?.payload?.user?.role)
      localStorage.setItem("data",action?.payload?.user)

      state.isLoggedIn = true;
      state.role = action?.payload?.user?.role
      state.data = action?.payload?.user
    })

    .addCase(userLoggedOut.fulfilled,(state,action)=>{
      localStorage.clear();
      state.isLoggedIn = false;
    })
  },

});

export const {} = authSlice.actions;
export default authSlice.reducer;
