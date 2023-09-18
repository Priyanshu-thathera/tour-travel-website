import React from "react";
import TourCard from "../../shared/TourCard";
// for data taken locally
// import featuredTours from "../../assets/data/tours"; 
import { Col } from "reactstrap";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utilis/config";

const FeatureTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );
  // console.log(featuredTours);
  return (
    <>
    {
      loading && <h4>Loading.....</h4>
    }
    {
      error && <h4>{error}</h4>
    }
      { !loading && !error && featuredTours?.map((tour) => (
        <Col lg="3" md='6' sm='6' className="mb-4" key={tour.id}>
          <TourCard tour = {tour} />
        </Col>
      ))}
    </>
  );
};

export default FeatureTourList;
