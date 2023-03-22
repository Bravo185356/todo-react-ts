import { configureStore } from "@reduxjs/toolkit";
import statistic from "./statistic/statisticSlice";
import todo from "./todo/todoSlice";
import userInfo from './userInfo/userInfoSlice'
import screenWidth from "./screenWidth/screenWidthSlice";

export const store = configureStore({
  reducer: {
    statistic,
    todo,
    userInfo,
    screenWidth
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
