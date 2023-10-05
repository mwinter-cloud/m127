import React, { Component } from 'react'
import FormWindow from "../../../common-elements/windows/FormWindow"
import WorkplanCreateForm from "../forms/WorkplanCreateForm"
import axios from "axios"
import WorkplanNote_wrap from "../../../../store/wraps/admin-panel/WorkplanNote_wrap"
import replace_array_item from "../../../../special-functions/replace-array-item"
import remove_array_item from "../../../../special-functions/remove-array-item"

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            create_window: 0,
            workplan_list: []
        }
        this.openCreateWindow = this.openCreateWindow.bind(this)
        this.formConfirm = this.formConfirm.bind(this)
        this.updateList = this.updateList.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-workplan-list').then(res => {
            const workplan_list = res.data
            this.setState({workplan_list: workplan_list})
        })
    }

    openCreateWindow = () => {
        this.setState({create_window: (this.state.create_window ? 0 : 1)})
    }

    updateList = (data) => {
        let new_array = replace_array_item(this.state.workplan_list, data)
        this.setState({workplan_list: new_array})
    }

    deleteNote = (id) => {
        const setList = () => {
            let new_array = remove_array_item(this.state.workplan_list, id)
            this.setState({workplan_list: new_array})
        }
        $.ajax({
            type: 'post',
            url: '../api/delete-workplan-note',
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
        this.openCreateWindow()
        const setList = (data) => {
            this.setState({workplan_list: this.state.workplan_list.concat(data)})
        }
        $.ajax({
            type: 'post',
            url: '../api/add-workplan',
            data: data,
            success: function (res) {
                const author = {id: res.author_id, name: res.author_name}
                let new_note = res.note
                new_note.author = author
                setList(new_note)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    render() {
        if(this.state.workplan_list.length!=0) {
            return (
                <div className="updates-card">
                    {this.state.create_window ? (
                        <FormWindow children={<WorkplanCreateForm formConfirm={this.formConfirm}/>} title="Создать план"
                                    closeWindow={this.openCreateWindow} formConfirm={this.formConfirm}/>) : ""}
                    {this.props.member.profile.is_admin ? (
                        <div className="add-note-btn" onClick={this.openCreateWindow}>
                            <i className="el-icon-plus"></i> Запись
                        </div>) : null}
                    <ul>
                        {this.state.workplan_list.map((note, index) => {
                            return (
                                <WorkplanNote_wrap note={note} key={index}
                                                   updateList={this.updateList} deleteNote={this.deleteNote}/>
                            )
                        })}
                    </ul>
                </div>
            )
        } else {
            return (<div className="updates-card"><ul></ul></div>)
        }
    }
}

export default List
