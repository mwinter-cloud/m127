import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"

const UserForm = () => {
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Введи имя'),
            email: Yup.string()
                .max(30, 'Слишком длинная почта'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            console.log(values)
        },
    })
    return (
        <form className="simple-form" onSubmit={formik.handleSubmit}>
            <div className="error-block">
                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                {formik.errors.password ? <p>{formik.errors.password}</p> : null}
            </div>
            <CSRFToken/>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Пароль</span></label>
                    <input name="password" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange}
                           value={formik.values.password}/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Почта для связи</span></label>
                    <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email}
                           placeholder=" = ^ᴗ^ = "/>
                </div>
            </div>
            <button className="send-btn" type="submit">Сохранить</button>
        </form>
    )
}

export default UserForm