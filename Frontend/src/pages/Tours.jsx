import React, { useEffect, useState } from "react";
import "../styles/tours.css";

import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Searchbar from "../shared/Searchbar";
import Newsletter from "../shared/Newsletter";
// import tourdata from "../assets/data/tours";
import { Col, Container, Row } from "reactstrap";
import useFetch from "../hooks/useFetch";

import { BASE_URL } from "../utilis/config";

const Tours = () => {
  const [pageCount, setpageCount] = useState(0);
  const [page, setpage] = useState(0);

  const { data: tourdata, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);
  
  useEffect(() => {
    const pages = Math.ceil(tourCount / 5);
    setpageCount(pages);
    window.scrollTo(0,0);
  }, [page, tourCount,tourdata]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <Searchbar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {/* here ? means only run map when tourdata is not empty */}
              {tourdata?.map((tour) => (
                <Col lg="3" md='6' sm='6' key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setpage(number)}
                      className={page === number ? "active_page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
