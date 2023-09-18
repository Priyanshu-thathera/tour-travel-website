import React from "react";
import { Col } from "reactstrap";
import ServiceCard from "./ServiceCard";

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import custImg from '../assets/images/customization.png'

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed."
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed."
  },
  {
    imgUrl: custImg,
    title: "Customization ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed."
  },
];

const ServiceList = () => {
  return (
    <>
      {serviceData.map((item, index) => (
        <Col lg="3" md='6' sm='12' key={index} >
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
