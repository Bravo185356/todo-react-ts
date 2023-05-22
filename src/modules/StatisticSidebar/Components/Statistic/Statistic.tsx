import { useEffect, useMemo } from "react";
import classes from "./Statistic.module.scss";
import { useAppSelector, useAppDispatch } from "../../../../hooks/hooks";
import { resetLevelCount, increaseLevel, setStats } from "../../../../store/statistic/statisticSlice";
import { LinearProgress } from "@mui/material";

export default function Statistic() {
  const currentLevelCount: number = useAppSelector((state) => state.statistic.currentLevelCount);
  const level = useAppSelector((state) => state.statistic.level);
  const todos = useAppSelector((state) => state.todo.value);

  const dispatch = useAppDispatch();
  const normalise = (currentLevelCount: any) => ((currentLevelCount - 0) * 100) / (level * 5 - 0);

  const totalUncompletedTodo = useMemo(() => {
    let totalNumber = 0;
    for (const list of todos) {
      totalNumber += list.todos.filter((todo: any) => todo.completed === false).length;
    }
    return totalNumber;
  }, [todos]);

  useEffect(() => {
    if (currentLevelCount === level * 5) {
      dispatch(increaseLevel());
      dispatch(resetLevelCount());
    }
  }, [currentLevelCount, level, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("Statistic")) {
      dispatch(setStats(JSON.parse(localStorage.getItem("Statistic")!)));
    }
  }, [dispatch]);
  
  return (
    <div className={classes.body}>
      <div>Незавершенных задач: {totalUncompletedTodo}</div>
      <div className={classes.lvlBlock}>
        <div>Уровень {level}</div>
        <div>
          {currentLevelCount} / {level * 5}
        </div>
        <LinearProgress sx={{ height: 10, borderRadius: 1 }} variant="determinate" value={normalise(currentLevelCount)} />
      </div>
    </div>
  );
}
