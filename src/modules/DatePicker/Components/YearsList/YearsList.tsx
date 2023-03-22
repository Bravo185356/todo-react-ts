import { useEffect, useState } from "react";
import { getYearsList } from "../../helpers/getYearsList";
import classes from './YearsList.module.scss'

interface YearsListProps {
  currentYear: number;
  setCurrentYear: Function;
  setSelectMode: Function;
}

export default function YearsList({ currentYear, setCurrentYear, setSelectMode }: YearsListProps) {
  const [years, setYears] = useState<number[]>([]);
  useEffect(() => {
    setYears(getYearsList());
  }, [currentYear]);

  function changeYear(year: number) {
    setCurrentYear(year);
    setSelectMode("month");
  }

  return (
    <div className={classes.yearsListBlock}>
      {years.map((year, index) => {
        return (
          <div onClick={() => changeYear(year)} key={index}>
            {year}
          </div>
        );
      })}
    </div>
  );
}
