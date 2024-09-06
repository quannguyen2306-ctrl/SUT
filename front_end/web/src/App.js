import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashBoard from "./screens/DashBoard/DashBoard";
import Court from "./screens/Court/Court";
import Booking from "./screens/Booking/Booking";
import Auth from "./screens/Auth/Auth";
import AvailabilityCalendar from "./screens/AvailabilityCalendar/AvailabilityCalendar";
import SingleBooking from "./screens/Booking/SingleBooking";
import Settings from "./screens/Settings/Settings";
import Chat from "./screens/Chat/Chat"


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="court" element={<Court />} />
        <Route path="calendar" element={<AvailabilityCalendar />} />
        <Route path="booking" element={<Booking />} />
        <Route path="single_booking" element={<SingleBooking />} />
        <Route path="auth" element={<Auth/>}></Route>
        <Route path="chat" element={<Chat/>}></Route>
        <Route path="settings" element={<Settings/>}></Route>
      </Routes>
    </Router>
  );
}

