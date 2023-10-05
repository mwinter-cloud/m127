import React from 'react'
import FileInputWrapper from "../../../common-elements/form/elements/wrappers/FileInputWrapper"
import InputWrapper from "../../../common-elements/form/elements/wrappers/InputWrapper"
import {useFormik} from "formik"
import * as Yup from "yup"

const AddSmileForm = (props) => {
const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            L: Yup.string()
                .max(30, ''),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            addSmile()
        },
    })
    const addSmile = () => {
        const formData = new FormData(document.getElementById('smile_form'))
        $.ajax({
            type: 'post',
            url: '../api/add-smile',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                props.addItem(data)
                document.getElementById('file_img').setAttribute('src',"")
                document.getElementById('name_input').value = " "
                document.getElementById('file_img_input').value = " "
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}
              id="smile_form" encType="multipart/form-data" method="post">
            <InputWrapper label="Название"
                          handleChange={formik.handleChange}
                          value={formik.values.name}
                          field="name"/>
            <div className="addSmileInputWrapper">
                <FileInputWrapper label="Файл"
                                  src=""
                                  field="file"/>
                <button type="submit">
                    <i className="el-icon-download text-btn send-file"></i>
                </button>
            </div>
        </form>
    )
}

export default AddSmileForm