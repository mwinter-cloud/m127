import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import CSRFToken from "../../../common-elements/form/CSRFToken";

const WorkplanCreateForm = (props) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            start: '',
            end: '',
            type: 'C',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(90, 'Слишком длинное название')
                .required('Введи название работ'),
            start: Yup.string()
                .max(30, 'Слишком длинный текст в пункте о начале работ')
                .required('Когда работы начнутся?'),
            end: Yup.string()
                .max(30, 'Слишком длинный текст в пункте об окончании работ')
                .required('Когда работы закончатся?'),
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
            if (props.workplan) {
                formik.setFieldValue("name", props.workplan.name)
                formik.setFieldValue("start", props.workplan.start)
                formik.setFieldValue("end", props.workplan.end)
                formik.setFieldValue("description", props.workplan.description)
                formik.setFieldValue("type", props.workplan.type)
                formik.setFieldValue("id", props.workplan.id)
            }
        }, [props.workplan])
    }
    useMountEffect()

    const selectType = (e) => {
        const type = e.target.getAttribute('data-type')
        formik.setFieldValue("type", type)
    }

    return (
        <form className="simple-form" onSubmit={formik.handleSubmit}>
            <CSRFToken/>
            <InputWrapper label="Название"
                          handleChange={formik.handleChange}
                          value={formik.values.name}
                          field="name"/>
            <div className="inputWrapper">
                <label><span>Тип</span></label>
                <ul className="form-list">
                    <li className={formik.values.type == 'C' ? 'active' : null} onClick={selectType} data-type="C">
                        <i className="el-icon-upload"></i> Изменения в коде
                    </li>
                    <li className={formik.values.type == 'P' ? 'active' : null} onClick={selectType} data-type="P">
                        <i className="el-icon-picture-outline"></i> Изменения через админ-панель
                    </li>
                </ul>
            </div>
            <InputWrapper label="Начало работ"
                          handleChange={formik.handleChange}
                          value={formik.values.start}
                          field="start"/>
            <InputWrapper label="Окончание работ"
                          handleChange={formik.handleChange}
                          value={formik.values.end}
                          field="end"/>
                <div className="inputWrapper">
                    <label><span>Описание</span></label>
                    <textarea name="description" onChange={formik.handleChange} value={formik.values.description}
                              className="post-textarea" placeholder=" = ^ᴗ^ = "></textarea>
                </div>
            <div className="error-block">
                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                {formik.errors.start ? <p>{formik.errors.start}</p> : null}
                {formik.errors.end ? <p>{formik.errors.end}</p> : null}
                {formik.errors.description ? <p>{formik.errors.description}</p> : null}
            </div>
            <button className="send-btn" type="submit">Сохранить</button>
        </form>
    )
}

export default WorkplanCreateForm