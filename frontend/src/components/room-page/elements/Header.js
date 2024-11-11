import React, { Component } from 'react'
import FormWindow from "../../common-elements/windows/FormWindow"
import CreateRoomForm from "../../main-page/forms/CreateRoomForm"
import BannerRoomForm from "../forms/BannerRoomForm"
import MediaQuery from 'react-responsive'
import RoomMenu from "./RoomMenu"

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room_menu: 'closed',
            edit_window: 0,
            banner_form: 0,
        }
        this.openRoomMenu = this.openRoomMenu.bind(this)
        this.openEditWindow = this.openEditWindow.bind(this)
        this.reloadRoom = this.reloadRoom.bind(this)
        this.openBannerForm = this.openBannerForm.bind(this)
    }

    openRoomMenu = () => {
        this.setState({room_menu: this.state.room_menu == 'closed' ? 'opened' : 'closed'})
    }

    openEditWindow = () => {
        this.setState({edit_window: this.state.edit_window ? 0 : 1})
    }

    reloadRoom = (data) => {
        this.setState({edit_window: 0})
        this.props.reloadRoom(data)
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != document.getElementById('options_btn')) {
            this.setState({room_menu: 'closed'})
        }
    }

    openBannerForm = () => {
        this.setState({banner_form: this.state.banner_form ? 0 : 1})
    }

    render() {
        return (
            <>
                {this.state.edit_window ? (
                    <FormWindow children={<CreateRoomForm reloadRoom={this.reloadRoom} room={this.props.room}/>}
                                title="Отредактировать комнату"
                                closeWindow={this.openEditWindow}/>) : ""}
                {this.state.banner_form ? (
                    <FormWindow children={<BannerRoomForm
                        room_id={this.props.room.id}/>} title="Добавить банер"
                                closeWindow={this.openBannerForm}/>) : ""}
                <header className="room-header">
                    <div className="room-info">
                        <div className="room-title">
                            <h2 className={this.props.room.color ? this.props.room.color.type : null}>{this.props.room.name}</h2>
                        </div>
                        <div className="options">
                            <div className="options-field">
                                <div className="options-btn" onClick={this.openRoomMenu} id="options_btn">
                                    Опции темы
                                </div>
                                {this.state.room_menu == 'opened' && <RoomMenu room_id={this.props.room.id} openBannerForm={this.openBannerForm}
									room_author_id={this.props.room.author.id} my_id={this.props.my_id} is_admin={this.props.is_admin}
                                    openEditWindow={this.openEditWindow} openMenuWindow={this.openRoomMenu}/>}
                            </div>
                        </div>
                    </div>
                </header>
                <MediaQuery minWidth={801}>
                    <div className="room-tags-aside">
                        {this.props.room.tags.map((tag, index) => {
                            return (
                                <li key={index} className="tag">
                                    {tag.name}
                                </li>
                            )
                        })}
                    </div>
                </MediaQuery>
            </>
        )
    }
}

export default Header
