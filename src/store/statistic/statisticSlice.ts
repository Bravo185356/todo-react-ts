import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setStatsPayload } from "./statisticSliceTypes";

export interface StatisticState {
  currentLevelCount: number;
  level: number;
}

const initialState: StatisticState = {
  currentLevelCount: 0,
  level: 1,
};

const statistic = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    resetLevelCount(state) {
      state.currentLevelCount = 0;
      localStorage.setItem(
        "Statistic",
        JSON.stringify({ level: state.level, levelCount: state.currentLevelCount })
      );
    },
    increaseLevelCount(state) {
      state.currentLevelCount += 1;
      localStorage.setItem(
        "Statistic",
        JSON.stringify({ level: state.level, levelCount: state.currentLevelCount })
      );
    },
    increaseLevel(state) {
      state.level += 1;
      localStorage.setItem(
        "Statistic",
        JSON.stringify({ level: state.level, levelCount: state.currentLevelCount })
      );
    },
    setStats(state, actions: PayloadAction<setStatsPayload>) {
        state.level = actions.payload.level
        state.currentLevelCount = actions.payload.levelCount
    }
  },
});

export const { resetLevelCount, increaseLevelCount, increaseLevel, setStats } = statistic.actions;
export default statistic.reducer;