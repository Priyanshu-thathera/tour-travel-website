import React from "react";
import "./tourcard.css";
import { Card, CardBody } from "reactstrap";
import { BASE_URL } from "../utilis/config";
import { useNavigate } from "react-router-dom";

const UserBookingCard = ({ tour }) => {
  const Navigate = useNavigate();

  const { fullName, tourName, guestSize, bookAt, createdAt, _id } = tour;

  const handleCancel = () => {
    // Send a DELETE request to your server to cancel the booking
    fetch(`${BASE_URL}/booking/${_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert("Booking cancelled successfully");
          Navigate('/')
        } else {
          alert("Failed to cancel booking");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  //   to format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <div className="tour_card">
      <Card>
        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_location d-flex align-items-center gap-1">
              Location : {tourName}
            </span>
          </div>
          <p className="tour_title">
            Tour Date : {new Date(bookAt).toLocaleDateString("en-US", options)}
          </p>
          <p className="tour_title">
            Booked At :{" "}
            {new Date(createdAt).toLocaleDateString("en-US", options)}
          </p>
          <p className="tour_title">Booked By : {fullName}</p>

          <div className="card_bottom d-flex align-content-center justify-content-between mt-3">
            <h5>
              Guest Size:
              <span> {guestSize}</span>
            </h5>
            <button className="btn booking_btn" onClick={handleCancel}>
              Cancel Booking
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserBookingCard;
