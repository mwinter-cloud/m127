import React, {useEffect} from 'react'
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import {useFormik} from "formik"
import * as Yup from "yup"
import FileInputWrapper from "../../../common-elements/form/elements/wrappers/FileInputWrapper"

const GuideImageForm = (props) => {
    const formik = useFormik({
        initialValues: {
            description: '',
        },
        validationSchema: Yup.object({
            description: Yup.string()
                .max(150, 'Слишком длинное описание! Оно не должно превышать 150 символов.')
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            saveImage()
        },
    })
    const useMountEffect = () => {
		useEffect(() => {
            formik.setFieldValue('article_id', props.article_id)
		},[props])
	}
    useMountEffect()

    const saveImage = () => {
        const formData = new FormData(document.getElementById('guide_image_form'))
        formData.append('description', formik.values.description)
        formData.append('article', formik.values.article_id)
        $.ajax({
            type: 'post',
            url: '/api/create-article-image',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                props.addIllustration(data)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    return (
        <form className="simple-form" onSubmit={formik.handleSubmit} id="guide_image_form"
              encType="multipart/form-data" method="post">
            <FileInputWrapper label="Файл"
                              src=""
                              field="file"/>
            <InputWrapper label="Описание"
                          handleChange={formik.handleChange}
                          value={formik.values.name}
                          field="description"/>
            <button className='send-btn' type="submit">Добавить</button>
        </form>
    )
}

export default GuideImageForm
