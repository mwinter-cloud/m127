import React, {useState} from 'react'
import '../../styles/registration-code.css'
import {useNavigate} from 'react-router-dom'

const RegistrationCodePage = () => {
	const navigate = useNavigate()
    const [error, setError] = useState("")
	const sendCode = (e) => {
		e.preventDefault()
		const code = document.getElementById('code_input').value
		$.ajax({
			type: 'post',
			url: '/api/compare-code',
			cache: false,
			data: {code: code},
			success: function (result) {
				console.log(result)
				if(result) {
					navigate('/registration', {state: {entered_code: true, operation_id: result}})
				} else {
					setError("Проверка не пройдена.")
				}
			},
			error: function () {
				setError("Произошла ошибка.")
			}
		})
	}
	return (
		<main className="registration-code-block">
			<p className="textsmile"><i className="el-icon-key invite-page-icon"></i></p>
			<p>Привет! Чтобы перейти к регистрации, введи код, полученный в приглашении:</p>
			<form onSubmit={sendCode}>
				<input type="text" id="code_input" placeholder="*****"/>
				<button>Вперёд</button>
			</form>
			{error?(<p className="error-msg">{error}</p>):null}
		</main>
	)
}

export default RegistrationCodePage
