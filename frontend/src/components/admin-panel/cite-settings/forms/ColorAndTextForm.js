import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"
import { Navigate } from "react-router-dom"
import axios from "axios"
import TextareaWrapper from "../../../common-elements/form/elements/wrappers/TextareaWrapper"

const ColorAndTextForm = (props) => {
    const [navigate, setNavigate] = useState(0)
    const formik = useFormik({
        initialValues: {
            AN: "",
            RL: "",
            SD: "",
            CT: "",
        },
        validationSchema: Yup.object({
            OS: Yup.string()
                .max(150, ''),
            VB: Yup.string()
                .max(150, ''),
            EMC: Yup.string()
                .max(150, ''),
            MC: Yup.string()
                .max(150, ''),
            DAC: Yup.string()
                .max(150, ''),
            EC: Yup.string()
                .max(150, ''),
            AN: Yup.string()
                .max(150, ''),
            red: Yup.string()
                .max(150, ''),
            orange: Yup.string()
                .max(150, ''),
            green: Yup.string()
                .max(150, ''),
            d_blue: Yup.string()
                .max(150, ''),
            blue: Yup.string()
                .max(150, ''),
            yellow: Yup.string()
                .max(150, ''),
            pink: Yup.string()
                .max(150, ''),
            cherry: Yup.string()
                .max(150, ''),
            violet: Yup.string()
                .max(150, ''),
            SD: Yup.string()
                .max(500, ''),
            RL: Yup.string()
                .max(500, ''),
            CT: Yup.string()
                .max(500, ''),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            $.ajax({
                type: 'post',
                url: '../api/color-and-text-edit',
                data: values,
                success: function (data) {
                    props.set_colors(data.colors)
                    data.colors.map(color => {
                        document.body.style.setProperty("--" + color.type, color.text)
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
        <form className="admin-panel-form simple-form" onSubmit={formik.handleSubmit}>
            {navigate ? (<Navigate to="/" replace={true}/>) : null}
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
            <footer>
                <button className="send-btn" type="submit">Сохранить</button>
            </footer>
        </form>
    )
}

export default ColorAndTextForm
