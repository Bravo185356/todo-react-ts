import React, { useEffect, useState } from "react";
import { getHoursList } from "../../helpers/getHoursList";
import classes from "./HoursList.module.scss";

type CurrentDay = {
  month: string;
  day: number;
};

interface HoursListProps {
  currentDay: CurrentDay;
  currentMonth: number;
  currentYear: number;
  setDeadlineInput: Function;
  setDatePickerVisible: Function;
}

export default function HoursList({
  currentYear,
  currentMonth,
  currentDay,
  setDeadlineInput,
  setDatePickerVisible,
}: HoursListProps) {
  const [hours, setHours] = useState<string[]>([]);
  useEffect(() => {
    setHours(getHoursList());
  }, []);

  function setDate(selectedHour: string) {
    setDeadlineInput(new Date(currentYear, currentMonth, currentDay.day, +selectedHour.split(":")[0]).toLocaleString("default"));
    setDatePickerVisible(false)
  }

  return (
    <div className={classes.hourListBlock}>
      {hours.map((hour) => {
        return (
          <div onClick={() => setDate(hour)} className={classes.hour} key={hour}>
            {hour}
          </div>
        );
      })}
    </div>
  );
}
