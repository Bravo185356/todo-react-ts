import { useEffect, useState } from "react";
import { getDaysList } from "../../helpers/getDaysList";
import classes from "./DaysList.module.scss";

interface DaysListProps {
  currentYear: number;
  currentMonth: number;
  setCurrentDay: Function;
  setCurrentMonth: Function;
  setSelectMode: Function;
}
interface DayItem {
  month: string;
  day: number;
}

export default function DaysList({
  setSelectMode,
  currentYear,
  currentMonth,
  setCurrentDay,
  setCurrentMonth,
}: DaysListProps) {
  const [days, setDays] = useState<DayItem[]>([]);

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вск"];
  const currentDayClasses = [classes.dayNumberCurrent, classes.dayNumber].join(" ");

  useEffect(() => {
    setDays(getDaysList(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  function selectDay(day: DayItem) {
    if (day.month === "curr") {
      setCurrentDay(day);
    } else if (day.month === "prev") {
      setCurrentDay(day);
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentDay(day);
      setCurrentMonth(currentMonth + 1);
    }
    setSelectMode("hour");
  }
  return (
    <div>
      <div className={classes.weekDays}>
        {weekDays.map((weekDay) => {
          return <div className={classes.weekDay}>{weekDay}</div>;
        })}
      </div>
      <div className={classes.days}>
        {days.map((day, index) => {
          return (
            <div
              onClick={() => selectDay(day)}
              className={
                new Date().getDate() === day.day && new Date().getMonth() === currentMonth ? currentDayClasses : classes.dayNumber
              }
              key={index}
            >
              {day.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
