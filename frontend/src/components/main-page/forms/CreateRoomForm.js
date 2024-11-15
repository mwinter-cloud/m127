import React, {useEffect, useState, useRef} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import ColorInput_wrap from "../../../store/wraps/forms/ColorInput_wrap"
import FileInputWrapper from "../../common-elements/form/elements/wrappers/FileInputWrapper"
import InputWrapper from "../../common-elements/form/elements/wrappers/InputWrapper"
import {TextEditor} from "../../common-elements/form/elements/editor/TextEditor"
import TagFilter from "../../common-elements/form/elements/tag-filter/TagFilter"
import { Navigate } from "react-router-dom"
import ConfirmWindow from "../../common-elements/windows/ConfirmWindow"

const CreateRoomForm = ({room, reloadRoom}) => {
    const [navigate, setNavigate] = useState('disabled')
    const [confirmWindow, setConfirmWindow] = useState('closed')
    const [selectedColor, setColor] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    const [initColor, setInitColor] = useState()
    const [initText, setInitText] = useState()
    const [roomData, setRoomData] = useState({})
	const formRef = useRef(null)
	
    const useMountEffect = () => {
        useEffect(() => {
            if (room) {
                setInitText(room.message)
                setRoomData(room)
                if (room.color) {
                    setInitColor(room.color)
                }
                formik.setFieldValue('name', room.name)
                formik.setFieldValue('message', room.message)
            }
        }, [room])
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
        const form = formRef.current
        if (form.hasAttribute('data-submitting')) return
        form.setAttribute('data-submitting', "")
        const formData = new FormData(form)
        if (selectedColor) {
            formData.append('color', selectedColor)
        }
        if (room) {
            formData.append('room_id', room.id)
        }
        selectedTags.map(tag => {
            formData.append('tags[]', tag)
        })
        $.ajax({
            type: 'post',
            url: room ? '/api/edit-room' : '/api/create-room',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.room) {
                    reloadRoom(data.room)
                } else {
                    setNavigate("/room/" + data.room_id)
                }
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }
    const setText = (text) => {
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
            data: {room_id: room.id},
            success: function () {
                setNavigate("../")
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    const upConfirmWindow = () => {
        setConfirmWindow(confirmWindow == 'opened' ? 'closed' : 'opened')
    }

    return (
        <>
            {confirmWindow == 'opened' && <ConfirmWindow confirmFunc={deleteRoom} close={upConfirmWindow}/>}
            <form className="simple-form" onSubmit={formik.handleSubmit} ref={formRef}
                  encType="multipart/form-data" method="post">
                {navigate !== 'disabled' && (<Navigate to={navigate} />)}
                <InputWrapper label="Название"
                              handleChange={formik.handleChange}
                              value={formik.values.name}
                              field="name"/>
                <input name="message" type="hidden" onChange={formik.handleChange} value={formik.values.message}/>
                <TextEditor setText={setText} textValue={formik.values.message} initialText={initText} />
                <FileInputWrapper label="Обложка"
                                  src={roomData.cover}
                                  field="cover"/>
                <ColorInput_wrap setColor={setColor} initColor={initColor}/>
                <div className="inputWrapper">
                    <label>Теги</label>
                    <TagFilter items="rooms" onTagSelect={onTagSelect} type="form"
                               tags={room ? room.tags : null}/>
                </div>
                {room ? (
                    <span className="simple-btn" onClick={upConfirmWindow}><i
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