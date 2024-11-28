import React, {Component} from "react"
import FormWindow from "../../../common-elements/windows/FormWindow"
import RatingBtns from "./RatingBtns"
import ConfirmWindow from "../../../common-elements/windows/ConfirmWindow"
import UpdateCreateForm from "../forms/UpdateCreateForm"
import FullScreenWindow from "../../../common-elements/windows/FullScreenWindow"
import Profile from "../../../member/profile/Profile"

class UpdateBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: 0,
            edit_window: 0,
            profile_window: 0,
            confirm_window: 0,
        }
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.openDescription = this.openDescription.bind(this)
        this.openEditWindow = this.openEditWindow.bind(this)
        this.formConfirm = this.formConfirm.bind(this)
        this.openProfile = this.openProfile.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }

    openDescription = () => {
        this.setState({description: (this.state.description ? 0 : 1)})
    }

    openProfile = () => {
        this.setState({profile_window: (this.state.profile_window ? 0 : 1)})
    }

    openConfirmWindow = () => {
        this.setState({confirm_window: (this.state.confirm_window ? 0 : 1)})
    }

    deleteNote = () => {
        this.props.deleteNote(this.props.update.id)
        this.openConfirmWindow()
    }

    openEditWindow = () => {
        this.setState({edit_window: (this.state.edit_window ? 0 : 1)})
    }

    formConfirm = (data) => {
        const update_list = (data) => {
            this.props.updateList(data)
            this.openEditWindow()
        }
        $.ajax({
            type: 'post',
            url: '../api/edit-update',
            data: data,
            success: function (res) {
                const author = {id: res.author_id, name: res.author_name}
                let note = res.note
                note.author = author
                update_list(note)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    render() {
        if (this.props.update.author) {
            return (
                <>
                    {this.state.confirm_window ? (
                        <ConfirmWindow confirm_function={this.deleteNote} close={this.openConfirmWindow}/>) : null}
                    {this.state.edit_window ? (
                        <FormWindow
                            children={<UpdateCreateForm update={this.props.update} formConfirm={this.formConfirm}/>}
                            title="Отредактировать сообщение об уведомлении"
                            closeWindow={this.openEditWindow}/>) : ""}
                    {this.state.profile_window ? (
                        <FullScreenWindow
                            children={<Profile id={this.props.update.author.id}
                                               closeWindow={this.openProfile}/>}/>) : null}
                    <li className="note">
                        <div className="type">
                            {this.props.update.type == 'C' ? (<i className="el-icon-upload"></i>) :
                                (<i className="el-icon-picture-outline"></i>)}
                        </div>
                        <div className="title" onClick={this.openDescription}>{this.props.update.name}</div>
                        <RatingBtns rating={this.props.update.rating} note_id={this.props.update.id}/>
                        <div className="author" onClick={this.openProfile}>{this.props.update.author.name}</div>
                        <div className="datetime">{this.props.update.created_at}</div>
                    </li>
                    {(() => {
                        if (this.state.description) {
                            return (
                                <li className="description">
                                    <p>{this.props.update.description}</p>
                                    {this.props.update.type == 'C' ?
                                        (<div className="btns">
                                            <div className="btn" onClick={this.openEditWindow}><i
                                                className="el-icon-edit"></i> Редактировать
                                            </div>
                                            <div className="btn" onClick={this.openConfirmWindow}><i
                                                className="el-icon-minus"></i> Удалить
                                            </div>
                                        </div>) : null}
                                </li>
                            )
                        }
                    })()}
                </>
            )
        } else {
            return null
        }
    }
}

export default UpdateBlock
