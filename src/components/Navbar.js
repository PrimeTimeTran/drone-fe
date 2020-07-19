import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Navbarr extends Component {
  logOut() {
    localStorage.removeItem("usertoken");
    window.location.replace("http://localhost:3000");
  }

  logInRegLink() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
  }

  renderRightToolBar() {
    if (this.props.user)
      return (
        <Nav>
          <NavDropdown title={this.props.user.email} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Quiz History</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={(e) => this.logOut(e)}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/home">Drone Study Guide</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
          {this.renderRightToolBar()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Navbarr);
