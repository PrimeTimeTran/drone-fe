import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faSignOutAlt,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = (props) => {
  const logOut = () => {
    localStorage.removeItem("userToken");
    setTimeout(() => {
      window.location.replace(process.env.REACT_APP_SITE_URL);
    }, 500)
  };

  const renderRightToolBar = () => {
      return (
        <Nav>
          <NavDropdown title={props.user.email} id="basic-nav-dropdown">
            <Link className="dropdown-item" to="/">
              <FontAwesomeIcon className="mr-3" icon={faChalkboardTeacher} />
              About Us
            </Link>
            <Link className="dropdown-item" to="/history">
              <FontAwesomeIcon className="mr-2" icon={faHistory} /> Quiz History
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logOut}>
              <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
  };

  return (
    <Navbar bg="light" fixed="top">
      <Link className="navbar-brand" to="/">
        Drone Study Guide
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
        </Nav>
        {props.user && renderRightToolBar()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavigationBar);
