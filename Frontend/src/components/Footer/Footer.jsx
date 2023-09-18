import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const quick_links1 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick_links2 = [
  {
    path: "/home",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="social_links d-flex align-items-center gap-4">
                {/* youtube */}
                <span>
                  <Link to="">
                    {" "}
                    <i class="ri-youtube-fill" />{" "}
                  </Link>
                </span>
                {/* github */}
                <span>
                  <Link to="">
                    {" "}
                    <i class="ri-github-fill"></i>{" "}
                  </Link>
                </span>
                {/* facebook */}
                <span>
                  <Link to="">
                    {" "}
                    <i class="ri-facebook-box-fill"></i>{" "}
                  </Link>
                </span>
                {/* insta */}
                <span>
                  <Link to="">
                    {" "}
                    <i class="ri-instagram-line"></i>{" "}
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Discover</h5>
            <ListGroup className="footer_quick-links">
              {quick_links1.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Gallery</h5>
            <ListGroup className="footer_quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Contact</h5>

            <ListGroup className="footer_quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line" />
                  </span>
                  Address :
                </h6>
                <p className="mb-0"> Mumbai, Maharashtra</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line" />
                  </span>
                  Address :
                </h6>
                <p className="mb-0"> New Delhi</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line" />
                  </span>
                  Email :
                </h6>
                <p className="mb-0"> abc@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-fill" />
                  </span>
                  Phone :
                </h6>
                <p className="mb-0"> +91-1234567890</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
            © {year} , Designed and Developed by Priyanshu Thathera
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
