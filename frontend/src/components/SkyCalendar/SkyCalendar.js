import React, { useState } from "react";
import PropTypes from "prop-types";
import { addMonths, subMonths } from "../../utils/dateUtil";
import "./SkyCalendar.css";

import SkyCalendarHeader from "./SkyCalendarHeader";
import SkyCalendarDayLabel from "./SkyCalendarDayLabel";
import SkyCalendarDays from "./SkyCalendarDays";

const SkyCalendar = ({ data }) => {
  // useState hooks for currentMonth and selectedDate
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Set selected date
  function onDateClick(day) {
    setSelectedDate(day);
  }

  // Handle click for next month
  function nextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  // Handle click for previous month
  function prevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  return (
    <div className="calendar">
      <SkyCalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <SkyCalendarDayLabel currentMonth={currentMonth} />
      <SkyCalendarDays
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        data={data}
        onDateClick={onDateClick}
      />
    </div>
  );
};

SkyCalendar.propTypes = {
  data: PropTypes.object.isRequired
};

export default SkyCalendar;
