import React from "react";
import SkyFlightBooking from "./pages/SkyFlightBooking";
import SkyHeader from "./components/SkyLayout/SkyHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <SkyHeader />
      <SkyFlightBooking />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
