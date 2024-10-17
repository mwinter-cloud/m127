import React, { Component } from 'react'
import SearchBlock from "./SearchBlock"
import RoomBlock from "./RoomBlock"
import TagFilterBtn from "../main-rooms/mobile/TagFilterBtn"
import MediaQuery from 'react-responsive'
import CreateRoomBtn from "./CreateRoomBtn"

class RoomListContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col2">
                <MediaQuery minWidth={801}>
                    <SearchBlock onSearch={this.props.onSearch}/>
                </MediaQuery>
                <MediaQuery maxWidth={800}>
                    <div className="mobile-room-list-header">
                        <SearchBlock onSearch={this.props.onSearch}/>
                        <TagFilterBtn onTagSelect={this.props.onTagSelect} tags={this.props.tags}/>
                        <CreateRoomBtn/>
                    </div>
                </MediaQuery>
                <div className="room-list">
                    {this.props.rooms.map((room, index) => {
                        return (
                            <RoomBlock room={room} key={index}/>
                        )
                    })}
                </div>
                {this.props.control_room == 1 ? (
                    <div className="simple-btn" onClick={this.props.loadRooms}>Показать больше</div>) : ""}
            </div>
        )
    }
}

export default RoomListContent
