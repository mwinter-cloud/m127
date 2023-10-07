import React from 'react'
const RandExp = require('randexp')
import '../../../../static/frontend/images/motya.jpg'

class InviteCreator extends React.Component {
	constructor(props) {
		super(props)
		this.getInviteMsg = this.getInviteMsg.bind(this)
		this.copyText = this.copyText.bind(this)
		this.state = {
			code: '',
			invite_active: 0,
			copy_success: false,
		}
		this.openMsg = this.openMsg.bind(this)
	}
	getInviteMsg = () => {
		let msg_gen = () => {
			let code_word = ''
			code_word = new RandExp(/^[*]{1,3}[0-9]{1,3}[*]{1,3}[a-z]{1,3}[*]{1,3}$/).gen()
    		this.setState({
    			code: code_word
    		})
			return code_word
		}
		const code_word = msg_gen()
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

	openMsg = () => {
		this.setState({invite_active: this.state.invite_active?0:1}, () => {
			if(this.state.invite_active) {
				this.getInviteMsg()
			}
		})
	}

	render() {
		return (
			<>
				<li className="invite-create-block" onClick={this.openMsg}>
					Пригласить друга
				</li>
				<div id="ivite_block" className={this.state.invite_active ? 'invite-block' : 'hide'}>
					<p id="invite_text">Делюсь ссылкой windmail.ru/hello-i-invite-you и кодом {this.state.code}. С
						Наилучшими Пожеланиями!</p>
					<p>Воспользоваться изображением -></p>
					<div class="invite-img"></div>
					<div className="copy-btn" id="copy_btn" onClick={this.copyText}><i
						className="el-icon-document-copy"></i><i
						className={this.state.copy_success ? "el-icon-check green" : "hide"}></i></div>
				</div>
			</>
		)
	}
}

export default InviteCreator
