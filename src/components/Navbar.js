import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        const logInRegLink = (
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
        )


        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        User
                </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navabar-expand-lg navbar-dark bg-dark rounded" >
                <Button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Button>

                <div className="collapse navabar-collapse justify-content-md-center" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        {localStorage.usertoken ? userLink : logInRegLink}
                    </ul>
                </div>
            </nav>
        )
    }

}


export default withRouter(Navbar)



