import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"
import FileInputWrapper from "../../../common-elements/form/elements/wrappers/FileInputWrapper"

const ProfileCreateForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            city: '',
            email: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(30, 'Слишком длинное имя')
                .required('Введи имя'),
            city: Yup.string()
                .max(30, 'Слишком длинное название города'),
            email: Yup.string()
                .max(30, 'Слишком длинная почта'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            saveProfile()
        },
    })

    const saveProfile = () => {
        const formData = new FormData(document.getElementById('profile_create_form'))
        $.ajax({
            type: 'post',
            url: '/api/create-profile',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                window.location.reload()
            },
            error: function () {
                window.location.reload()
            }
        })
    }
    return (
        <form className="simple-form" onSubmit={formik.handleSubmit} id="profile_create_form"
              encType="multipart/form-data" method="post">
            <h2><i className="el-icon-sunset"></i> Создание профиля</h2>
            <p>
                Отлично! Давай познакомимся!
            </p>
            <div className="error-block">
                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                {formik.errors.city ? <p>{formik.errors.city}</p> : null}
            </div>
            <CSRFToken/>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Имя</span></label>
                    <input name="name" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange}
                           value={formik.values.name}/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Город</span></label>
                    <input type="city" name="city" onChange={formik.handleChange} value={formik.values.city}
                           placeholder=" = ^ᴗ^ = "/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label><span>Почта для связи</span></label>
                    <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email}
                           placeholder=" = ^ᴗ^ = "/>
                </div>
            </div>
            <div className="form-group">
                <FileInputWrapper label="Аватар"
                                  src=""
                                  field="avatar"/>
            </div>
            <button className="send-btn" type="submit">Вперёд</button>
        </form>
    )
}

export default ProfileCreateForm