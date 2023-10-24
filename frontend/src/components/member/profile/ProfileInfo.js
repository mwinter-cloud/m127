import React, { Component } from 'react'

class ProfileInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
			<ul className="profile-info">
				<header><h4>Информация</h4></header>
				<li>
					<span className="title">Город</span>
					<span className="text">{this.props.city?this.props.city:"?"}</span>
				</li>
				<li>
					<span className="title">Почта</span>
					<span className="text">{this.props.email?this.props.email:"?"}</span>
				</li>
				<li>
					<span className="title">Сайт</span>
					<span className="text">
						{this.props.webcite?(<a href={"../../"+this.props.webcite}>{this.props.webcite}</a>):"?"}
					</span>
				</li>
			</ul>
        )
    }
}

export default ProfileInfo
