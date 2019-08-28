export default function Airport(params) {
  this.airportCode = params.airportCode;
  this.airportName = params.airportName;
  this.isSource = params.isSource;
  this.isDestination = params.isDestination;
  this.destinations = params.destinations;
  this.hasFlight = function(destination) {
    if (this.isSource && this.destinations.includes(destination)) {
      return true;
    } else {
      return false;
    }
  };
}
