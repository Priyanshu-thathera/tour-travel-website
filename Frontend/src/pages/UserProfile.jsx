import React, { useContext } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardText,
  CardBody,
  CardImg,
} from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import av1 from '../assets/images/avatar.jpg'

const UserProfile = () => {
  let { user } = useContext(AuthContext);
  if(user?.data) user = user.data; // for google user
  
  return (
    <>
    <section className="vh-80" style={{ backgroundColor: "#f4f5f7" }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="mb-4 mb-lg-0">
            <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
              <Row className="g-0">
                <Col
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <CardImg
                    src={user?.photo ? user.photo : av1}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "90%",height:'70%' }}
                    fluid
                  />
                  </Col>

                <Col md="8">
                  <CardBody className="p-4">
                    <h6 className="text-align-center">My Profile</h6>
                    <hr className="mt-0 mb-4" />

                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>User Name </h6>
                        <CardText className="text-muted">
                          {user?.username}
                        </CardText>
                      </Col>
                    </Row>

                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Email </h6>
                        <CardText className="text-muted">{user?.email}</CardText>
                      </Col>
                    </Row>
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Phone </h6>
                        <CardText className="text-muted">{user?.phone}</CardText>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default UserProfile;
