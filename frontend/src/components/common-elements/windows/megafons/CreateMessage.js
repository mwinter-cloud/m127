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

const CreateMessage = (props) => {
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
                                src="https://3.downloader.disk.yandex.ru/preview/b5599b05776754f802eb5dc52d62e8feb56cdc01f62b61162b8a1ec7565c44dc/inf/O_wwQdZwr5PCjKrl8F3UxPmsIXXX9TqQY4lcCnWKwq4ww5tYDFw7NkgzU0SJBOihy9kvj87OviPM6-PVKEFX3g%3D%3D?uid=1484373914&filename=wow.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=1484373914&tknv=v2&size=1297x648"
                                data-type="colors"/>
                        </li>
                        <li className={formik.values.style == 'summer' ? 'active' : null} data-type="summer"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/fox-and-butterfly.png"
                                data-type="summer"/>
                        </li>
                        <li className={formik.values.style == 'winter' ? 'active' : null} data-type="winter"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/winter-cticker.png"
                                data-type="winter"/>
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
                        <li className={formik.values.style == 'cat' ? 'active' : null} data-type="cat"
                            onClick={selectType}>
                            <img
                                src="../../../../../static/frontend/images/cat.png"
                                data-type="cat"/>
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

export default CreateMessage
