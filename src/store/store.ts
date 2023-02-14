import { configureStore } from "@reduxjs/toolkit";
import statistic from "./statistic/statisticSlice";
import todo from "./todo/todoSlice";
import userInfo from './userInfo/userInfoSlice'

export const store = configureStore({
  reducer: {
    statistic,
    todo,
    userInfo
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
