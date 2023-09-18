import React, { useRef } from "react";
import "./searchbar.css";
import { Col, Form, FormGroup } from "reactstrap";

import { BASE_URL } from "../utilis/config";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const handleInputChange = () => {
    const dist = distanceRef.current.valueAsNumber;
    const ppl = maxGroupSizeRef.current.valueAsNumber;
    // Handle the case where a negative value is entered
    if (dist < 0 ) distanceRef.current.value = 0; // Reset the input to 0 km
    if(ppl<1) maxGroupSizeRef.current.value = 1;
  };

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "")
      alert("Fill all required field");
    else {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
      );

      if (!res.ok) alert("something went wrong");
      const result = await res.json();
      navigate(
        `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
        { state: result.data }
      );
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-search-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder=" Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
            <i class="ri-map-pin-fill"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder=" Distance in km"
                min='0'
                ref={distanceRef}
                onChange={handleInputChange}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
            <i class="ri-group-fill"></i>
            </span>
            <div>
              <h6>number of People</h6>
              <input
                type="number"
                placeholder=" 0"
                min="1"
                step="1"
                ref={maxGroupSizeRef}
                onChange={handleInputChange}
              />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
          <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default Searchbar;
