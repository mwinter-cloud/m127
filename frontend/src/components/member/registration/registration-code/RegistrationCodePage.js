import React, {useState} from 'react'
import '../../styles/registration-code.css'
import {useNavigate} from 'react-router-dom'

const RegistrationCodePage = () => {
	const navigate = useNavigate()
	const [error, setError] = useState("")
	const sendCode = (e) => {
		e.preventDefault()
		const form = document.getElementById('register_code_form')
		if (form.hasAttribute('data-submitting')) return
		form.setAttribute('data-submitting', "")
		const code = document.getElementById('code_input').value
		$.ajax({
			type: 'post',
			url: '/api/compare-code',
			cache: false,
			data: {code: code},
			success: function (result) {
				if (result) {
					navigate('/registration', {state: {entered_code: true, operation_id: result}})
				} else {
					setError("Проверка не пройдена.")
					form.removeAttribute('data-submitting')
				}
			},
			error: function () {
				setError("Произошла ошибка.")
				form.removeAttribute('data-submitting')
			}
		})
	}
	return (
		<main className="registration-code-block">
			<p className="textsmile"><i className="el-icon-key invite-page-icon"></i></p>
			<p>Привет! Чтобы перейти к регистрации, введи код, полученный в приглашении:</p>
			<form onSubmit={sendCode} id="register_code_form">
				<input type="text" id="code_input" placeholder="Введите здесь код"/>
				<button>Вперёд</button>
			</form>
			{error ? (<p className="error-msg">{error}</p>) : null}
		</main>
	)
}

export default RegistrationCodePage
