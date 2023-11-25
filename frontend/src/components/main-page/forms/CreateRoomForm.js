import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ColorInput_wrap from "../../../store/wraps/forms/ColorInput_wrap"
import FileInputWrapper from "../../common-elements/form/elements/wrappers/FileInputWrapper"
import InputWrapper from "../../common-elements/form/elements/wrappers/InputWrapper"
import TextEditor from "../../common-elements/form/elements/editor/TextEditor"
import TagFilter from "../../common-elements/form/elements/tag-filter/TagFilter"
import { Navigate } from "react-router-dom"
import ConfirmWindow from "../../common-elements/windows/ConfirmWindow"

const CreateRoomForm = (props) => {
    const [navigate, setNavigate] = useState(0)
    const [confirm_window, setConfirmWindow] = useState(0)
    const [selectedColor, setColor] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    const [initColor, setInitColor] = useState()
    const [roomData, setRoomData] = useState({})
    const useMountEffect = () => {
        useEffect(() => {
            if (props.room) {
                document.getElementById('create_room_form_div_editable').innerHTML = props.room.message
                setRoomData(props.room)
                if (props.room.color) {
                    setInitColor(props.room.color)
                }
                formik.setFieldValue('name', props.room.name)
                formik.setFieldValue('message', props.room.message)
            }
        }, [props.room])
    }
    useMountEffect()
    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(100, 'Слишком длинное название')
                .required('Введи название'),
            message: Yup.string()
                .min(100, 'Слишком короткий текст. Число символов должно превышать 100.')
                .required('Введи текст'),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            formConfirm()
        },
    })

    const formConfirm = () => {
        const form = document.getElementById('create_room_form')
        if (form.hasAttribute('data-submitting')) return
        form.setAttribute('data-submitting', "")
        const formData = new FormData(form)
        if (selectedColor) {
            formData.append('color', selectedColor)
        }
        if (props.room) {
            formData.append('room_id', props.room.id)
        }
        selectedTags.map(tag => {
            formData.append('tags[]', tag)
        })
        const reloadRoom = (data) => {
            props.reloadRoom(data)
        }
        $.ajax({
            type: 'post',
            url: props.room ? '/api/edit-room' : '/api/create-room',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if (props.room) {
                    reloadRoom(data)
                } else {
                    setNavigate("/room/" + data.room_id)
                }
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }
    const set_text = (text) => {
        //записываем текст в поле из редактора
        formik.setFieldValue('message', text)
    }

    const onTagSelect = (full_tag_list) => {
        let tag_list = []
        full_tag_list.map(tag => {
            tag_list.push(Number(tag.id))
        })
        setSelectedTags(tag_list)
    }

    const deleteRoom = () => {
        $.ajax({
            type: 'post',
            url: '/api/delete-room',
            cache: false,
            data: {room_id: props.room.id},
            success: function () {
                setNavigate("../")
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    const openConfirmWindow = () => {
        setConfirmWindow(confirm_window ? 0 : 1)
    }

    return (
        <>
            {confirm_window ? (<ConfirmWindow confirm_function={deleteRoom} close={openConfirmWindow}/>) : null}
            <form className="simple-form" id="create_room_form" onSubmit={formik.handleSubmit}
                  encType="multipart/form-data" method="post">
                {navigate ? (<Navigate to={navigate}/>) : null}
                <InputWrapper label="Название"
                              handleChange={formik.handleChange}
                              value={formik.values.name}
                              field="name"/>
                <input name="message" type="hidden" onChange={formik.handleChange} value={formik.values.message}/>
                <TextEditor setText={set_text} text_value={formik.values.message} form_name="create_room_form"/>
                <FileInputWrapper label="Обложка"
                                  src={roomData.cover}
                                  field="cover"/>
                <ColorInput_wrap setColor={setColor} initColor={initColor}/>
                <div className="inputWrapper">
                    <label>Теги</label>
                    <TagFilter items="rooms" onTagSelect={onTagSelect} type="form"
                               tags={props.room ? props.room.tags : null}/>
                </div>
                {props.room ? (
                    <span className="text-btn" onClick={openConfirmWindow}><i
                        className="el-icon-delete"></i> Удалить</span>
                ) : null}
                <div className="error-block">
                    {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                    {formik.errors.message ? <p>{formik.errors.message}</p> : null}
                </div>
                <button className="send-btn" type="submit">Вперёд</button>
            </form>
        </>
    )
}

export default CreateRoomForm