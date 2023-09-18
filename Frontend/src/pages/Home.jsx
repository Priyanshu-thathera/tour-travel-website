import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import Subtitle from "../shared/Subtitle";

import expImg from "../assets/images/experience.png";
import worldImg from "../assets/images/world.png";
import hero1Img from "../assets/images/hero-img01.jpg";
import hero2Img from "../assets/images/hero-img02.jpg";
import heroVid from "../assets/images/hero-video.mp4";

import Searchbar from "../shared/Searchbar";
import ServiceList from "../services/ServiceList";
import FeatureTourList from "../components/Featured-tours/FeatureTourList";
import MasonryImgGallery from "../components/gallery-img/MasonryImgGallery";
import Testimonial from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* hero section */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"know before you go"} />
                  <img src={worldImg} />
                </div>
                <h1>
                  Travelling open the doors
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-3">
                <img src={hero1Img} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-4">
                <video src={heroVid} alt="" controls />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={hero2Img} alt="" />
              </div>
            </Col>

            <Searchbar />
          </Row>
        </Container>
      </section>

      {/* hero section end */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services_subtitle">What we serve</h5>
              <h2 className="services_title">We offer Best services</h2>
            </Col>

            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*======== featured tour section start=========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured_tour_title">Our featured tours</h2>
            </Col>
            <FeatureTourList />
          </Row>
        </Container>
      </section>

      {/* featured tour section end */}

      {/* ============experience section start======= */}

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br />
                  we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
              </div>
              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>12k+</span>
                  <h6>Successful trip</h6>
                </div>

                <div className="counter_box">
                  <span>2k+</span>
                  <h6>Regular Client</h6>
                </div>

                <div className="counter_box">
                  <span>15+</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="exp_img">
                <img src={expImg} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============experience section end */}

      {/* Gallery section start*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery_title">Visit our customer tour gallery</h2>
            </Col>

            <Col lg="12">
              <MasonryImgGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ============Gallery section end=======*/}

      {/* =======testimonial section start */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Lover"} />
              <h2 className="testonomial_title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>

      {/* =======testimonial section end */}

      <Newsletter />
    </>
  );
};

export default Home;
