import { useEffect, useState } from "react";
import { getMonthList } from "../../helpers/getMonthList";
import classes from "./MonthList.module.scss";

interface MonthListProps {
  currentYear: number;
  setSelectMode: Function;
  setCurrentMonth: Function;
}

export default function MonthList({ currentYear, setSelectMode, setCurrentMonth }: MonthListProps) {
  const [months, setMonths] = useState<string[]>([]);
  useEffect(() => {
    setMonths(getMonthList(currentYear));
  }, [currentYear]);

  function changeMonth(monthIndex: number) {
    setCurrentMonth(monthIndex);
    setSelectMode("day");
  }

  return (
    <div className={classes.monthListBlock}>
      {months.map((month, index) => {
        return (
          <div className={classes.month} onClick={() => changeMonth(index)} key={index}>
            {month}
          </div>
        );
      })}
    </div>
  );
}
