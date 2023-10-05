import React, {useState} from 'react'
import CSRFToken from "../../common-elements/form/CSRFToken"
import FileInputWrapper from "../../common-elements/form/elements/wrappers/FileInputWrapper"
import {Navigate} from "react-router-dom"

const BannerRoomForm = (props) => {
    const [type, setType] = useState('carousel') // type = 1 carousel, и = 2 list
    const [navigate, setNavigate] = useState(0)

    const saveRoom = (e) => {
        e.preventDefault()
        const formData = new FormData(document.getElementById('main_room_form'))
        formData.append('room_id', props.room_id)
        let type_int = (type=='carousel'?1:2)
        formData.append('type', type_int)
        $.ajax({
            type: 'post',
            url: '../api/save-main-room',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                setNavigate(1)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    const selectType = (e) => {
        const type = e.target.getAttribute('data-type')
        setType(type)
    }

    return (
        <form className="simple-form" onSubmit={saveRoom} id="main_room_form"
              encType="multipart/form-data" method="post">
            {navigate?(<Navigate to="../../" />):null}
            <CSRFToken/>
            <div className="inputWrapper">
                <label><span>Тип записи</span></label>
                <ul className="form-list">
                    <li className={type=='carousel'?'active':null} onClick={selectType} data-type="carousel">
                        <i className="el-icon-files"></i> Карусель
                    </li>
                    <li className={type=='list'?'active':null} onClick={selectType} data-type="list">
                        <i className="el-icon-menu"></i> Список под каруселью
                    </li>
                </ul>
            </div>
            <FileInputWrapper label="Обложка"
                              src=""
                              field="cover"/>
            <button className='send-btn' type="submit">Сохранить</button>
        </form>
    )
}

export default BannerRoomForm
