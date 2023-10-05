import React, { Component } from 'react'
import FormWindow from "../../common-elements/windows/FormWindow"
import CreateRoomForm from "../../main-page/forms/CreateRoomForm"
import SaveBtn from "./SaveBtn"
import BannerRoomForm from "../forms/BannerRoomForm"
import CreateBannerRoomBtn_wrap from "../../../store/wraps/room-page/CreateBannerRoomBtn_wrap"
import MediaQuery from 'react-responsive'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room_menu: 0,
            edit_window: 0,
            banner_form: 0,
        }
        this.wrapperRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.openRoomMenu = this.openRoomMenu.bind(this)
        this.openEditWindow = this.openEditWindow.bind(this)
        this.reloadRoom = this.reloadRoom.bind(this)
        this.openBannerForm = this.openBannerForm.bind(this)
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside)
    }

    openRoomMenu = () => {
        this.setState({room_menu: this.state.room_menu ? 0 : 1})
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
            this.setState({room_menu: 0})
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
                        <h2 className={this.props.room.color ? this.props.room.color.type : null}>{this.props.room.name}</h2>
                        <div className="options">
                            <div className="options-field">
                                <div className="options-btn" onClick={this.openRoomMenu} id="options_btn">
                                    Опции темы
                                </div>
                                {this.state.room_menu ? (
                                    <div className="options-block" ref={this.wrapperRef}>
                                        <ul>
                                            <li className="underline-hover blue-text"
                                                onClick={this.openEditWindow}>Редактированить
                                            </li>
                                            <CreateBannerRoomBtn_wrap room_id={this.props.room.id}
                                                                 openBannerForm={this.openBannerForm}/>
                                            <SaveBtn room_id={this.props.room.id}/>
                                        </ul>
                                    </div>) : null}
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
