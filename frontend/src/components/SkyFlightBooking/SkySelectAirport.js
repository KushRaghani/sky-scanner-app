import React from "react";
import PropTypes from "prop-types";

function SkySelectAirport({
  name,
  onChangeOfAirport,
  optionsData,
  selectedAirport
}) {
  const newOptionsData = [
    { airportName: "Select Airport", airportCode: "" },
    ...optionsData
  ];
  // Render Source and Destination Airports
  return (
    <select
      className="custom-select"
      name={name}
      onChange={onChangeOfAirport}
      value={selectedAirport}
    >
      {newOptionsData.map(data => {
        return (
          <option key={data.airportCode} value={data.airportCode}>
            {data.airportName}
          </option>
        );
      })}
    </select>
  );
}

SkySelectAirport.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeOfAirport: PropTypes.func.isRequired,
  optionsData: PropTypes.arrayOf(
    PropTypes.shape({
      airportCode: PropTypes.string,
      airportName: PropTypes.string
    })
  ).isRequired,
  selectedAirport: PropTypes.string.isRequired
};

export default SkySelectAirport;
