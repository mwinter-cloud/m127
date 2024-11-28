import React, {useEffect, useState, useRef} from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import CSRFToken from "../../../common-elements/form/CSRFToken"
import {Navigate} from "react-router-dom"
import TextareaWrapper from "../../../common-elements/form/elements/wrappers/TextareaWrapper"
import axios from "axios"

const ColorAndTextForm = (props) => {
    const [navigate, setNavigate] = useState('disabled')
    const [form_sending_status, setFormSendingStatus] = useState('undefined')
	const formRef = useRef(null)
	
    const formik = useFormik({
        initialValues: {
            AN: "",
            RL: "",
            SD: "",
            CT: "",
        },
        validationSchema: Yup.object({
            SO: Yup.string()
                .max(150, 'Код для цвета выбранного варианта ответа в опросе не должен превышать 150 символов.'),
            VB: Yup.string()
                .max(150, 'Код для цвета кнопки в опросе не должен превышать 150 символов.'),
            EMC: Yup.string()
                .max(150, 'Код для цветной полосы ранним утром не должен превышать 150 символов.'),
            MC: Yup.string()
                .max(150, 'Код для цветной полосы утром не должен превышать 150 символов.'),
            DAC: Yup.string()
                .max(150, 'Код для цветной полосы ранним днём не должен превышать 150 символов.'),
            EC: Yup.string()
                .max(150, 'Код для цветной полосы ранним вечером не должен превышать 150 символов.'),
            AN: Yup.string()
                .max(300, 'Текст объявления не должен превышать 300 символов.'),
            red: Yup.string()
                .max(150, 'Код для красного цвета не должен превышать 150 символов.'),
            orange: Yup.string()
                .max(150, 'Код для оранжевого цвета не должен превышать 150 символов.'),
            green: Yup.string()
                .max(150, 'Код для зелёного цвета не должен превышать 150 символов.'),
            d_blue: Yup.string()
                .max(150, 'Код для тёмно-синего цвета не должен превышать 150 символов.'),
            blue: Yup.string()
                .max(150, 'Код для синего цвета не должен превышать 150 символов.'),
            yellow: Yup.string()
                .max(150, 'Код для жёлтого цвета не должен превышать 150 символов.'),
            pink: Yup.string()
                .max(150, 'Код для розового цвета не должен превышать 150 символов.'),
            cherry: Yup.string()
                .max(150, 'Код для вишнёвого цвета не должен превышать 150 символов.'),
            violet: Yup.string()
                .max(150, 'Код для фиолетового цвета не должен превышать 150 символов.'),
            SD: Yup.string()
                .max(1000, 'Описание сайта не должно превышать 1000 символов.'),
            RL: Yup.string()
                .max(1000, 'Текст правил не должен превышать 1000 символов.'),
            CT: Yup.string()
                .max(1000, 'Текст с контактами не должен превышать 1000 символов.'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
			const formData = formRef.current
			axios.post(`${window.location.origin}/api/color-and-text-edit`, formData, {
				onDownloadProgress: () => {
					setFormSendingStatus('loading')
				}
			}).then(({data}) => {
				props.set_colors(data.colors)
				data.colors.map(color => {
					document.body.style.setProperty("--" + color.type, color.text)
				})
				if(data.result) {
					setNavigate('active')
				}
				setFormSendingStatus('success')
			}).catch((data) => {
				setFormSendingStatus('error')
			})
        },
    })
    const useMountEffect = () => {
        useEffect(() => {
            props.colors.map(color => {
                formik.setFieldValue(color.type, color.text)
            })
            formik.setFieldValue("AN", props.AN)
            formik.setFieldValue("RL", props.RL)
            formik.setFieldValue("SD", props.SD)
            formik.setFieldValue("CT", props.CT)
        }, [props])
    }
    useMountEffect()

    return (
        <form className="admin-panel-form simple-form" onSubmit={formik.handleSubmit} ref={formRef}>
            {navigate == 'active' ? (<Navigate to="/" replace={true}/>) : null}
            <CSRFToken/>
            <div className="form-group">
                <h3>Объявление</h3>
                <p>Расположено слева от карусели на главной странице</p>
                <div className="fullInputWrapper inputWrapper">
                    <input name="AN" value={formik.values.AN} onChange={formik.handleChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label>Цвет сайта</label>
                    <input name="SC" value={formik.values.SC} onChange={formik.handleChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label>Название комнаты</label>
                    <input name="RN" value={formik.values.RN} onChange={formik.handleChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label className="">Блок с полезной информацией на главной странице</label>
                    <input name="AB" value={formik.values.AB} onChange={formik.handleChange}/>
                </div>
                <span className="ref">(Справа от карусели)</span>
            </div>

            <div className="form-group">
                <div className="inputWrapper">
                    <label>Выбранный вариант ответа</label>
                    <input name="SO" value={formik.values.SO} onChange={formik.handleChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="inputWrapper">
                    <label>Кнопка отправки голоса в опросе</label>
                    <input name="VB" value={formik.values.VB} onChange={formik.handleChange}/>
                </div>
            </div>
            <div className="form-group">
                <h3>Полоса вверху страницы</h3>
                <div className="header-colorline-example">
                    <div className="inputWrapper">
                        <label>Раннее утро</label>
                        <div className="colorline-input-block">
                            <input name="EMC" value={formik.values.EMC} onChange={formik.handleChange}/>
                            <div className="colorline" style={{background: formik.values.EMC}}></div>
                        </div>
                    </div>
                </div>
                <div className="header-colorline-example">
                    <div className="inputWrapper">
                        <label>Утро</label>
                        <div className="colorline-input-block">
                            <input name="MC" value={formik.values.MC} onChange={formik.handleChange}/>
                            <div className="colorline" style={{background: formik.values.MC}}></div>
                        </div>
                    </div>
                </div>
                <div className="header-colorline-example">
                    <div className="inputWrapper">
                        <label>День</label>
                        <div className="colorline-input-block">
                            <input name="DAC" value={formik.values.DAC} onChange={formik.handleChange}/>
                            <div className="colorline" style={{background: formik.values.DAC}}></div>
                        </div>
                    </div>
                </div>
                <div className="header-colorline-example">
                    <div className="inputWrapper">
                        <label>Вечер/ночь</label>
                        <div className="colorline-input-block">
                            <input name="EC" value={formik.values.EC} onChange={formik.handleChange}/>
                            <div className="colorline" style={{background: formik.values.EC}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <h3>Цвета в палитре на выбор</h3>
                <div className="color-inputs">
                    {props.colors.map((color, index) => {
                        if (color.is_palette) {
                            return (
                                <div className="colorInputWrapper" key={index}
                                     style={{background: formik.values[color.type]}}>
                                    <label>{color.type}</label>
                                    <input name={color.type} value={formik.values[color.type]}
                                           onChange={formik.handleChange}/>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="form-group">
                <h3>Страница соглашения</h3>
                <TextareaWrapper label="Правила"
                                 handleChange={formik.handleChange}
                                 value={formik.values.RL}
                                 field="RL"/>
                <TextareaWrapper label="Описание сайта"
                                 handleChange={formik.handleChange}
                                 value={formik.values.SD}
                                 field="SD"/>
                <TextareaWrapper label="Контактные данные"
                                 handleChange={formik.handleChange}
                                 value={formik.values.CT}
                                 field="CT"/>
            </div>
            <div className="error-block">
                {formik.errors.OS ? <p>{formik.errors.OS}</p> : null}
                {formik.errors.VB ? <p>{formik.errors.VB}</p> : null}
                {formik.errors.EMC ? <p>{formik.errors.EMC}</p> : null}
                {formik.errors.MC ? <p>{formik.errors.MC}</p> : null}
                {formik.errors.DAC ? <p>{formik.errors.DAC}</p> : null}
                {formik.errors.EC ? <p>{formik.errors.EC}</p> : null}
                {formik.errors.AN ? <p>{formik.errors.AN}</p> : null}
                {formik.errors.red ? <p>{formik.errors.red}</p> : null}
                {formik.errors.orange ? <p>{formik.errors.orange}</p> : null}
                {formik.errors.green ? <p>{formik.errors.green}</p> : null}
                {formik.errors.d_blue ? <p>{formik.errors.d_blue}</p> : null}
                {formik.errors.blue ? <p>{formik.errors.blue}</p> : null}
                {formik.errors.yellow ? <p>{formik.errors.yellow}</p> : null}
                {formik.errors.pink ? <p>{formik.errors.pink}</p> : null}
                {formik.errors.cherry ? <p>{formik.errors.cherry}</p> : null}
                {formik.errors.violet ? <p>{formik.errors.violet}</p> : null}
                {formik.errors.cherry ? <p>{formik.errors.cherry}</p> : null}
                {formik.errors.SD ? <p>{formik.errors.SD}</p> : null}
                {formik.errors.RL ? <p>{formik.errors.RL}</p> : null}
                {formik.errors.CT ? <p>{formik.errors.CT}</p> : null}
            </div>
            <footer>
                <button className="send-btn" type="submit">Сохранить</button>
				{form_sending_status == 'loading' && (<div className="loading-icon"><i className="el-icon-loading"></i></div>)}
            </footer>
        </form>
    )
}

export default ColorAndTextForm
