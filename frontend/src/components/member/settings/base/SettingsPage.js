import React, { Component } from 'react'
import UserForm from "../forms/UserForm"
import ProfileForm from "../forms/ProfileForm"

class SettingsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section: "user",
        }
		this.changeSection = this.changeSection.bind(this)
    }

    componentDidMount() {
        this.props.set_section('')
        window.scrollTo(0, 0)
    }

    changeSection = (e) => {
        let section = e.target.getAttribute('section-name')
        this.setState({section: section})
    }

    render() {
        return (
            <main className="settings-page">
                <h1>Настройки</h1>
                <div className="settings-flex">
                    <div className="menu">
                        <ul>
                            <li className={this.state.section=="user"?"active":null} section-name="user" onClick={this.changeSection}>аккаунт</li>
                            <li className={this.state.section=="profile"?"active":null} section-name="profile" onClick={this.changeSection}>профиль</li>
                        </ul>
                    </div>
                    <div className="form-field">
                        {this.state.section=="user"?(<UserForm/>):(<ProfileForm/>)}
                    </div>
                </div>
            </main>
        )
    }
}

export default SettingsPage
