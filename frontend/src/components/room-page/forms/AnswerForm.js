import React, {useEffect, useState} from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import {TextEditor} from "../../common-elements/form/elements/editor/TextEditor"
import CSRFToken from "../../common-elements/form/CSRFToken"
import {specialtagsinnotification} from "../../common-elements/form/elements/editor/TextEditor"
import MediaQuery from "react-responsive"

export const AnswerForm = ({text, sendSocketEvent, savers, room_name, addNotification, setAnswer, id}) => {
	const [initialTextStatus, setInitialTextStatus] = useState('undefined')
	const [loading, setLoading] = useState('loaded')
	const [error, setError] = useState()
	const [initialId, setInitialId] = useState()
	useEffect(() => {
		if(text) {
			setInitialTextStatus('loaded')
		}
		setInitialId(id)
	}, [])
	
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
                formik.setFieldValue('text', '')
				setError(null)
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
                if(recipients.length != 0) {
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
					if(savers){
						add_notification_for_savers(data)
					}
                }
            }
            const url_type = text !== undefined ? ('edit-answer') : ('create-answer')
			setLoading('loading')
            $.ajax({
                type: 'post',
                url: `${window.location.origin}/api/${url_type}`,
                cache: false,
                data: {text: values.text, id: initialId},
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
					if(JSON.parse(xhr.responseText)['text'] == 'Убедитесь, что это значение содержит не более 10000 символов.') {
						setError('Количество символов ('+values.text.length+') превышает допустимый максимум (10000).')
					} else {
						setError('Отправить сообщение не удалось. Сохраните текст и повторите позже.')
					}
                },
				complete: function() {
					setLoading('loaded')
					form.removeAttribute('data-submitting')
				}
            })
        },
    })
	
    return (
        <form className="answer-textarea" id="answer_form" onSubmit={formik.handleSubmit}>
            <CSRFToken />
            <input name="text" type="hidden" onChange={formik.handleChange} value={formik.values.text} />
            <TextEditor setText={set_text} textValue={formik.values.text} initialText={initialTextStatus} specialId="new_answer_div_editable" />
            <button className='send-btn' type="submit">
				<i className="el-icon-s-promotion"></i>
                <div type="submit" className="progress-btn-line"></div>
            </button>
			{error ? (<p className="error-msg">{error}</p>) : null}
			{loading === 'loading' && <><div className="loading-background"></div><div className="sending-icon"><i className="el-icon-loading"></i></div></>}
        </form>
    )
}