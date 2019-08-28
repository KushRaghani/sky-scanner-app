import React from "react";
import PropTypes from "prop-types";
import SkySelectAirport from "./SkySelectAirport";
import "./SkyFlightSearch.css";

const SkyFlightSearch = ({
  source,
  destination,
  onSelectChangeSource,
  onSelectChangeDest,
  getData,
  sourceAirportData,
  destinationAirportData,
  onClear,
  searchFormClasses,
  errors = {}
}) => {
  //Flight Searh component
  return (
    <React.Fragment>
      <div className={searchFormClasses}>
        <div className="flightsOption">Search Flights</div>
        <div className="searchSection">
          <div className="input-group col-lg-3 selectFlights">
            <div className="input-group-prepend">
              <label className="input-group-text">From</label>
            </div>
            <SkySelectAirport
              selectedAirport={source}
              className="custom-select"
              name="source"
              onChangeOfAirport={onSelectChangeSource}
              optionsData={sourceAirportData}
            />
            {errors && errors.source && <div>{errors.source}</div>}
          </div>
          <div className="input-group col-lg-3 selectFlights">
            <div className="input-group-prepend">
              <label className="input-group-text">To</label>
            </div>
            <SkySelectAirport
              selectedAirport={destination}
              className="custom-select"
              name="destination"
              onChangeOfAirport={onSelectChangeDest}
              optionsData={destinationAirportData}
            />
            {errors && errors.destination && <div>{errors.destination}</div>}
          </div>
          <button
            type="button"
            className="btn btn-success goBtn"
            onClick={getData}
          >
            Search
          </button>
          <button type="button" className="btn btn-danger" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

SkyFlightSearch.propTypes = {
  source: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  onSelectChangeSource: PropTypes.func.isRequired,
  onSelectChangeDest: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  sourceAirportData: PropTypes.arrayOf(
    PropTypes.shape({
      airportCode: PropTypes.string,
      airportName: PropTypes.string
    })
  ),
  destinationAirportData: PropTypes.arrayOf(
    PropTypes.shape({
      airportCode: PropTypes.string,
      airportName: PropTypes.string
    })
  ),
  onClear: PropTypes.func.isRequired,
  searchFormClasses: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

export default SkyFlightSearch;
