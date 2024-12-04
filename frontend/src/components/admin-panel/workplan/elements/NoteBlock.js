import React, {Component} from "react"
import {FormWindow} from "../../../common-elements/windows/FormWindow"
import WorkplanCreateForm from "../forms/WorkplanCreateForm"
import FullScreenWindow from "../../../common-elements/windows/FullScreenWindow"
import Profile from "../../../member/profile/Profile"
import ConfirmWindow from "../../../common-elements/windows/ConfirmWindow"
import RatingBtns from "./RatingBtns"

class NoteBlock extends Component {
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
        this.setState({confirm_window:(this.state.confirm_window?0:1)})
    }

    deleteNote = () => {
        this.props.deleteNote(this.props.note.id)
        this.openConfirmWindow()
    }

    openEditWindow = () => {
        this.setState({edit_window: (this.state.edit_window ? 0 : 1)})
    }

    formConfirm = (data) => {
        this.openEditWindow()
        const update_list = (data) => {
            this.props.updateList(data)
        }
        $.ajax({
            type: 'post',
            url: '../api/edit-workplan',
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
        if (this.props.note.author) {
            return (
                <>
                    {this.state.confirm_window?(<ConfirmWindow confirm_function={this.deleteNote} close={this.openConfirmWindow}/>):null}
                    {this.state.edit_window ? (
                        <FormWindow children={<WorkplanCreateForm workplan={this.props.note} formConfirm={this.formConfirm}/>} title="Отредактировать план"
                                    closeWindow={this.openEditWindow}/>) : ""}
                    {this.state.profile_window ? (
                        <FullScreenWindow
                            children={<Profile id={this.props.note.author.id}
                                               closeWindow={this.openProfile}/>}/>) : null}
                    <li className={this.state.description?"note active":"note"}>
                        <div className="type">
                            {this.props.note.type=='C'?(<i className="el-icon-upload"></i>):
                                (<i className="el-icon-picture-outline"></i>)}
                        </div>
                        <div className="title" onClick={this.openDescription}>{this.props.note.name}</div>
                        <RatingBtns rating={this.props.note.rating} note_id={this.props.note.id}/>
                        <div className="author" onClick={this.openProfile}>{this.props.note.author.name}</div>
                        <div className="period">{this.props.note.start} - {this.props.note.end}</div>
                    </li>
                    {this.state.description ?
                        (<li className="description">
                            <p>{this.props.note.description}</p>
                            <div className="btns">
                                {this.props.note.author.id == this.props.my_profile_id ?
                                    (<div className="btn" onClick={this.openEditWindow}><i
                                        className="el-icon-edit"></i> Редактировать
                                    </div>) : null}
                                <div className="btn" onClick={this.openConfirmWindow}><i className="el-icon-minus"></i> Удалить</div>
                            </div>
                        </li>) : null}
                </>
            )
        } else {
            return null
        }
    }
}

export default NoteBlock
