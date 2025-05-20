import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setNetworkStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setNetworkStatus } = networkSlice.actions;
export const selectedNetwork = ({ network }) => network;
export default networkSlice.reducer;
