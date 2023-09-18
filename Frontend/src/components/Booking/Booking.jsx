import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utilis/config";
import { AuthContext } from "../../context/AuthContext";

const Booking = ({ tour, avgRating }) => {
  const navigate = useNavigate();
  const { price, reviews, title } = tour;

  const { user } = useContext(AuthContext);

  const [booking, setbooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
  });
  const handlechange = (e) => {
    setbooking((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  // send data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || user === undefined || user === null) {
        alert("Please Signin");
      } else {
        const res = await fetch(`${BASE_URL}/booking`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(booking),
        });
        const result = await res.json();
        if (!res.ok) return alert(result.message);
        navigate("/thank-you");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // //////////// To stop input by taking date before today /////////
  const minDate = () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  };

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>${price} per person</h3>
        <span className="d-flex align-items-center gap-1">
          <i class="ri-star-s-fill" />
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* booking form start*/}

      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              onChange={handlechange}
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              pattern="[0-9]{10}"
              placeholder="10 Digit Mobile number"
              id="phone"
              onChange={handlechange}
              required
            />
          </FormGroup>
          <FormGroup className="">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              min={minDate()}
              onChange={handlechange}
              required
            />
            <input
              type="number"
              min="1"
              max='20'
              step="1"
              placeholder="Number of Person"
              id="guestSize"
              onChange={handlechange}
              required
            />
          </FormGroup>
        </Form>
      </div>
      {/* booking form end */}

      {/* booking bottom */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price}
              <i class="ri-close-line" />{booking?.guestSize ? booking.guestSize:0} person
            </h5>
            <span>${price*booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
