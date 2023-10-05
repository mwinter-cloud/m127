import React, { Component } from 'react'
import {Link} from "react-router-dom"

class UserMenu extends Component {
	constructor(props) {
		super(props)
		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside)
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != document.getElementById('notifications_btn')) {
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
					<li>
						<a href="/api/logout"><i className="el-icon-mobile"></i> Выход</a>
					</li>
				</ul>
			</div>
		)
	}
}

export default UserMenu
