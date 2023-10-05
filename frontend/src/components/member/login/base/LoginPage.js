import React, { Component } from 'react'
import '../../styles/login.css'
import LoginForm from "../forms/LoginForm"

class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="registration-page login-page">
                <div className="banner"></div>
                <div className="registration-window">
                    <h1>Вход</h1>
                    <LoginForm set_member={this.props.set_member}/>
                </div>
            </main>
        )
    }
}

export default LoginPage
