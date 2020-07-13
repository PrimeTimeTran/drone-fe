import React, { Component } from "react";
import { login } from "./UserFunctions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    // this.haha = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    login(user).then((res) => {
      if (res) {
        this.props.checkUser();
        setTimeout(() => {
          this.props.history.push("/profile");
        }, 500);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
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
                id="login-button"
                className="btn btn-lg btn-block"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
