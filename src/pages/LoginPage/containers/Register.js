import React, { Component } from "react";
import { register } from "./UserFunctions";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      last_name: "",
      first_name: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };
    register(user).then((res) => {
      this.props.history.push("/login");
    });
  }
  render() {
    return (
      <div className="container pt-5 mt-5">
        <div className="row">
          <div className="col-md-12 mt-5 mx-auto text-white">
            <form noValidate onSubmit={(e) => this.onSubmit(e)}>
              <h1 className="h3 mb-3 font-weight-normal">
                Register Your Account
              </h1>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control text-white"
                  onChange={this.onChange}
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="email"
                  name="last_name"
                  className="form-control"
                  onChange={this.onChange}
                  placeholder="Enter Last name"
                  value={this.state.last_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={this.onChange}
                  placeholder="Enter password"
                  value={this.state.password}
                />
              </div>
              <button
                type="submit"
                id="signup-button"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
