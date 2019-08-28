import React from "react";
import PropTypes from "prop-types";
import currencyUtil from "../../utils/currencyUtil";
import {
  getMonthStart,
  getMonthEnd,
  getWeekStart,
  getWeekEnd,
  isSameMonth,
  formatDate,
  addDays,
  isSameDay
} from "../../utils/dateUtil";

const SkyCalendarDays = ({ currentMonth, selectedDate, data, onDateClick }) => {
  const monthStart = getMonthStart(currentMonth);
  const monthEnd = getMonthEnd(monthStart);
  const startDate = getWeekStart(monthStart);
  const endDate = getWeekEnd(monthEnd);

  const dateFormat = "Day";
  const weeks = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  // Keeping a check on the end date for a given selected month
  while (day <= endDate) {
    // Loop over each of the 7 days, starting on a Sunday for a paricular month
    for (let i = 0; i < 7; i++) {
      formattedDate = formatDate(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`block cell block-val${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : ""
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="calendar-date">{formattedDate}</span>
          {data && data[day.toUTCString()] ? (
            <span className="currencyVal">
              {currencyUtil(parseFloat(data[day.toUTCString()]))}
            </span>
          ) : null}
        </div>
      );
      day = addDays(day, 1);
    }
    // Each week is pushed in array of weeks which renders the calendar body
    weeks.push(
      <div className="calendar-row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="main">{weeks}</div>;
};

SkyCalendarDays.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onDateClick: PropTypes.func.isRequired
};

export default SkyCalendarDays;
