import React, { Component } from 'react'
import FormWindow from "../../../common-elements/windows/FormWindow"
import UpdateCreateForm from "../forms/UpdateCreateForm"
import UpdateBlock from "./UpdateBlock"
import axios from "axios"
import replace_array_item from "../../../../special-functions/replace-array-item"
import remove_array_item from "../../../../special-functions/remove-array-item"

class UpdateList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            create_window: 0,
            updates: []
        }
        this.openCreateWindow = this.openCreateWindow.bind(this)
        this.formConfirm = this.formConfirm.bind(this)
        this.updateList = this.updateList.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-update-list').then(res => {
            const updates = res.data
            this.setState({updates: updates})
        })
    }

    openCreateWindow = () => {
        this.setState({create_window: (this.state.create_window ? 0 : 1)})
    }

    updateList = (data) => {
        let new_array = replace_array_item(this.state.updates, data)
        this.setState({updates: new_array})
    }

    deleteNote = (id) => {
        const setList = () => {
            let new_array = remove_array_item(this.state.updates, id)
            this.setState({updates: new_array})
        }
        $.ajax({
            type: 'post',
            url: '../api/delete-update-note',
            data: {id: id},
            success: function () {
                setList()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    formConfirm = (data) => {
        const setList = (data) => {
            this.setState({updates: this.state.updates.concat(data)},()=>console.log(this.state.updates))
            this.openCreateWindow()
        }
        $.ajax({
            type: 'post',
            url: '../api/add-update',
            data: data,
            success: function (res) {
                const author = {id: res.author_id, name: res.author_name}
                let new_update = res.note
                new_update.author = author
                setList(new_update)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    render() {
        if(this.state.updates.length!=0) {
            return (
                <>
                    <div className="updates-card">
                        {this.state.create_window ? (
                        <FormWindow children={<UpdateCreateForm formConfirm={this.formConfirm}/>} title="Рассказать про обновление"
                                    closeWindow={this.openCreateWindow} formConfirm={this.formConfirm}/>) : ""}
                        {this.props.member.profile.is_admin ? (
                            <div className="add-note-btn" onClick={this.openCreateWindow}>
                                <i className="el-icon-plus"></i> Запись
                            </div>) : null}
                        <ul>
                            {this.state.updates.map((update, index) => {
                                return (
                                    <UpdateBlock update={update} key={index}
                                                   updateList={this.updateList} deleteNote={this.deleteNote}/>
                                )
                            })}
                        </ul>
                    </div>
                </>
            )
        } else {
            return null
        }
    }
}

export default UpdateList
