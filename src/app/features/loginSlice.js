import { createStandaloneToast } from "@chakra-ui/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookieService from "../../services/cookies";

const { toast } = createStandaloneToast();

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_STRAPI_API_URL}/api/auth/local`,
        user
      );
      return data;
    } catch (error) {
      const serializedError = {
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.response?.status,
        responseData: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors when starting new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        const date = new Date();
        const IN_DAYS=7;
        const EXPIRES_IN_DAYS=IN_DAYS*24*60*60*1000;
        date.setTime(date.getTime() + EXPIRES_IN_DAYS);
        const options = {path: "/", expires: date };
        cookieService.set("jwt", action.payload.jwt, options);
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast({
          title: action.payload?.responseData?.error?.message || "Login Failed",
          description:
            action.payload?.responseData?.error?.message ||
            "Invalid credentials",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  },
});

export default loginSlice.reducer;
export const { resetLoginState } = loginSlice.actions;
export const selectLoginState = ({ login }) => login;
