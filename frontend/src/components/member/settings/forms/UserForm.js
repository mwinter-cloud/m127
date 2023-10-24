import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"

const UserForm = (props) => {
    const [result, setResult] = useState(0)
    const [initEmail, setInitEmail] = useState(props.email)
    const [passwordQuerySended, setPasswordQuerySended] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: props.email,
            origin: window.location.origin,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(30, 'Слишком длинная почта'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            if (initEmail != values.email) {
                $.ajax({
                    type: 'post',
                    url: '/api/change-email-query',
                    cache: false,
                    data: values,
                    success: function () {
                        setResult("На почту отправлено сообщение с инструкцией.")
                        setInitEmail(values.email)
                    },
                    error: function (xhr, status, error) {
                        console.log(JSON.parse(xhr.responseText))
                    }
                })
            }
        },
    })
    const changePasswordQuery = () => {
        setResult("loading")
        if(!passwordQuerySended) {
            $.ajax({
                type: 'post',
                url: '/api/change-password-email',
                cache: false,
                data: {origin: formik.values.origin},
                success: function () {
                    setResult("Для смены пароля перейди по ссылке, отправленной на почту (электронную).")
                    setPasswordQuerySended(true)
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
        }
    }
    return (
        <form className="simple-form" onSubmit={formik.handleSubmit}>
            {result?(result=="loading"?(<i className="el-icon-loading"></i>):(<p>{result}</p>)):null}
            <div className="error-block">
                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
            </div>
            <CSRFToken/>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Пароль</span></label>
                    <span className="text-btn" onClick={changePasswordQuery}>изменить</span>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Почта</span></label>
                    <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email}
                           placeholder=" = ^ᴗ^ = "/>
                </div>
            </div>
            <button className="send-btn" type="submit">Сохранить</button>
        </form>
    )
}

export default UserForm