import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenWidth: 0,
};

const screenWidth = createSlice({
  name: "screenWidth",
  initialState,
  reducers: {
    changeScreenWidth(state) {
      state.screenWidth = window.screen.width;
    },
  },
});

export const { changeScreenWidth } = screenWidth.actions;
export default screenWidth.reducer;
