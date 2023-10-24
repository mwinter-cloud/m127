import React, { Component } from 'react'
import '../../styles/create-profile.css'
import RegistrationForm from "../forms/RegistrationForm"
import '../../styles/registration.css'

class RegistrationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner: "",
        }
    }

    componentDidMount() {
        this.props.illustrations.map(el => {
            if (el.type == "RP") {
                this.setState({banner: el.text})
            }
        })
    }

    render() {
        return (
            <main className="registration-page">
                {this.state.banner ?
                    (<div className="banner"></div>) : null}
                <div className={this.state.banner ? "registration-window" : "registration-window no-banner-window"}>
                    <h1>Регистрация</h1>
                    <RegistrationForm set_member={this.props.set_member} operation_id={this.props.operation_id}/>
                </div>
            </main>
        )
    }
}

export default RegistrationPage
