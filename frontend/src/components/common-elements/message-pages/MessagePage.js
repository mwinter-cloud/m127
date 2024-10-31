import React, {useEffect, useState} from 'react'
import './style/message-page.css'

function MessagePage(props) {
	window.scrollTo(0, 0)
	const [operationResult, setOperationResult] = useState(false)
	const type = props.type
	const [msg, setMsg] = useState('')
	const useMountEffect = () => {
		useEffect(() => {
			if (type == 'email_confirm') {
				setMsg('Загляни на почту и подтверди регистрацию!')
			}
		}, [type])
	}
	useMountEffect()

	const send_confirm_email = () => {
            $.ajax({
                type: 'post',
                url: '/api/send-confirm-email',
                data: {origin: window.location.origin},
                success: function (res) {
					setOperationResult("Отправлено новое письмо")
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
	}
	return (
		<>
			<main className="center-container night-mode">
				<div className="text-block middle-content-block">
					{type == 'email_confirm' ? (
						<i className="el-icon-message message-page-icon"></i>) : ''}
					{msg}
					{type == 'email_confirm' ? (
							operationResult?(<span className="result-text">{operationResult}</span>) :
						(<span className="text-btn" onClick={send_confirm_email}>(<i className="el-icon-refresh-right"></i> Повторить)</span>)) : null}
					{type == 'email_confirm' ? (<a href="/api/logout">Выйти</a>) : ''}
				</div>
			</main>
		</>
	)
}

export default MessagePage
