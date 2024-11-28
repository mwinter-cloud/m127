import React, {useState, useRef} from "react"
import FileInputWrapper from "../../../common-elements/form/elements/wrappers/FileInputWrapper"
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import {useFormik} from "formik"
import * as Yup from "yup"
import axios from "axios"
import CSRFToken from "../../../common-elements/form/CSRFToken"

const AddSmileForm = ({addItem}) => {
	const [smile_sending_status, setSmileSendingStatus] = useState('undefined')
	const formRef = useRef(null)
	
	const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Введите название.')
                .max(30, '')
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const formData = formRef.current
			axios.post(window.location.origin + '/api/add-smile', formData, {
				onDownloadProgress: () => {
					setSmileSendingStatus('loading')
				}
			}).then(({data}) => {
				addItem(data)
				document.getElementById('file_img').setAttribute('src', '')
				values.name = ''
				document.getElementById('file_img_input').value = ''
				setSmileSendingStatus('success')
			}).catch((data) => {
				setSmileSendingStatus('error')
			})
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} ref={formRef} encType="multipart/form-data" method="post" id="smile_form">
            <CSRFToken />
			{smile_sending_status == 'error' && (<p className="error-msg">При загрузке произошла ошибка. Попробуйте позже.</p>)}
			{smile_sending_status == 'loading' && (<div className="loading-icon"><i className="el-icon-loading"></i></div>)}
            <InputWrapper label="Название" handleChange={formik.handleChange} value={formik.values.name} field="name" />
			{formik.errors.name ? (<p className="error-msg">{formik.errors.name}</p>) : null}
            <div className="addSmileInputWrapper">
                <FileInputWrapper label="Файл" src="" field="file" type="plus" />
                <button type="submit"> <i className="el-icon-download text-btn send-file"></i></button>
            </div>
        </form>
    )
}

export default AddSmileForm