import React from "react";
import { Link, withRouter } from "react-router-dom";
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
            <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
            <Link className="dropdown-item" to="/history">
              Quiz History
            </Link>
            <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="mb-5">
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
