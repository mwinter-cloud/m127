import React, {useState, useEffect} from 'react'
const RandExp = require('randexp')
import axios from 'axios'

export const InviteCreator = ({invite_image}) => {
	const [code, setCode] = useState('')
	const [invite_active, setInviteActive] = useState('hide')
	const [copy_success_class, setCopySuccess] = useState('hide')
	
	const copyText = () => {
		const range = document.createRange()
		range.selectNode(document.getElementById('invite_text'))
		window.getSelection().removeAllRanges()
		window.getSelection().addRange(range)
		document.execCommand('copy')
		window.getSelection().removeAllRanges()
		setCopySuccess('el-icon-check')
	}

	const getInvite = () => {
		let code_word = ''
		code_word = new RandExp(/^[*]{1,3}[0-9]{1,3}[*]{1,3}[a-z]{1,3}[*]{1,3}$/).gen()
		const data = {code: code_word}
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('code', code_word)
		axios.post(`${window.location.origin}/api/create-invite`, formData).then(({data}) => {
			setCode(code)
			setInviteActive(invite_active == 'invite-block' ? 'hide' : 'invite-block')
		}).catch((data) => {
			console.log('.')
		})
	}
	
	return (
		<>
			<li className="invite-create-block" onClick={getInvite}>Пригласить друга</li>
			<div id="ivite_block" className={invite_active}>
				<p id="invite_text">Приглашаю перейти по ссылке -> {window.location.host}/hello-i-invite-you. Мой код - {code}. 
					С Наилучшими Пожеланиями!</p>
					{invite_image ? (
						<>
							<p>Воспользоваться изображением -></p>
							<img src={invite_image} className="invite-img" />
						</>
					) : null}
				<div className="copy-btn" id="copy_btn" onClick={copyText}><i
					className="el-icon-document-copy"></i><i className={copy_success_class}></i></div>
			</div>
		</>
	)
}