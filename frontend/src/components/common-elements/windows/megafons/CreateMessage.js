import React from 'react'
import CSRFToken from "../../form/CSRFToken"
import TextareaWrapper from "../../form/elements/wrappers/TextareaWrapper"
import {useFormik} from "formik"
import * as Yup from "yup"
import "../../../../../static/frontend/images/winter-cticker.png"
import "../../../../../static/frontend/images/fox-and-butterfly.png"
import "../../../../../static/frontend/images/fish.png"
import "../../../../../static/frontend/images/blue-flower.png"
import "../../../../../static/frontend/images/pink-flower.png"
import "../../../../../static/frontend/images/cat.png"
import "../../../../../static/frontend/images/wow.png"

export const CreateMessage = (props) => {
    const formik = useFormik({
        initialValues: {
            text: "",
            style: "colors",
        },
        validationSchema: Yup.object({
            text: Yup.string()
                .required("Введи текст сообщения")
                .max(100, 'Длина текста не должна превышать 100 символов.'),
            style: Yup.string()
                .required("Выбери стиль")
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            if (window.commonSocket != undefined) {
                const event_data = {
                    'author': {name: props.member.profile.name, id: props.member.profile.id},
                    'text': values.text,
                    'style': values.style,
                }
                window.commonSocket.send(JSON.stringify(event_data))
                props.closeWindow()
            }
        },
    })

    const selectType = (e) => {
        const type = e.target.getAttribute('data-type')
        formik.setFieldValue('style', type)
    }

    return (
        <main className="megafons-page megafons-page-info">
            <form className="simple-form" onSubmit={formik.handleSubmit}>
                <CSRFToken/>
                <div className="error-block">
                    {formik.errors.text ? <p>{formik.errors.text}</p> : null}
                    {formik.errors.style ? <p>{formik.errors.style}</p> : null}
                </div>
                <TextareaWrapper label="Сообщение"
                                 handleChange={formik.handleChange}
                                 value={formik.values.text}
                                 field="text"/>
                <div className="inputWrapper">
                    <label><span>Стиль</span></label>
                    <ul className="megafon-image-list">
                        <li className={formik.values.style == 'colors' ? 'active' : null} data-type="colors"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/wow.png"
                                data-type="colors"/>
                        </li>
                        <li className={formik.values.style == 'fish' ? 'active' : null} data-type="fish"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/fish.png"
                                data-type="fish"/>
                        </li>
                        <li className={formik.values.style == 'blue-flower' ? 'active' : null} data-type="blue-flower"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/blue-flower.png"
                                data-type="blue-flower"/>
                        </li>
                        <li className={formik.values.style == 'pink-flower' ? 'active' : null} data-type="pink-flower"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/pink-flower.png"
                                data-type="pink-flower"/>
                        </li>
                    </ul>
                </div>
                <div className="btns info-btns">
                    <div className="btn" data-type="main" onClick={props.setSection}>Вернуться</div>
                    <button type="submit" className="btn">Отправить</button>
                </div>
            </form>
        </main>
    )
}
