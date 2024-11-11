import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {TextEditor} from "../../common-elements/form/elements/editor/TextEditor"
import CSRFToken from "../../common-elements/form/CSRFToken"
import {specialtagsinnotification} from "../../common-elements/form/elements/editor/TextEditor"
import MediaQuery from 'react-responsive'

export const AnswerForm = ({text, sendSocketEvent, savers, room_name, addNotification, setAnswer, id}) => {
    const set_text = (text) => {
        //записываем текст в поле из редактора
        formik.setFieldValue('text', text)
    }
	
    const formik = useFormik({
        initialValues: {
            text: text ? text : "",
        },
        validationSchema: Yup.object({
            text: Yup.string()
                .required(),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const form = document.getElementById('answer_form')
            if (form.hasAttribute('data-submitting')) return
            form.setAttribute('data-submitting',"")
            const send_socket = (data) => {
                sendSocketEvent(data)
            }
            const clear_textarea = () => {
                form.removeAttribute('data-submitting')
                formik.setFieldValue('text', "")
            }
            const add_notification_for_savers = (data) => {
                let sender = (({id, name, avatar}) => ({id, name, avatar}))(data.author)
                let recipients = savers.filter((el) => {
                    return el !== data.author.id
                })
                let notification_data = {
                    sender: sender,
                    recipients: recipients,
                    notif_type: 2,
                    text: room_name,
                    object: data.id,
                }
                if(recipients.length!=0) {
                    addNotification(notification_data)
                }
            }
            const add_notification = (data) => {
                //узнаем, есть ли в тексте сообщения обращение
                let regex = new RegExp('&lt;appeal to=([0-9]+) color=([a-z-]*) answer=([0-9]+)&gt;([^`]+?)&lt;/appeal&gt;', 'g')
                let text = formik.values.text
                let test_to_appeal = regex.test(text)
                if (test_to_appeal) {
                    // если есть, извлечем id профиля участников, к которым обратились
                    const id_list = text.match(/to=([0-9]+)/g);
                    id_list.forEach((id) => {
                        let user_id = Number(id.match(/([0-9]+)/g))
                        let sender = (({id, name, avatar}) => ({id, name, avatar}))(data.author)
                        let notification_data = {
                            sender: sender,
                            recipients: [user_id],
                            notif_type: 1,
                            text: specialtagsinnotification(formik.values.text).substring(0, 99),
                            object: data.id,
                        }
                        addNotification(notification_data)
                    })
                } else {
                    add_notification_for_savers(data)
                }
            }
            const url = text ? ("../api/edit-answer") : ("../api/create-answer")
            $.ajax({
                type: 'post',
                url: url,
                cache: false,
                data: {text: values.text, id: id},
                success: function (data) {
                    clear_textarea()
                    if (text) {
                        setAnswer(data.text)
                    } else {
                        send_socket(data)
                        add_notification(data)
                    }
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
        },
    })
	
    return (
        <form className="answer-textarea" id="answer_form" onSubmit={formik.handleSubmit}>
            <CSRFToken/>
            <input name="text" type="hidden" onChange={formik.handleChange} value={formik.values.text} />
            <TextEditor setText={set_text} textValue={formik.values.text} initialText={formik.values.text} />
            <button className='send-btn' type="submit">
				<i className="el-icon-s-promotion"></i>
                <div type="submit" className="progress-btn-line"></div>
            </button>
        </form>
    )
}
