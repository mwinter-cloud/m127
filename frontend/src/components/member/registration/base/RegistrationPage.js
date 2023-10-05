import React, { Component } from 'react'
import '../../styles/create-profile.css'
import RegistrationForm from "../forms/RegistrationForm"
import '../../styles/registration.css'

class RegistrationPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="registration-page">
                <div className="banner"></div>
                <div className="registration-window">
                    <h1>Регистрация</h1>
                    <RegistrationForm set_member={this.props.set_member}/>
                </div>
            </main>
        )
    }
}

export default RegistrationPage
