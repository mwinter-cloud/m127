import React, {useEffect, useState} from 'react'
import '../../styles/message-page.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function EmailConfirmPage() {
	window.scrollTo(0, 0)
	const [operationResult, setOperationResult] = useState(false)
	
	const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: Yup.object({
            code: Yup.string()
                .min(6, 'Код не подходит')
                .max(10, 'Код не подходит')
                .required('Введите код'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
			const formData = new FormData()
			formData.append("csrfmiddlewaretoken", csrftoken)
			formData.append('code', values.code)
            axios.post(window.location.origin+'/api/confirm-email', formData, {
				onUploadProgress: setStatus("loading"),
			}).then(({data}) => {
				if(data=='success') {
					window.location.reload(true);
				} else {
					setErrors({error: 'Код не подходит'});
				}
			}).catch(({response}) => {
				if(response !== undefined) {
					setErrors({error: 'Не вышло. Попробуйте позже.'});
				} else {
					setErrors({error: 'Потеряно соединение с сервером'});
				}
				setStatus("sended");
			})
        },
    })

	const send_confirm_email = () => {
            $.ajax({
                type: 'post',
                url: '/api/confirm-email',
                data: {code: formik.values},
                success: function (res) {
					setOperationResult("Отправлено новое письмо.")
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
	}
	
	return (
		<main className="center-container night-mode">
			<div className="text-block middle-content-block">
				<div>
					<i className="el-icon-message message-page-icon"></i>
				</div>
				<main>
					<p className="info-msg">Для продолжения подтвердите почту. Либо <Link to="../">вернитесь на главную</Link>.</p>
					<form onSubmit={formik.handleSubmit} className="confirm-code-form">
						<input placeholder="Введите здесь код из письма" className="simple-input"  name="code" onChange={formik.handleChange} value={formik.values.code} />
						<button type="submit" className="small-btn"><i className="el-icon-arrow-right"></i></button>
						{formik.errors.code ? <p className="error-msg">{formik.errors.code}</p> : null}
						{formik.errors.error ? <p className="error-msg">{formik.errors.error}</p> : null}
					</form>
					{operationResult ? (<span className="result-text">{operationResult}</span>) :
						(<span className="text-btn" onClick={send_confirm_email}><i className="el-icon-refresh-right"></i> Выслать код</span>)}
				</main>
			</div>
		</main>
	)
}
