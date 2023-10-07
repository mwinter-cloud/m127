import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"
import {useNavigate} from "react-router-dom"

const LoginForm = (props) => {
	const navigation = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Заполните поле логин'),
            password: Yup.string()
                .required('Заполните поле пароль'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const set_member = (data) => {props.set_member(data)}
            const formData = new FormData(document.getElementById('login_form'))
            $.ajax({
                type: 'post',
                url: '/api/signin',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    set_member(res)
                    window.location.replace('/')
                },
                error: function (xhr) {
                    if(xhr.status==400) {
                        setErrors(xhr.responseJSON)
                    }
                }
            })
        },
    })
    return (
        <form className="simple-form" onSubmit={formik.handleSubmit} id="login_form">
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
            </div>
            <button className="send-btn" type="submit">Вперёд!</button>
        </form>
    )
}

export default LoginForm