import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import CSRFToken from "../../../common-elements/form/CSRFToken"
import FileInputWrapper from "../../../common-elements/form/elements/wrappers/FileInputWrapper"
import ColorInput_wrap from "../../../../store/wraps/forms/ColorInput_wrap"

const ProfileForm = () => {
	const [profile_data, setProfileData] = useState({})
    const [selectedColor, setColor] = useState('transparent')

    const useMountEffect = () => {
		useEffect(() => {
			axios.get('http://'+window.location.host+'/api/get-my-profile').then(profile => {
				setProfileData(profile.data)
				setColor(profile.data.color)
                formik.setFieldValue('name', profile.data.name)
                formik.setFieldValue('email', profile.data.email)
                formik.setFieldValue('webcite', profile.data.webcite)
                formik.setFieldValue('city', profile.data.city)
                formik.setFieldValue('post_title', profile.data.post_title)
                formik.setFieldValue('post_text', profile.data.post_text)
			})
		},[])
	}
    useMountEffect()
    const formik = useFormik({
        initialValues: {
            name: '',
            city: '',
            email: '',
            cite: '',
            post_title: '',
            post_text: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(30, 'Слишком длинное имя')
                .required('Введи имя'),
            city: Yup.string()
                .max(30, 'Слишком длинное название города'),
            email: Yup.string()
                .max(30, 'Слишком длинная почта'),
            cite: Yup.string()
                .max(60, 'Слишком длинный адрес сайта'),
            post_title: Yup.string()
                .max(50, 'Слишком длинный заголовок'),
            post_text: Yup.string()
                .max(3000, 'Слишком длинный адрес сайта'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            saveProfile()
        },
    })

    const saveProfile = () => {
        const formData = new FormData(document.getElementById('profile_settings_form'))
        $.ajax({
            type: 'post',
            url: '../api/edit-profile',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                window.location.replace("http://"+window.location.host)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    return (
        <form className="simple-form" onSubmit={formik.handleSubmit}
              id="profile_settings_form" encType="multipart/form-data" method="post">
            <CSRFToken/>
            <div className="form-group">
                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                <div className="inputWrapper">
                    <label><span>Имя</span></label>
                    <input name="name" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange}
                           value={formik.values.name}/>
                </div>
                <ColorInput_wrap setColor={setColor} selectedColor={selectedColor}/>
                <FileInputWrapper label="Аватар"
                                  src={profile_data.avatar}
                                  field="avatar"/>
                <FileInputWrapper label="Обложка"
                                  src={profile_data.cover}
                                  field="cover"/>
                <div className="settings-line"></div>
            </div>
            <div className="form-group">
                <h3>Информация</h3>
                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                {formik.errors.city ? <p>{formik.errors.city}</p> : null}
                {formik.errors.cite ? <p>{formik.errors.cite}</p> : null}
                <div className="inputWrapper">
                    <label><span>Почта</span></label>
                    <input name="email" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange}
                           value={formik.values.email}/>
                </div>
                <div className="inputWrapper">
                    <label><span>Город</span></label>
                    <input type="text" name="city" onChange={formik.handleChange} value={formik.values.city}
                           placeholder=" = ^ᴗ^ = "/>
                </div>
                <div className="inputWrapper">
                    <label><span>Сайт</span></label>
                    <input type="text" name="cite" onChange={formik.handleChange} value={formik.values.cite}
                           placeholder=" = ^ᴗ^ = "/>
                </div>
                <div className="settings-line"></div>
            </div>
            <div className="form-group">
                {formik.errors.post_title ? <p>{formik.errors.post_title}</p> : null}
                {formik.errors.post_text ? <p>{formik.errors.post_text}</p> : null}
                <h3>Пост в профиле</h3>
                <div className="inputWrapper">
                    <label><span>Заголовок</span></label>
                    <input name="post_title" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange}
                           value={formik.values.post_title}/>
                </div>
                <div className="inputWrapper">
                    <label><span>Текст</span></label>
                    <textarea name="post_text" onChange={formik.handleChange} value={formik.values.post_text}
                              className="post-textarea" placeholder=" = ^ᴗ^ = "></textarea>
                </div>
                <FileInputWrapper label="Картинка"
                                  src={profile_data.post_image}
                                  field="post_image"/>
            </div>
            <button className="send-btn" type="submit">Сохранить</button>
        </form>
    )
}

export default ProfileForm