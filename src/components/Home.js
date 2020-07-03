import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom'
import AddDepModal from "./AddDepModal"
import RegistrationModel from "./RegistrationModel"


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addModalShow: false }
    }

    addModalClose = () => this.setState({ addModalShow: false });
    registrationModelClose = () => this.setState({ RegistrationModel: false });

    render() {
        console.log(this.props.user)
        return (
            <div>

                <Fragment>
                    <Helmet><title>PART 107 - Commercial UAS Study Guide</title></Helmet>
                    <div id="home">
                        <section>
                            <div style={{ textAlign: 'center' }}>
                                <span><span className="mdi mdi-quadcopter cube"></span></span>
                            </div>
                            <h1>PART 107 - Commercial UAS Study Guide </h1>
                            <div className="play-button-container">
                                <ul>
                                    <li ><Link
                                        variant='primary'
                                        onClick={() => this.setState({ addModalShow: true })}
                                        className="play-button"
                                    >Play</Link></li>
                                </ul>
                            </div>
                            <div className="auth-container">
                                <Link
                                    variant='primary'
                                    onClick={() => this.setState({ addModalShow: true })}
                                    className="auth-buttons"
                                    id="login-button">Login</Link>

                                <Link 
                                variant='primary'
                                onClick={() => this.setState({ RegistrationModel: true })}
                                className="auth-buttons" 
                                id="signup-button">Register</Link>
                            </div>
                        </section>
                    </div>
                </Fragment>
                <AddDepModal
                    checkUser={this.props.checkUser}
                    show={this.state.addModalShow}
                    onHide={this.addModalClose}
                />
                <RegistrationModel                  
                    checkUser={this.props.checkUser}
                    show={this.state.RegistrationModel}
                    onHide={this.registrationModelClose}
                />
            </div>

        )
    }
}

export default withRouter(Home);