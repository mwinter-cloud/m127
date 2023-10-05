import React from 'react'
import '../../styles/registration-code.css'
import {useNavigate} from 'react-router-dom'

const RegistrationCodePage = () => {
	const navigate = useNavigate()
	const sendCode = (e) => {
		e.preventDefault()
		let code = document.getElementById('code_input').value
		let result = /^[*]{1,3}[0-9]{1,3}[*]{1,3}[a-z]{1,3}[*]{1,3}$/.test(code)
		if (result === true) {
			navigate('/registration', {state: {entered_code: true}})
		} else {
			alert('код не подходит')
		}
	}
	return (
		<main className="registration-code-block">
			<p className="textsmile"><img src="http://www.lenagold.ru/fon/clipart/z/zay/zajats144.gif"/></p>
			<p>Приветствуем! Чтобы перейти к регистрации, введите код, полученный в приглашении:</p>
			<form onSubmit={sendCode}>
				<input type="text" id="code_input" placeholder="*****"/>
				<button>Вперёд</button>
			</form>
			<p className="test-res"></p>
		</main>
	)
}

export default RegistrationCodePage
