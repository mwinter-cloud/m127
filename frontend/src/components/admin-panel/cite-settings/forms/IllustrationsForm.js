import React, {useEffect, useState} from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import CSRFToken from "../../../common-elements/form/CSRFToken"
import IllustrationInputWrapper from "./elements/IllustrationInputWrapper"
import {Navigate} from "react-router-dom"

const IllustrationsForm = (props) => {
    const [navigate, setNavigate] = useState('disabled')
    const formik = useFormik({
        initialValues: {
            L: "",
        },
        validationSchema: Yup.object({
            L: Yup.string()
                .max(300, 'Адрес для поля логотип слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            IN: Yup.string()
                .max(300, 'Адрес для приглашения слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            DA: Yup.string()
                .max(300, 'Адрес для базовый аватар слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            DC: Yup.string()
                .max(300, 'Адрес для базовая обложка слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            EP: Yup.string()
                .max(300, 'Адрес для поля иллюстрации на странице с ошибкой слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            AP: Yup.string()
                .max(300, 'Адрес для иллюстрации инфо-страницы слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            GC: Yup.string()
                .max(300, 'Адрес для иллюстрации в руководстве слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            RP: Yup.string()
                .max(300, 'Адрес для страницы регистрации слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
            LP: Yup.string()
                .max(300, 'Адрес для страницы входа слишком длинный (превышает 300 символов). Чтобы его сократить, можно воспользоваться сократителем длинных ссылок.'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            $.ajax({
                type: 'post',
                url: '../api/illustrations-edit',
                data: values,
                success: function (res) {
					if (res) {
						setNavigate('active')
					}
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
            {navigate == 'active' && (<Navigate to="/" replace={true} />)}
            <form className="admin-panel-form simple-form" onSubmit={formik.handleSubmit}>
                <CSRFToken/>
                {props.illustrations.map((illustration, index) => {
                    return (
                        <IllustrationInputWrapper key={index} name={illustration.type}
							value={formik.values[illustration.type]}
							changeEvent={formik.handleChange}/>
                    )
                })}
                <div className="error-block">
                    {formik.errors.IN ? <p>{formik.errors.IN}</p> : null}
                    {formik.errors.L ? <p>{formik.errors.L}</p> : null}
                    {formik.errors.DA ? <p>{formik.errors.DA}</p> : null}
                    {formik.errors.DC ? <p>{formik.errors.DC}</p> : null}
                    {formik.errors.EP ? <p>{formik.errors.EP}</p> : null}
                    {formik.errors.AP ? <p>{formik.errors.AP}</p> : null}
                    {formik.errors.GC ? <p>{formik.errors.GC}</p> : null}
                    {formik.errors.RP ? <p>{formik.errors.RP}</p> : null}
                    {formik.errors.LP ? <p>{formik.errors.LP}</p> : null}
                </div>
                <footer>
                    <button className="send-btn" type="submit">Сохранить</button>
                </footer>
            </form>
        </>
    )
}

export default IllustrationsForm
