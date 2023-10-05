import React from 'react'
import NotificationNote from "./NotificationNote"

class NotificationBlock extends React.Component {
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
			this.props.openWindow()
		}
	}

	render() {
		return (
			<div className="notifications-block" ref={this.wrapperRef}>
				<ul>
					{this.props.notifications.map((notification, index) => {
						return (<NotificationNote notification={notification} key={index}/>)
					})}
				</ul>
			</div>
		)
	}
}

export default NotificationBlock