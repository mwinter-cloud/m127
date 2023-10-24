import React, { Component } from 'react'
import CreateBannerRoomBtn_wrap from "../../../store/wraps/room-page/CreateBannerRoomBtn_wrap";
import SaveBtn from "./SaveBtn";

class RoomMenu extends Component {
    constructor(props) {
        super(props)
        this.wrapperRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside)
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != document.getElementById('options_btn')) {
            this.props.openMenuWindow()
        }
    }

    render() {
        return (
            <div className="options-block" ref={this.wrapperRef}>
                <ul>
                    <li className="underline-hover blue-text"
                        onClick={this.props.openEditWindow}>Редактированить
                    </li>
                    <CreateBannerRoomBtn_wrap room_id={this.props.room_id}
                                              openBannerForm={this.props.openBannerForm}/>
                    <SaveBtn room_id={this.props.room_id}/>
                </ul>
            </div>
        )
    }
}

export default RoomMenu
