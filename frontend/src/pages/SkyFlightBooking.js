import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SkyApi from "../api/skyApi";
import SkyFlightSearch from "../components/SkyFlightBooking/SkyFlightSearch";
import SkyFlightResults from "../components/SkyFlightBooking/SkyFlightResults";
import { formatDate } from "../utils/dateUtil";
import { triggerErrorService } from "../api/apiHelper";
import SkyLoader from "../components/SkyLoader/SkyLoader";
import Airport from "../models/Airport";

const SkyFlightBooking = React.memo(() => {
  const [data, setData] = useState(null);
  const [sourceAirportData, setSourceAirportData] = useState(null);
  const [destinationAirportData, setDestinationAirportData] = useState(null);
  const [originalAirportData, setOriginalAirportData] = useState({
    source: null,
    destination: null
  });
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchFormClasses, setSearchFormClasses] = useState("searchFlights");
  const [airports, setAirports] = useState({});
  const [flightSearchErrors, setFlightSearchErrors] = useState({});
  const departureDate = formatDate(new Date(), "YYYY-MM-DD");

  useEffect(() => {
    getAirportData();
  }, []);

  function checkValidSearch() {
    const errors = {};
    if (!source) errors.source = "Please Select Source Airport";
    if (!destination) errors.destination = "Please Select Destination Airport";
    setFlightSearchErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function getData(e) {
    e.preventDefault();
    if (!checkValidSearch()) return;
    try {
      setSearchFormClasses("searchFlights searchClicked");
      setLoading(true);
      const resp = await SkyApi.getFlightPrices({
        source,
        destination,
        departureDate
      });
      if (resp && resp.errors) {
        toast.error(resp.errors.join(","));
        return;
      }
      setData(resp);
    } catch (error) {
      toast.error(error.response.data.error);
      triggerErrorService(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAirportData() {
    try {
      setLoading(true);
      const resp = await SkyApi.getPlaces();
      const source = [],
        destination = [],
        airport = {};
      resp.info.forEach(element => {
        airport[element.airportCode] = new Airport(element);
        if (element.isSource) {
          source.push(element);
        }
        if (element.isDestination) {
          destination.push(element);
        }
      });

      setAirports(airport);
      setOriginalAirportData({ source, destination });
      setSourceAirportData(source);
      setDestinationAirportData(destination);
    } catch (error) {
      if (error && error.message === "Network Error") {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.error);
      }
      triggerErrorService(error);
    } finally {
      setLoading(false);
    }
  }

  function onSelectChangeSource(e) {
    const selectedAirport = e.target.value;

    setSource(selectedAirport);
    const newDestinationData = originalAirportData.destination.filter(item => {
      const airport = airports[selectedAirport];
      if (item.airportCode != selectedAirport) {
        if (!airport.hasFlight(item.airportCode)) {
          if (destination && (airport.airportName != item.airportName)) {
            toast.error(
              `No Flights between ${airport.airportName} and ${item.airportName}`
            );
          }
          
          return false;
        } else {
          return true;
        }
      }
    });
    setDestinationAirportData(newDestinationData);
  }

  function onSelectChangeDest(e) {
    setDestination(e.target.value);
  }

  function onClear() {
    setSource("");
    setDestination("");
    setSourceAirportData(originalAirportData.source);
    setDestinationAirportData(originalAirportData.destination);
    setData(null);
    setSearchFormClasses("searchFlights");
  }
  // Sky Booking component with Flight Search Component and Flight Results
  return (
    <div className="App">
      {destinationAirportData && sourceAirportData && (
        <SkyFlightSearch
          onSelectChangeSource={onSelectChangeSource}
          onSelectChangeDest={onSelectChangeDest}
          source={source}
          destination={destination}
          getData={getData}
          sourceAirportData={sourceAirportData}
          destinationAirportData={destinationAirportData}
          onClear={onClear}
          searchFormClasses={searchFormClasses}
          errors={flightSearchErrors}
        />
      )}
      {loading && <SkyLoader />}
      {!loading && data && <SkyFlightResults data={data} />}
    </div>
  );
});

export default SkyFlightBooking;
