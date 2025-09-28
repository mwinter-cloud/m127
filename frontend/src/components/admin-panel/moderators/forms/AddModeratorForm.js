import React, {useState} from 'react'
import AddedModeratorsBlock from "../elements/aside/AddedModeratorsBlock"
import remove_array_item from "../../../../special-functions/remove-array-item"
import {useFormik} from "formik"
import * as Yup from "yup"

const AddModeratorForm = (props) => {
    const [moderators, setModerators] = useState([])
    const [error, setError] = useState([])
    const formik = useFormik({
        initialValues: {
            id: "",
        },
        validationSchema: Yup.object({
            id: Yup.string()
                .required(),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            const add_moderator = (data) => {
                setModerators(moderators.concat(data))
            }
            $.ajax({
                type: 'post',
                url: "../api/add-moderator",
                cache: false,
                data: {id: values.id},
                success: function (data) {
                    if(data.result==1) {
                        add_moderator(data.profile)
                    } else if(data.result==2) {
                        setError('Участник с id '+values.id+' уже является модератором.')
                    }
                },
                error: function (xhr, status, error) {
                    setError('Участник с id '+values.id+' не найден.')
                }
            })
        },
    })

    const removeModerator = (id) => {
        const remove = () => {
            let new_list = remove_array_item(moderators, id)
            setModerators(new_list)
        }
        $.ajax({
            type: 'post',
            url: '../api/moderator-delete',
            data: {id: id},
            success: function () {
                remove()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    return (
        <>
            <form className="add-moderator-btn" onSubmit={formik.handleSubmit}>
                <div className="transparent-input-wrapper">
                    <i className="el-icon-right"></i>
                    <input placeholder="Ввести id и нажать enter"
                           name="id" onChange={formik.handleChange} value={formik.values.id}/>
                </div>
                <input type="submit" hidden />
            </form>
            {error? <p>{error}</p>:null}
            {moderators.length ? <AddedModeratorsBlock moderators={moderators} removeModerator={removeModerator}/> : ""}
        </>
    )
}

export default AddModeratorForm
