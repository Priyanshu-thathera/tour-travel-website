import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tourdetail.css";
import { Container, Row, Col, ListGroup, Form } from "reactstrap";
import { useParams } from "react-router-dom";

// import tourData from "../assets/data/tours";
import calculateAvgRating from "../utilis/avgRating";
import avt from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";

import { BASE_URL } from "../utilis/config";
import { AuthContext } from "./../context/AuthContext";

const TourDetails = () => {
  /* When a user navigates to a URL like /tour/id as mentioned in router, the useParams() hook
   will provide component with an object containing the id parameter extracted from the URL.*/
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, settourRating] = useState(0);
  const { user } = useContext(AuthContext);
  
  //static data
  // const tour = tourData.find((tour) => tour.id ==== id);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value; // review entered by user

    //  api call
    try {
      if (!user || user === undefined || user === null) {
        alert("Please Signin");
      } else {
        const reviewObj = {
          username: user?.username,
          reviewText,
          rating: tourRating,
        };
        const res = await fetch(`${BASE_URL}/review/${id}`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewObj),
        });
        const result = await res.json();
        if (!res.ok) return alert(result.message);
        alert(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">Loading........</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}

        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour_content">
                <img src={photo} alt="" />
                <div className="tour_info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="d-flex align-items-center gap-1">
                      <i
                        class="ri-star-s-fill"
                        style={{ color: "var(--secondary-color)" }}
                      />
                      {calculateAvgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <>
                          <span>({reviews?.length})</span>
                        </>
                      )}
                    </span>

                    <span>
                      <i class="ri-map-pin-user-fill" />
                      {address}
                    </span>
                  </div>
                  {/* extra detail of tour */}
                  <div className="tour_extra-detail">
                    <span>
                      <i class="ri-map-pin-2-line" />
                      {city}
                    </span>
                    <span>
                      <i class="ri-money-dollar-circle-line" />${price}
                    </span>
                    <span>
                      <i class="ri-map-pin-time-line" />
                      {distance} k/m
                    </span>
                    <span>
                      <i class="ri-group-line" />
                      {maxGroupSize}
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* tour review section */}
                <div className="tour_review mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                </div>

                <Form onSubmit={submitHandler}>
                  <h6 className="d-flex align-items-center">
                    Give Rating to this Tour
                  </h6>
                  <div className="d-flex align-items-center gap-2 mb-4 rating_group">
                    <span onClick={() => settourRating(1)}>
                      1{" "}
                      {tourRating === 1 ||
                      tourRating === 2 ||
                      tourRating === 3 ||
                      tourRating === 4 ||
                      tourRating === 5 ? (
                        <i class="ri-star-s-fill"></i>
                      ) : (
                        <i class="ri-star-s-line"></i>
                      )}
                    </span>
                    <span onClick={() => settourRating(2)}>
                      2{" "}
                      {tourRating === 2 ||
                      tourRating === 3 ||
                      tourRating === 4 ||
                      tourRating === 5 ? (
                        <i class="ri-star-s-fill"></i>
                      ) : (
                        <i class="ri-star-s-line"></i>
                      )}
                    </span>
                    <span onClick={() => settourRating(3)}>
                      3{" "}
                      {tourRating === 3 || tourRating === 4 || tourRating === 5 ? (
                        <i class="ri-star-s-fill"></i>
                      ) : (
                        <i class="ri-star-s-line"></i>
                      )}
                    </span>
                    <span onClick={() => settourRating(4)}>
                      4{" "}
                      {tourRating === 4 || tourRating === 5 ? (
                        <i class="ri-star-s-fill"></i>
                      ) : (
                        <i class="ri-star-s-line"></i>
                      )}
                    </span>
                    <span onClick={() => settourRating(5)}>
                      5{" "}
                      {tourRating === 5 ? (
                        <i class="ri-star-s-fill"></i>
                      ) : (
                        <i class="ri-star-s-line"></i>
                      )}
                    </span>
                  </div>

                  <div className="review_input">
                    <input
                      ref={reviewMsgRef}
                      type="text"
                      placeholder="share your thoughts"
                      required
                    />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
                {/* tour review section end*/}

                <ListGroup className="user_review">
                  {reviews?.map((review) => (
                    <div className="review_item">
                      <img src={avt} alt="" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.username}</h5>
                            <p>
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i class="ri-star-s-fill" />
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
