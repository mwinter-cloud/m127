import React, {Component} from "react"
import UserForm from "../forms/UserForm"
import ProfileForm from "../forms/ProfileForm"
import {Navigate} from "react-router-dom"

class SettingsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access: 'undefined',
            section: 'user',
        }
		this.changeSection = this.changeSection.bind(this)
    }

    componentDidMount() {
		if(!this.props.member.profile.email_confirm) {
			window.location.replace('../email-confirm')
		} else {
			this.setState({access: 'active'})
		}
        this.props.set_section('')
        window.scrollTo(0, 0)
    }

    changeSection = (e) => {
        let section = e.target.getAttribute('section-name')
        this.setState({section: section})
    }

    render() {
		return(
			<main className="settings-page">
				{(() => {
					if(this.state.access == 'active') {
						return (
							<>
								<h1>Настройки</h1>
								<div className="settings-flex">
									<div className="menu">
										<ul>
											<li className={this.state.section == "user" && "active"} section-name="user" onClick={this.changeSection}>аккаунт</li>
											<li className={this.state.section == "profile" && "active"} section-name="profile" onClick={this.changeSection}>профиль</li>
										</ul>
									</div>
									<div className="form-field">
										{this.state.section == "user" ? (<UserForm email={this.props.member.email} />) : (<ProfileForm />)}
									</div>
								</div>
							</>
						)
					} else {
						return (
							<div className="loading-icon"><i className="el-icon-loading"></i></div>
						)
					}
				})()}
			</main>
		)
    }
}

export default SettingsPage
