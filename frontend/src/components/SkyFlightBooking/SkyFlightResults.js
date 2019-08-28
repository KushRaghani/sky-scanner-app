import React from "react";
import PropTypes from "prop-types";
import SkyCalendar from "../SkyCalendar";

export const formatPricesData = data => {
  const a = {};
  for (var i in data) {
    var j = new Date(i).toUTCString();
    a[j] = data[i];
  }
  return a;
};
//Wrapper component for SkyCalendar
const SkyFlightResults = ({ data }) => {
  return (
    <React.Fragment>
      <SkyCalendar data={formatPricesData(data)} />
    </React.Fragment>
  );
};

SkyFlightResults.propTypes = {
  data: PropTypes.object.isRequired
};

export default SkyFlightResults;
