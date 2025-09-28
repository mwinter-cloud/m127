import React, {useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import CSRFToken from "../../../common-elements/form/CSRFToken"

const GuideArticleForm = (props) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            text: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(150, 'Слишком длинное название')
                .required('Введи название'),
            text: Yup.string()
                .max(10000, 'Слишком длинный текст. Он не должен превышать размер в 10000 символов')
                .required('Введи текст'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            props.formConfirm(values)
        },
    })

    const useMountEffect = () => {
        useEffect(() => {
            if (props.article) {
                formik.setFieldValue("name", props.article.name)
                formik.setFieldValue("text", props.article.text)
                formik.setFieldValue("id", props.article.id)
            }
        }, [props.article])
    }
    useMountEffect()

    return (
        <form className="simple-form" onSubmit={formik.handleSubmit}>
            <CSRFToken/>
            <InputWrapper label="Название"
                          handleChange={formik.handleChange}
                          value={formik.values.name}
                          field="name"/>
            <div className="inputWrapper">
                <label><span>Текст</span></label>
                <textarea name="text" onChange={formik.handleChange} value={formik.values.text}
                          className="post-textarea" placeholder=" = ^ᴗ^ = "></textarea>
            </div>
            <div className="error-block">
                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                {formik.errors.text ? <p>{formik.errors.text}</p> : null}
            </div>
            <button className="send-btn" type="submit">Сохранить</button>
        </form>
    )
}

export default GuideArticleForm