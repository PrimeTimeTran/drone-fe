import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import AddDepModal from "./AddDepModal";
import RegistrationModel from "./RegistrationModel";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addModalShow: false };
  }

  addModalClose = () => this.setState({ addModalShow: false });
  registrationModelClose = () => this.setState({ RegistrationModel: false });

  render() {
    return (
      <div>
        <Fragment>
          <Helmet>
            <title>PART 107 - Commercial UAS Study Guide</title>
          </Helmet>
          <div id="home">
            <section>
              <div style={{ textAlign: "center" }}>
                <span>
                  <span className="mdi mdi-quadcopter cube"></span>
                </span>
              </div>
              <h1>PART 107 - Commercial UAS Study Guide </h1>
              <div className="play-button-container">
                <ul>
                  <li>
                    <Link
                      variant="primary"
                      className="play-button"
                      onClick={() => this.setState({ addModalShow: true })}
                    >
                      Play
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="auth-container">
                <Link
                  id="login-button"
                  variant="primary"
                  className="auth-buttons"
                  onClick={() => this.setState({ addModalShow: true })}
                >
                  Login
                </Link>

                <Link
                  variant="primary"
                  id="signup-button"
                  className="auth-buttons"
                  onClick={() => this.setState({ RegistrationModel: true })}
                >
                  Register
                </Link>
              </div>
            </section>
          </div>
        </Fragment>
        <AddDepModal
          onHide={this.addModalClose}
          show={this.state.addModalShow}
          checkUser={this.props.checkUser}
        />
        <RegistrationModel
          checkUser={this.props.checkUser}
          show={this.state.RegistrationModel}
          onHide={this.registrationModelClose}
        />
      </div>
    );
  }
}

export default withRouter(Home);
