import React, {useEffect, useState} from 'react'
import './style/message-page.css'

function MessagePage(props) {
	window.scrollTo(0, 0)
	const type = props.type
	const [msg, setMsg] = useState('')
	const useMountEffect = () => {
		useEffect(() => {
			if (type == 'email_confirm') {
				setMsg('Загляни в свою почту и подтверди регистрацию!')
			}
		}, [type])
	}
	useMountEffect()
	return (
		<>
			<main className="center-container">
				<div className="text-block middle-content-block">
					{type == 'email_confirm' ? (
						<img src="http://www.lenagold.ru/fon/clipart/g/griz/griz037.gif"/>) : ''}
					{msg}
					{type == 'email_confirm' ? (<a href="/api/logout">Выйти</a>) : ''}
				</div>
			</main>
		</>
	)
}

export default MessagePage
