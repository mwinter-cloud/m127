import React, {Component} from 'react'
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
            create_window_status: 'disabled',
            updates: [],
			updates_status: 'undefined'
        }
        this.changeCreateWindowStatus = this.changeCreateWindowStatus.bind(this)
        this.formConfirm = this.formConfirm.bind(this)
        this.updateList = this.updateList.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-update-list', {
			onDownloadProgress: () => {
				this.setState({updates_status: 'loading'})
			}
		}).then(res => {
            const updates = res.data
            this.setState({updates: updates})
			this.setState({updates_status: 'loaded'})
        }).catch(() => {
			this.setState({updates_status: 'error'})
		})
    }

    changeCreateWindowStatus = () => {
        this.setState({create_window_status: (this.state.create_window_status == 'active' ? 'disabled' : 'active')})
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
            this.changeCreateWindowStatus()
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
		return (
			<div className="updates-card">
                {(() => {
					if(this.state.updates_status == 'loaded') {
						return (
							<>
								{this.state.create_window_status == 'active' && (
									<FormWindow children={<UpdateCreateForm formConfirm={this.formConfirm} />} title="Рассказать про обновление"
										closeWindow={this.changeCreateWindowStatus} formConfirm={this.formConfirm} />)}
								{this.props.member.profile.is_admin ? (
									<div className="add-note-btn" onClick={this.changeCreateWindowStatus}>
										<i className="el-icon-plus"></i> Запись
									</div>) : null}
								<ul>
									{this.state.updates?.map((update, index) => {
										return (
											<UpdateBlock update={update} key={index}
												updateList={this.updateList} deleteNote={this.deleteNote} />
										)
									})}
								</ul>
							</>
						)
					} else if(this.state.updates_status == 'error') {
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

export default UpdateList
