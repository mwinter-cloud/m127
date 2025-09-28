import React, {Component, useState} from "react"
import {Link} from "react-router-dom"

class UserMenu extends Component {
	constructor(props) {
		super(props)
		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.state = {
			'mode': localStorage.getItem('mode'),
		}
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside)
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != document.getElementById('user_menu_btn')) {
			this.props.closeMenu()
		}
	}

	render() {
		return (
			<div className="profile-menu" ref={this.wrapperRef}>
				<ul>
					<li data-link="/settings">
						<Link to="/settings"><i className="el-icon-setting"></i> Настройки</Link>
					</li>
					<li onClick={this.props.changeMegafonWindowStatus}>
						<i className="el-icon-chat-round"></i> Мегафон
					</li>
					<li onClick={this.props.changeMode}>
						<i className={this.state.mode == 'night' ? "el-icon-sunset" : "el-icon-moon"}></i> Сменить тему
					</li>
					<li>
						<a href="/api/logout"><i className="el-icon-mobile"></i> Выход</a>
					</li>
				</ul>
			</div>
		)
	}
}

export default UserMenu
