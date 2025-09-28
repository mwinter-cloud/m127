import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import CreateRoomBtn from "./CreateRoomBtn"

class RoomListHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="rooms-header">
                <div className='section-title'>
                    <h3>Комнаты</h3>
                    <MediaQuery minWidth={801}>
                        <CreateRoomBtn/>
                    </MediaQuery>
                </div>
                <ul className="toggle">
                    <li data-section="popular" onClick={this.props.selectSection}>популярное
                        <div className={this.props.section == "popular" ? "line" : "hide"}></div>
                    </li>
                    <li data-section="new" onClick={this.props.selectSection}>новое
                        <div className={this.props.section == "new" ? "line" : "hide"}></div>
                    </li>
                    <li data-section="my" onClick={this.props.selectSection}>мои
                        <div className={this.props.section == "my" ? "line" : "hide"}></div>
                    </li>
                    <li data-section="saves" onClick={this.props.selectSection}>сохраненное
                        <div className={this.props.section == "saves" ? "line" : "hide"}></div>
                    </li>
                </ul>
            </header>
        )
    }
}

export default RoomListHeader
