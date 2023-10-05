import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"

const CommentForm = (props) => {
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: Yup.object({
            text: Yup.string()
                .required(),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const send_socket = (data) => {
                props.createCommentEvent(data)
            }
            const data = {text: values.text, poll_id: props.poll_id}
            $.ajax({
                type: 'post',
                url: '/api/create-comment',
                cache: false,
                data: data,
                success: function (res) {
                    send_socket(res)
                    document.getElementById('comment_textareadiv').innerHTML = ""
                },
                error: function (xhr) {
                    if (xhr.status == 400) {
                        setErrors(xhr.responseJSON)
                    }
                }
            })
        },
    })
    const set_text = (e) => {
        const text = e.target.innerHTML
        formik.values.text = text
    }
    return (
        <form className="comment-textarea" onSubmit={formik.handleSubmit}>
            <CSRFToken/>
            <div className="textarea-block">
                <div className="smile-btn" onClick={props.setSmilesBlock}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1656/1656373.png" className="btn-icon"/>
                </div>
                <textarea name="text" onChange={formik.handleChange} value={formik.values.text}></textarea>
                <div className="comment-textarea-div-wrap">
                    <div contentEditable id="comment_textareadiv" className="comment-textarea-div" onInput={set_text}></div>
                </div>
            </div>
            <button type="submit"><i className="el-icon-s-promotion"></i></button>
        </form>
    )
}

export default CommentForm