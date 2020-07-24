import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faHistory,
  faSignOutAlt,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = (props) => {
  const logOut = () => {
    localStorage.removeItem("usertoken");
    window.location.replace("http://localhost:3000");
  };

  const renderRightToolBar = () => {
    if (props.user)
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
            <NavDropdown.Item href="#action/3.3">
              <FontAwesomeIcon className="mr-2" icon={faCog} /> Settings
            </NavDropdown.Item>
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
    <Navbar bg="light" expand="lg" fixed="top">
      <Link className="navbar-brand" to="/">
        Drone Study Guide
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
        </Nav>
        {renderRightToolBar()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavigationBar);
