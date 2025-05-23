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

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_STRAPI_API_URL}/api/auth/local/register`,
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

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors when starting new request
      })
      .addCase(registerUser.fulfilled, (state, action) => {
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
          title: "Registered Successfully",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast({
          title: "Registration Failed",
          description: action.payload.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
  },
});

export default registerSlice.reducer;
export const { resetRegisterState } = registerSlice.actions;
export const selectRegisterState = ({ register }) => register;
