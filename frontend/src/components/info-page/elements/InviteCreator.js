import React from 'react'
const RandExp = require('randexp')

class InviteCreator extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			code: '',
			invite_active: 0,
			copy_success: false,
		}
		this.getInvite = this.getInvite.bind(this)
		this.copyText = this.copyText.bind(this)
	}

	copyText = () => {
		let range = document.createRange()
		range.selectNode(document.getElementById("invite_text"))
		window.getSelection().removeAllRanges()
		window.getSelection().addRange(range)
		document.execCommand("copy")
		window.getSelection().removeAllRanges()
		this.setState({
			copy_success: true
		})
	}

	getInvite = () => {
		let code_word = ''
		code_word = new RandExp(/^[*]{1,3}[0-9]{1,3}[*]{1,3}[a-z]{1,3}[*]{1,3}$/).gen()
		let data = {code: code_word}
		const set_code = (code) => {
			this.setState({code: code})
			this.setState({invite_active: this.state.invite_active ? 0 : 1})
		}
		$.ajax({
			type: 'post',
			url: '/api/create-invite',
			cache: false,
			data: data,
			success: function (code) {
				console.log(code)
				set_code(code)
			},
			error: function (xhr) {
				if (xhr.status == 400) {
					setErrors(xhr.responseJSON)
				}
			}
		})
	}

	render() {
		return (
			<>
				<li className="invite-create-block" onClick={this.getInvite}>Пригласить друга</li>
				<div id="ivite_block" className={this.state.invite_active ? 'invite-block' : 'hide'}>
					<p id="invite_text">Приглашаю перейти по ссылке -> {window.location.host}/hello-i-invite-you. Мой код
						- {this.state.code}. С
						Наилучшими Пожеланиями!</p>
						{this.props.invite_image ? (
							<>
								<p>Воспользоваться изображением -></p>
								<img src={this.props.invite_image} className="invite-img"/>
							</>
						) : null}
					<div className="copy-btn" id="copy_btn" onClick={this.copyText}><i
						className="el-icon-document-copy"></i><i
						className={this.state.copy_success ? "el-icon-check" : "hide"}></i></div>
				</div>
			</>
		)
	}
}

export default InviteCreator
