import React, { Component } from 'react'
import { register } from './UserFunctions'
import { withRouter } from 'react-router-dom'


class Register extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        }
        console.log("password", typeof this.state.password)
        this.onChange = this.onChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    haha(e) {
        console.log("this.state.password", this.state.password)
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        }
        register(user).then(res => {
            this.props.history.push('/login')
        })
    }
    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-12 mt-5 mx-auto">
                        <form noValidate onSubmit={(e) => this.haha(e)} >
                            <h1 className="h3 mb-3 font-weight-normal">Register Your Account</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter Last name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                                id="signup-button">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }

}

export default withRouter(Register)