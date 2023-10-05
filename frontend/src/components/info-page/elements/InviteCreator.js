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
			invite_active: false,
			copy_success: false,
		}
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
		this.setState({
    		invite_active: true
    	})
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
	render() {
	  return (
	    <>
          <li className="invite-create-block" onClick={this.getInviteMsg}>
		    Пригласить друга
          </li>
          <div id="ivite_block" className={this.state.invite_active?'invite-block':'hide'}>
            <div className="copy-btn" id="copy_btn" onClick={this.copyText}><i className="el-icon-document-copy"></i><i className={this.state.copy_success?"el-icon-check green-text":"hide"}></i></div>
            <p id="invite_text">Делюсь ссылкой http://45.9.42.12:8000/hello-i-invite-you и кодом {this.state.code}. С Наилучшими Пожеланиями!</p>
            <p>можно прикрепить картинку -></p>
            <img src="../../../../static/frontend/images/motya.jpg" class="invite-img" />
          </div>
	    </>
	  )
	}
}

export default InviteCreator
