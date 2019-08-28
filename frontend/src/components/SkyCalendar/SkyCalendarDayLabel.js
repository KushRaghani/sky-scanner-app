import React from "react";
import { getDaysOfWeek } from "../../utils/dateUtil";

const SkyCalendarDayLabel = () => {
  const daysOfWeek = getDaysOfWeek();
  // Iterate over days of the week and create labels (Sunday to Saturday)
  return (
    <div className="calendar-days calendar-row">
      {daysOfWeek.map((item, i) => {
        return (
          <div className="block block-center" key={i}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default SkyCalendarDayLabel;
