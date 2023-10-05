import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"
import { Navigate } from "react-router-dom"
import IllustrationInputWrapper from "./elements/IllustrationInputWrapper"

const IllustrationsForm = (props) => {
    const [navigate, setNavigate] = useState(0)
    const formik = useFormik({
        initialValues: {
            L: "",
        },
        validationSchema: Yup.object({
            L: Yup.string()
                .max(300, ''),
            IN: Yup.string()
                .max(300, ''),
            DA: Yup.string()
                .max(300, ''),
            DC: Yup.string()
                .max(300, ''),
            EP: Yup.string()
                .max(300, ''),
            AP: Yup.string()
                .max(300, ''),
            GC: Yup.string()
                .max(300, ''),
            RP: Yup.string()
                .max(300, ''),
            LP: Yup.string()
                .max(300, ''),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            $.ajax({
                type: 'post',
                url: '../api/illustrations-edit',
                data: values,
                success: function (data) {
                    props.set_illustrations(data.illustrations)
                    data.illustrations.map(illustration => {
                        document.body.style.setProperty("--" + illustration.type, "url(" + illustration.text + ")")
                    })
                    setNavigate(data.result)
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
        },
    })
    const useMountEffect = () => {
        useEffect(() => {
            props.illustrations.map(illustration => {
                formik.setFieldValue(illustration.type, illustration.text)
            })
        }, [props])
    }
    useMountEffect()

    return (
        <>
            {navigate?(<Navigate to="/" replace={true} />):null}
            <form className="admin-panel-form simple-form" onSubmit={formik.handleSubmit}>
                <CSRFToken/>
                {props.illustrations.map((illustration, index) => {
                    return (
                        <IllustrationInputWrapper key={index} name={illustration.type}
                                                  value={formik.values[illustration.type]}
                                                  changeEvent={formik.handleChange}/>
                    )
                })}
                <footer>
                    <button type="submit">Сохранить</button>
                </footer>
            </form>
        </>
    )
}

export default IllustrationsForm
