import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"

const LoginForm = () => {
    const [passwordQuerySended, setPasswordQuerySended] = useState(false)
    const [result, setResult] = useState(0)
    const [formType, setFormType] = useState("login-form")
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            origin: window.location.origin,
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Заполните поле логин'),
            password: Yup.string()
                .required('Заполните поле пароль'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const form = document.getElementById('login_form')
            if (form.hasAttribute('data-submitting')) return
            form.setAttribute('data-submitting', "")
            $.ajax({
                type: 'post',
                url: '/api/signin',
                cache: false,
                data: values,
                success: function () {
                    window.location.replace('/')
                },
                error: function (xhr) {
                    if (xhr.status == 400) {
                        setErrors(xhr.responseJSON)
                    }
                    form.removeAttribute('data-submitting')
                }
            })
        },
    })
    const formik2 = useFormik({
        initialValues: {
            email: '',
            origin: window.location.origin,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Заполните поле почта'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            if (!passwordQuerySended) {
            setResult("loading")
                $.ajax({
                    type: 'post',
                    url: '/api/change-anonim-password-email',
                    cache: false,
                    data: {origin: values.origin, email: values.email},
                    success: function () {
                        setResult("Для смены пароля перейди по ссылке, отправленной на почту.")
                        setPasswordQuerySended(true)
                    },
                    error: function (xhr, status, error) {
						if(xhr.status == 404) {
							setResult("Пользователь с такой почтой не найден.")
						} else {
							setResult("Отправить письмо по адресу не удалось.")
						}
                    }
                })
            }
        },
    })
    const changeForm = () => {
        if (formType == "restore-form") {
            setFormType("login-form")
        } else {
            setFormType("restore-form")
        }
    }
    if (formType == "login-form") {
        return (
            <form className="simple-form" id="login_form" onSubmit={formik.handleSubmit}>
                <div className="error-block">
                    {formik.errors.username ? <p>{formik.errors.username}</p> : null}
                    {formik.errors.password ? <p>{formik.errors.password}</p> : null}
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
                    <span className="restore-password-text text-btn" onClick={changeForm}>напомнить</span>
                </div>
                <button className="send-btn" type="submit">Вперёд!</button>
            </form>
        )
    } else {
        return (
            <form className="simple-form" onSubmit={formik2.handleSubmit}>
                <span className="text-btn back-arrow" onClick={changeForm}>Назад</span>
                <div className="error-block">
                    {formik2.errors.email ? <p>{formik2.errors.email}</p> : null}
                    {result?(result=="loading"?(<i className="el-icon-loading"></i>):(<p>{result}</p>)):null}
                </div>
                <CSRFToken/>
                <div className="inputWrapper">
                    <label><span>Почта</span></label>
                    <input name="email" placeholder=" = ^ᴗ^ = " onChange={formik2.handleChange}
                           value={formik2.values.email}/>
                </div>
                <button className="send-btn" type="submit">Далее</button>
            </form>
        )
    }
}

export default LoginForm