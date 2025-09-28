import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import CSRFToken from '../../../common-elements/form/CSRFToken'

const RegistrationForm = (props) => {
    const [loading, setLoading] = useState(false)
	
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            password2: '',
            email: '',
            origin: window.location.origin
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Заполните поле логин'),
            password: Yup.string()
                .required('Заполните поле пароль'),
            password2: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Пароль повторён неверно'),
            email: Yup.string().email('Адрес должен выглядеть следующим образом: mao@gmao.com').required('Заполните поле e-mail'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const form = document.getElementById('register_form')
            if (form.hasAttribute('data-submitting')) return
            form.setAttribute('data-submitting', "")
            const set_loading = (val) => {
                setLoading(val)
            }
            $.ajax({
                type: 'post',
                url: '/api/create-user',
                cache: false,
                data: values,
                beforeSend: function () {
                    set_loading(true)
                },
                success: function () {
                    window.location.replace('../')
                },
                error: function (xhr) {
					console.log(xhr)
                    for (const [key, value] of Object.entries(JSON.parse(xhr.responseText))) {
                        if (value[0] == 'Пользователь с таким именем уже существует.') {
                            setErrors({'username': value[0]})
                        } else if (value[0] == 'Указанная почта уже используется.') {
                            setErrors({'email': value[0]})
                        } else {
							setErrors({'error': 'Произошла ошибка. Обратитесь по адресу hello@lisphere.space, и мы решим эту проблему!'})
						}
                    }
                    form.removeAttribute('data-submitting')
                    set_loading(false)
                }
            })
        },
    })
	
    return (
        <form className="simple-form" id="register_form" onSubmit={formik.handleSubmit}>
            <div className="error-block">
                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                {formik.errors.password ? <p>{formik.errors.password}</p> : null}
                {formik.errors.password2 ? <p>{formik.errors.password2}</p> : null}
                {formik.errors.username ? <p>{formik.errors.username}</p> : null}
                {formik.errors.error ? <p>{formik.errors.error}</p> : null}
            </div>
            <CSRFToken/>
            <div className="inputWrapper">
                <label><span>Логин</span></label>
                <input name="username" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange}
                       value={formik.values.username}/>
            </div>
            <div className="inputWrapper">
                <label><span>Пароль</span></label>
                <input type="password" name="password" id="password" onChange={formik.handleChange}
                       value={formik.values.password} autoComplete="new-password" placeholder="(＃＞＜)"/>
            </div>
            <div className="inputWrapper">
                <label><span>Повтор пароля</span></label>
                <input type="password" name="password2" id="password2" onChange={formik.handleChange}
                       value={formik.values.password2} autoComplete="new-password" placeholder="(＃＞＜) х2"/>
            </div>
            <div className="inputWrapper">
                <label><span>E-mail</span></label>
                <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email}
                       placeholder=" = ^ᴗ^ = "/>
            </div>
            <div className="send-form-block">
                <button className="send-btn" type="submit">Вперёд!</button>
                {loading ? (
                    <div className="krutilka">
                        <i className="el-icon-loading"></i>
                    </div>) : null}
            </div>
        </form>
    )
}

export default RegistrationForm