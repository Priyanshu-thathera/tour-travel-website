import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import UserProfile from "../pages/UserProfile";

import { Navigate } from "react-router-dom";
import Thankyou from "../pages/Thankyou";
import UserBooking from "../pages/UserBooking";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<Thankyou />} />
      <Route path="/userBooking" element={<UserBooking />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/tours/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Routers;
