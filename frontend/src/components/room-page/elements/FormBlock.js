import React, { Component } from 'react'
import AnswerForm from "../forms/AnswerForm"
import MediaQuery from 'react-responsive'

class FormBlock extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editor_status: ""
		}
		this.openEditor = this.openEditor.bind(this)
		this.editorHide = this.editorHide.bind(this)
		this.openMobileEditor = this.openMobileEditor.bind(this)
		this.btnHover = this.btnHover.bind(this)
		this.sendSocketMsg = this.sendSocketMsg.bind(this)
		this.addNotification = this.addNotification.bind(this)
	}

	addNotification = (data) => {
		const send_msg = (res_data, recipient) => {
			this.sendSocketMsg(res_data, recipient)
		}
		const open_socket_and_send_msg = (event_data, recipient) => {
			let wsProtocol = ""
			if (window.location.protocol == 'https:') {
				wsProtocol = 'wss://'
			} else {
				wsProtocol = 'ws://'
			}
			this['userSocket' + recipient] = new WebSocket(
				wsProtocol + window.location.host + '/ws/user/' + recipient)
			this['userSocket' + recipient].onopen = function () {
				send_msg(event_data, recipient)
			}
		}
		let data_for_db_note = {
			recipients: data.recipients,
			text: data.text,
			type: data.notif_type,
			object: data.object
		}
		$.ajax({
			type: 'post',
			url: window.location.origin + '/api/add-notification',
			cache: false,
			data: data_for_db_note,
			success: function (res_data) {
				data.created_at = res_data.created_at
				data.id = res_data.id
				data.recipients.map(recipient => {
					open_socket_and_send_msg(data, recipient)
				})
			},
			error: function (xhr, status, error) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}

	sendSocketMsg = (data, recipient) => {
		const event_data = {
			'id': {room:this.props.id,notification:data.id},
			'object': data.object,
			'text': data.text,
			'sender': data.sender,
			'created_at': data.created_at,
			'notif_type': data.notif_type,
		}
		const send_socket_msg = () => {
			this['userSocket' + recipient].send(JSON.stringify(event_data))
		}
		const closeWs = () => {
			this['userSocket' + recipient].close()
			this['userSocket' + recipient] = null
		}
		const sendPr = new Promise(function (resolve) {
			send_socket_msg()
			resolve()
		})
		sendPr.then(closeWs())
	}

	openEditor = () => {
		if (this.state.editor_status == 'editor-opacity' || this.state.editor_status == '') {
			this.setState({editor_status: 'fixed-editor'})
			document.querySelector('#answer_list').classList.add('special-pb')
		} else {
			this.setState({editor_status: ''})
			document.querySelector('#answer_list').classList.remove('special-pb')
		}
	}
	editorHide = () => {
		if (this.state.editor_status != 'fixed-editor') {
			this.setState({editor_status: ''})
		}
	}
	btnHover = () => {
		if (this.state.editor_status != 'fixed-editor') {
			this.setState({editor_status: 'editor-opacity'})
		}
	}

	openMobileEditor = (e) => {
		if (this.state.editor_status == '') {
			this.setState({editor_status: 'fixed-editor'})
			document.querySelector('#answer_list').classList.add('special-pb')
		} else {
			this.setState({editor_status: ''})
			document.querySelector('#answer_list').classList.remove('special-pb')
		}
	}

	render() {
		if ((this.props.room_type == "ADM" && this.props.is_admin) || (this.props.room_type != "ADM")) {
			return (
				<>
					<MediaQuery minWidth={801}>
						<button onMouseEnter={this.btnHover} onMouseLeave={this.editorHide} onClick={this.openEditor}
								className='editor-btn'><i className="el-icon-chat-round"></i></button>
					</MediaQuery>
					<MediaQuery maxWidth={800}>
						<button onMouseLeave={this.editorHide} onClick={this.openMobileEditor}
								className={this.state.editor_status ? "editor-btn opened-editor-mobile-btn" : "editor-btn"}>
							<i className="el-icon-chat-round"></i></button>
					</MediaQuery>
					<div className={this.state.editor_status + " answer-input"}>
						<AnswerForm id={this.props.id} form_name="new_answer_form"
									sendSocketEvent={this.props.sendSocketEvent}
									addNotification={this.addNotification} savers={this.props.savers}
									room_name={this.props.room_name}/>
					</div>
				</>
			)
		} else {
			return null
		}
	}
}

export default FormBlock
