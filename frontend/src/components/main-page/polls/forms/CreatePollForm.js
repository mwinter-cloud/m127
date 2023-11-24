import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Navigate } from "react-router-dom"
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import TagFilter from "../../../common-elements/form/elements/tag-filter/TagFilter"

const CreatePollForm = (props) => {
    const [navigate, setNavigate] = useState(0)
    const [selectedTags, setSelectedTags] = useState([])

    const formik = useFormik({
        initialValues: {
            question: '',
        },
        validationSchema: Yup.object({
            question: Yup.string()
                .max(250, 'Слишком длинный вопрос')
                .required('Введи вопрос'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const form = document.getElementById('create_poll_form')
            if (form.hasAttribute('data-submitting')) return
            form.setAttribute('data-submitting',"")
            let is_option = 0
            document.querySelectorAll('.option-input').forEach((input) => {
                if (input.value != '') {
                    is_option = 1
                }
            })
            if(is_option!=0) {
                let data = {question: values.question}
                if (props.poll) {
                    data.append('poll_id', props.poll.id)
                }
                selectedTags.map(tag => {
                    data.append('tags[]', tag)
                })
                $.ajax({
                    type: 'post',
                    url: '/api/create-poll',
                    cache: false,
                    data: data,
                    success: function (res) {
                        document.querySelectorAll('.option-form').forEach(function (form, idx, array) {
                            const formOptionsData = new FormData(form)
                            let inp_val = form.querySelector('input').value
                            formOptionsData.append('poll_id', res.poll_id)
                            if (inp_val) {
                                $.ajax({
                                    type: 'post',
                                    url: '/api/add-option',
                                    cache: false,
                                    data: formOptionsData,
                                    processData: false,
                                    contentType: false,
                                    error: function () {
                                        console.log('Вариант с ошибкой')
                                    }
                                })
                                setNavigate(res.poll_id)
                                setTimeout(props.closeWindow(),1000)
                            }
                        })
                        window.location.href = "/poll/"+res.poll_id
                    },
                    error: function (xhr, status, error) {
                        console.log(JSON.parse(xhr.responseText))
                    }
                })
            }
        },
    })

    const onTagSelect = (full_tag_list) => {
        let tag_list = []
        full_tag_list.map(tag => {
            tag_list.push(Number(tag.id))
        })
        setSelectedTags(tag_list)
    }

    const addOption = (e) => {
		let new_form = document.querySelector('.option-form').cloneNode(true)
		let id = new_form.getAttribute('data-id')
        let input = new_form.querySelector('input')
        input.value = ''
		new_form.setAttribute('data-id','0')
        document.querySelector('.option-forms').append(new_form)
    }

    const deleteOption = (e) => {
        let id = e.target.getAttribute('data-id')
        document.getElementById('option_form'+id).classList.add('hide')
        let input = document.getElementById('option_id'+id)
		input.setAttribute('value','')
    }

    return (
        <form className="simple-form" id="create_poll_form" onSubmit={formik.handleSubmit}>
            {navigate?(<Navigate to={"/poll/"+navigate} />):null}
            <InputWrapper label="Название"
                          handleChange={formik.handleChange}
                          value={formik.values.question}
                          field="question"/>
            <h5>Варианты ответа:</h5>
                {(() => {
    				if (!props.poll) {
    					return (
    					<div className="option-forms">
                            <form className="settings-form option-form">
                                <div className="inputWrapper">
                                    <label>Вариант</label>
                                        <input name="text" className="option-input" placeholder=" = ^ᴗ^ = "/>
                                </div>
                            </form>
                            <form className="settings-form option-form">
                                <div className="inputWrapper">
                                    <label>Вариант</label>
                                    <input name="text" className="option-input" placeholder=" = ^ᴗ^ = "/>
                                </div>
                            </form>
                        </div>
    				    )
    				} else {
    					return (
    					<div className="option-forms">
    					    {props.poll.options.map((option,index) => {
    					        return (
    					        <form className="settings-form option-form" id={"option_form"+option.id} data-id={option.id} key={index}>
                                    <div className="inputWrapper">
                                        <label>Вариант</label>
                                            <input name="text" id={"option_id"+option.id} className="option-input" placeholder=" = ^ᴗ^ = "/>
                                        <div className="delete-option-btn"><i onClick={deleteOption} className="el-icon-delete" data-id={option.id} ></i></div>
                                    </div>
                                </form>
    					        )
    					    })}
                        </div>
    				    )
    				}
    			})()}
                <span className="text-btn" onClick={addOption}>добавить вариант</span>
            <div className="inputWrapper">
                <label>Теги</label>
                <TagFilter items="polls" onTagSelect={onTagSelect} type="form"
                           tags={props.poll ? props.poll.tags : null}/>
            </div>
            <div className="error-block">
                {formik.errors.question ? <p>{formik.errors.question}</p> : null}
            </div>
            <button className="send-btn" type="submit">Вперёд</button>
        </form>
    )
}

export default CreatePollForm