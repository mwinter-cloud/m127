import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextEditor from "../../common-elements/form/elements/editor/TextEditor"
import CSRFToken from "../../common-elements/form/CSRFToken"
import {specialtagsinnotification} from "../../common-elements/form/elements/editor/TextEditor"

const AnswerForm = (props) => {
    const formik = useFormik({
        initialValues: {
            text: props.text ? props.text : "",
        },
        validationSchema: Yup.object({
            text: Yup.string()
                .required(),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const send_socket = (data) => {
                props.sendSocketEvent(data)
            }
            const clear_textarea = () => {
                document.getElementById(props.form_name + "_div_editable").innerHTML = ""
                formik.setFieldValue('text', "")
            }
            const add_notification_for_savers = (data) => {
                let sender = (({id, name, avatar}) => ({id, name, avatar}))(data.author)
                let recipients = props.savers.filter((el) => {
                    return el !== data.author.id
                })
                let notification_data = {
                    sender: sender,
                    recipients: recipients,
                    notif_type: 2,
                    text: props.room_name,
                    object: data.id,
                }
                if(recipients.length!=0) {
                    props.addNotification(notification_data)
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
                            object: data.object,
                        }
                        console.log(notification_data)
                        props.addNotification(notification_data)
                    })
                } else {
                    add_notification_for_savers(data)
                }
            }
            const url = props.text ? ("../api/edit-answer") : ("../api/create-answer")
            $.ajax({
                type: 'post',
                url: url,
                cache: false,
                data: {text: values.text, id: props.id},
                success: function (data) {
                    clear_textarea()
                    if (props.text) {
                        props.setAnswer(data.text)
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
    const useMountEffect = () => {
        useEffect(() => {
            if (props.text) {
                document.getElementById(props.form_name + "_div_editable").innerHTML = formik.values.text
            }
        }, [props.text])
    }
    const set_text = (text) => {
        //записываем текст в поле из редактора
        formik.setFieldValue('text', text)
    }
    useMountEffect()
    return (
        <form className="answer-textarea" onSubmit={formik.handleSubmit}>
            <CSRFToken/>
            <input name="text" type="hidden" onChange={formik.handleChange} value={formik.values.text}/>
            <TextEditor setText={set_text} text_value={formik.values.text} form_name={props.form_name}/>
            <button className='send-btn' type="submit">Отправить
                <div type="submit" className="progress-btn-line"></div>
            </button>
        </form>
    )
}

export default AnswerForm
