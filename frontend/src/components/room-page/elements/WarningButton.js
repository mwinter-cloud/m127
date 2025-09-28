import React from 'react'
import AnswerHideBtn from "./AnswerHideBtn"

class WurningButton extends React.Component {
	constructor(props) {
		super(props)
		this.sendWarning = this.sendWarning.bind(this)
		this.addNotification = this.addNotification.bind(this)
		this.sendSocketMsg = this.sendSocketMsg.bind(this)
		this.state = {
			is_sended: 2, // 0 -не отправлено, 1 - сейчас отправлено, 2 - уже было ранее отправлено(либо неизвестно)
		}
	}

	componentDidMount = () => {
		const set_sended = () => {
			this.setState({is_sended: 0})
		}
		const violator_id = this.props.recipient_profile_id
		let object_id = 0
		let type = 0
		if (this.props.answer_id) {
			object_id = this.props.answer_id
			type = 4
		}
		$.ajax({
			type: 'post',
			url: window.location.origin + '/api/warning-exist',
			cache: false,
			data: {violator_id: violator_id, object_id: object_id, type: type},
			success: function (result) {
				if (result == 0) {
					set_sended()
				}
			},
			error: function (xhr, status, error) {
				console.log('Ошибка при проверке существования жалобы')
			}
		})
	}

	sendWarning = (e) => {
		e.preventDefault()
        const form = e.target
        if (form.hasAttribute('data-submitting')) return
        form.setAttribute('data-submitting',"")
		if (!this.state.is_sended) {
			this.addNotification()
		}
	}

	addNotification = () => {
		const event_recipient = this.props.recipient_user_id
		let notification_data = {
			text: "",
			recipients: [event_recipient],
			sender: this.props.my_profile.id,
		}
		if (this.props.answer_id) {
			notification_data.object = this.props.answer_id
			notification_data.type = 4
		}
		const set_sended = () => {
			this.setState({is_sended: 1})
		}
		const send_msg = (res_data) => {
			this.sendSocketMsg(res_data)
		}
		const open_socket_and_send_msg = (res_data) => {
			let wsProtocol = ""
			if (window.location.protocol == 'https:') {
				wsProtocol = 'wss://'
			} else {
				wsProtocol = 'ws://'
			}
			this['userSocket' + event_recipient] = new WebSocket(
				wsProtocol + window.location.host + '/ws/user/' + event_recipient)
			this['userSocket' + event_recipient].onopen = function () {
				send_msg(res_data)
			}
		}
		$.ajax({
			type: 'post',
			url: window.location.origin + '/api/add-notification',
			cache: false,
			data: notification_data,
			success: function (res_data) {
				open_socket_and_send_msg(res_data)
				set_sended()
			},
			error: function (xhr, status, error) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}

	sendSocketMsg = (data) => {
		const event_recipient = this.props.recipient_user_id
		const event_data = {
			'id': this.props.answer_id,
			'object': data.object,
			'text': "",
			'sender': {
				'id': this.props.my_profile.id, 'name': this.props.my_profile.name,
				'avatar': this.props.my_profile.avatar
			},
			'created_at': data.created_at,
			'notif_type': this.props.answer_id ? 4 : 5,
		}
		const send_socket_msg = () => {
			this['userSocket' + event_recipient].send(JSON.stringify(event_data))
		}
		const closeWs = () => {
			this['userSocket' + event_recipient].close()
		}
		const sendPr = new Promise(function (resolve) {
			send_socket_msg()
			resolve()
		})
		sendPr.then(closeWs())
	}

	render() {
		if (this.state.is_sended != 2) {
			return (
				<form onSubmit={this.sendWarning}>
					<button type="submit" className="btn">{this.state.is_sended ?
						(<AnswerHideBtn answer_id={this.props.answer_id}/>)
						: (<><i className="el-icon-aim"></i> warning</>)}
					</button>
				</form>
			)
		} else {
			return null
		}
	}
}

export default WurningButton