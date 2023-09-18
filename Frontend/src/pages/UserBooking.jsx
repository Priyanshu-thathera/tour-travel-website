import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utilis/config";
import { AuthContext } from "../context/AuthContext";
import UserBookingCard from "../shared/UserBookingCard";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../shared/CommonSection";

const UserBooking = () => {
  const { user } = useContext(AuthContext);
  const id = user?._id;
  const [userBookings, setuserBookings] = useState([]);

  
  useEffect(() => {
    const Data = async () => {
      try {
        if (id) {
          const res = await fetch(`${BASE_URL}/booking/${id}`, {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
          });
          const result = await res.json();
          setuserBookings(result.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    Data();
  }, []);

  return (
    <>
      <CommonSection title={"Your Booked Tours"} />

      <section className="pt-0 mt-4">
        <Container>
          <Row>
            {userBookings[0] ? (userBookings.map((tour) => (
              <Col lg="3" md="6" sm="6" key={tour._id} className="mb-4">
                <UserBookingCard tour={tour} />
              </Col>
            ))):(
                <h1 className="text-center justify-content-center ">No Tour Booked</h1>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserBooking;
