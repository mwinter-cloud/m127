import React, { Component } from 'react'
import '../../styles/login.css'
import LoginForm from "../forms/LoginForm"

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner: "",
        }
    }

    componentDidMount() {
        this.props.illustrations.map(el => {
            if (el.type == "LP") {
                this.setState({banner: el.text})
            }
        })
    }

    render() {
        return (
            <main className="registration-page login-page night-mode">
                {this.state.banner ?
                    (<div className="banner"></div>) : null}
                <div className={this.state.banner ? "registration-window" : "registration-window no-banner-window"}>
                    <h1>Вход</h1>
                    <LoginForm set_member={this.props.set_member}/>
                </div>
            </main>
        )
    }
}

export default LoginPage
