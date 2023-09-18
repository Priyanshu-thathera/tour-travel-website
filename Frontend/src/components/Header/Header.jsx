import React, { useEffect, useRef, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../Header/header.css";
import { BASE_URL } from "../../utilis/config";
import { AuthContext } from "../../context/AuthContext";

const nav_links = [
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

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  ///////// for logout ////////////
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok) alert(result.message);
      else {
        alert(result.message);
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef && headerRef.current.classList.add("sticky_header");
      } else {
        headerRef && headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () =>
    menuRef && menuRef.current.classList.toggle("show_menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-item-center justify-content-between">
            {/* logo start */}
            <div className="logo">
              <img src={logo} />
            </div>
            {/* logo end */}

            {/* menu start */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_items" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* menu end */}

            <div className="nav_right d-flex align-items-center gap-4 ">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                  <Button className="btn secondary__btn">
                      <Link to="/userProfile">My Profile</Link>
                    </Button>
                    <Button className="btn secondary__btn">
                      <Link to="/userBooking">My Booking</Link>
                    </Button>
                    <Button className="btn btn-dark" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn primary__btn">
                      <Link to="/login">login</Link>
                    </Button>

                    <Button className="btn secondary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile_menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
