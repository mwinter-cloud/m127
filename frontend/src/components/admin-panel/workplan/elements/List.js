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
            create_window_status: 'disabled',
            workplan_list: [],
			list_status: 'undefined'
        }
        this.changeCreateWindowStatus = this.changeCreateWindowStatus.bind(this)
        this.formConfirm = this.formConfirm.bind(this)
        this.updateList = this.updateList.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-workplan-list', {
			onDownloadProgress: () => {
				this.setState({list_status: 'loading'})
			}
		}).then(res => {
            const workplan_list = res.data
            this.setState({workplan_list: workplan_list})
			this.setState({list_status: 'loaded'})
        }).catch(() => {
			this.setState({list_status: 'error'})
		})
    }

    changeCreateWindowStatus = () => {
        this.setState({create_window_status: (this.state.create_window_status =='active' ? 'disabled' : 'active')})
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
        this.changeCreateWindowStatus()
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
		return (
			<div className="updates-card">
                {(() => {
					if(this.state.list_status == 'loaded') {
						return (
							<>
								{this.state.create_window_status == 'active' && (
									<FormWindow children={<WorkplanCreateForm formConfirm={this.formConfirm} />} title="Создать план"
										closeWindow={this.changeCreateWindowStatus} formConfirm={this.formConfirm} />)}
								{this.props.member.profile.is_admin ? (
									<div className="add-note-btn" onClick={this.changeCreateWindowStatus}>
										<i className="el-icon-plus"></i> Запись
									</div>) : null}
								<ul>
									{this.state.workplan_list?.map((note, index) => {
										return (
											<WorkplanNote_wrap note={note} key={index}
												updateList={this.updateList} deleteNote={this.deleteNote} />
										)
									})}
								</ul>
							</>
						)
					} else if(this.state.list_status == 'error') {
						return <p className="error-msg">Не удалось получить записи.</p>
					} else {
						return (
							<div className="loading-icon"><i className="el-icon-loading"></i></div>
						)			
					}
                })()}
			</div>
		)
    }
}

export default List
