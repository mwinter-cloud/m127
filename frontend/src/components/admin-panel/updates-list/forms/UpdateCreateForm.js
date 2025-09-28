import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import CSRFToken from "../../../common-elements/form/CSRFToken"

const UpdateCreateForm = (props) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            type: 'C'
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(90, 'Слишком длинное название')
                .required('Введи название работ'),
            description: Yup.string()
                .max(500, 'Слишком длинное описание')
                .required('Введи описание'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            props.formConfirm(values)
        },
    })

    const useMountEffect = () => {
        useEffect(() => {
            if (props.update) {
                formik.setFieldValue("name", props.update.name)
                formik.setFieldValue("description", props.update.description)
                formik.setFieldValue("id", props.update.id)
            }
        }, [props.update])
    }
    useMountEffect()

    return (
        <form className="simple-form" onSubmit={formik.handleSubmit}>
            <CSRFToken/>
            <p>
                Речь идет об изменениях в коде. Изменения через форму в админ-панели не нужно оформлять,
                они записываются автоматически.
            </p>
            <InputWrapper label="Название"
                          handleChange={formik.handleChange}
                          value={formik.values.name}
                          field="name"/>
            <div className="inputWrapper">
                <label><span>Описание</span></label>
                <textarea name="description" onChange={formik.handleChange} value={formik.values.description}
                          className="post-textarea" placeholder=" = ^ᴗ^ = "></textarea>
            </div>
            <div className="error-block">
                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                {formik.errors.description ? <p>{formik.errors.description}</p> : null}
            </div>
            <button className="send-btn" type="submit">Сохранить</button>
        </form>
    )
}

export default UpdateCreateForm