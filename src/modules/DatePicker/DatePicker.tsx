import { useEffect, useState } from "react";
import classes from "./DatePicker.module.scss";
import { createMonthName } from "./helpers/createMonthName";
import DaysList from "./Components/DaysList/DaysList";
import MonthList from "./Components/MonthList/MonthList";
import YearsList from "./Components/YearsList/YearsList";
import HoursList from "./Components/HoursList/HoursList";

interface DatePickerProps {
  setDeadlineInput: Function;
  setDatePickerVisible: Function;
}

export default function DatePicker({ setDeadlineInput, setDatePickerVisible }: DatePickerProps) {
  const [currentDay, setCurrentDay] = useState({ month: "curr", day: new Date().getDate() });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [selectMode, setSelectMode] = useState("day");

  useEffect(() => {
    setCurrentMonthName(createMonthName(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  return (
    <div className={classes.datePickerWrapper}>
      <div className={classes.datePickerBlock}>
        <div className={classes.header}>
          <div className={classes.currentDate}>
            <div className={classes.selectedDate} onClick={() => setSelectMode("month")}>
              {currentMonthName}
            </div>
            <div className={classes.selectedDate} onClick={() => setSelectMode("year")}>
              {currentYear}
            </div>
          </div>
          {selectMode === "day" && (
            <div className={classes.monthControlButtons}>
              <button
                className={classes.controlButton}
                onClick={() => setCurrentMonth(new Date(currentYear, currentMonth - 1).getMonth())}
              >
                {"<"}
              </button>
              <button
                className={classes.controlButton}
                onClick={() => setCurrentMonth(new Date(currentYear, currentMonth + 1).getMonth())}
              >
                {">"}
              </button>
            </div>
          )}
        </div>
        <div className={classes.listsBlock}>
          {selectMode === "day" && (
            <DaysList
              setSelectMode={setSelectMode}
              setCurrentDay={setCurrentDay}
              setCurrentMonth={setCurrentMonth}
              currentYear={currentYear}
              currentMonth={currentMonth}
            />
          )}
          {selectMode === "month" && (
            <MonthList setCurrentMonth={setCurrentMonth} setSelectMode={setSelectMode} currentYear={currentYear} />
          )}
          {selectMode === "year" && (
            <YearsList setSelectMode={setSelectMode} setCurrentYear={setCurrentYear} currentYear={currentYear} />
          )}
          {selectMode === "hour" && (
            <HoursList
              setDeadlineInput={setDeadlineInput}
              currentDay={currentDay}
              currentMonth={currentMonth}
              currentYear={currentYear}
              setDatePickerVisible={setDatePickerVisible}
            />
          )}
        </div> {/* вынести в отдельную функцию */}
      </div>
    </div>
  );
}
