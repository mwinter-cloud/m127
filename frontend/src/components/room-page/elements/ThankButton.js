import React from 'react'
import {specialtagsinnotification} from "../../common-elements/form/elements/editor/TextEditor"
import '../../../../../frontend/static/frontend/images/stars.gif'

class ThankButton extends React.Component {
	constructor(props) {
		super(props)
		this.sendThanks = this.sendThanks.bind(this)
		this.addNotification = this.addNotification.bind(this)
		this.sendSocketMsg = this.sendSocketMsg.bind(this)
		this.state = {
			is_sended: 0,
		}
	}

	componentDidMount() {
		if(localStorage.getItem('thank_answer_'+this.props.answer_id)) {
			this.setState({is_sended: 1})
		}
	}

	sendThanks = () => {
		const data = {
			id: this.props.author_id,
			my_id: this.props.my_profile.id,
			ans_text: specialtagsinnotification(this.props.text).substring(0, 100),
			answer: this.props.answer_id,
		}
		if(!this.state.is_sended) {
			this.addNotification(data)
		}
	}

	addNotification = (data) => {
		const recipient = this.props.author_user_id
		let notification_data = {recipients: [this.props.author_user_id], text: data.ans_text, type: 0, object: data.answer, id: this.props.answer_id}
		const set_sended = () => {
			this.setState({is_sended: 1})
			localStorage.setItem('thank_answer_'+this.props.answer_id,1)
		}
		const send_msg = (res_data) => {this.sendSocketMsg(res_data)}
        let wsProtocol = ""
        if (window.location.protocol == 'https:') {
          wsProtocol = 'wss://'
        } else {wsProtocol = 'ws://'}
		const open_socket_and_send_msg = (res_data) => {
			this['userSocket' + recipient] = new WebSocket(
				wsProtocol + window.location.host + '/ws/user/' + recipient)
			this['userSocket' + recipient].onopen = function () {
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
		const recipient = this.props.author_user_id
		const event_data = {
			'object': data.object,
			'text': data.text,
			'sender': {'id': this.props.my_profile.id, 'name': this.props.my_profile.name,
				'avatar': this.props.my_profile.avatar},
			'created_at': data.created_at,
			'notif_type': 0,
		}
		const send_socket_msg = () => {
			this['userSocket' + recipient].send(JSON.stringify(event_data))
		}
		const closeWs = () => {
			this['userSocket' + recipient].close()
		}
		const sendPr = new Promise(function (resolve) {
			send_socket_msg()
			resolve()
		})
		sendPr.then(closeWs())
	}

	render() {
		return (
			<div className="btn" onClick={this.sendThanks}>
				{this.state.is_sended ? (
						<img src="../../../../../frontend/static/frontend/images/stars.gif" className="send-success"/>) :
					(<i className="el-icon-star-off"></i>)} спасибо
			</div>
		)
	}
}

export default ThankButton