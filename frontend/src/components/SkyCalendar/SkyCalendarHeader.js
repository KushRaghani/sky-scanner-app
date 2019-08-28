import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/dateUtil";

const SkyCalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  const dateFormat = "Month Year";
  // Rendering the header for the calendar
  return (
    <div className="header calendar-row flex-middle">
      <div className="block block-start">
        <div className="icon" onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="block block-center">
        <span>{formatDate(currentMonth, dateFormat)}</span>
      </div>
      <div className="block block-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};

SkyCalendarHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired
};

export default SkyCalendarHeader;
