import React, {Component} from 'react'
import SearchBlock from "./SearchBlock"
import {RoomBlock} from "./RoomBlock"
import TagFilterBtn from "../main-rooms/mobile/TagFilterBtn"
import MediaQuery from 'react-responsive'
import CreateRoomBtn from "./CreateRoomBtn"

export const RoomListMarkup  = ({onSearch, onTagSelect, tags, rooms, loadRooms, control_room}) => {
    return (
        <div className="col2">
            <MediaQuery minWidth={801}>
                <SearchBlock onSearch={onSearch}/>
            </MediaQuery>
            <MediaQuery maxWidth={800}>
                <div className="mobile-room-list-header">
                    <SearchBlock onSearch={onSearch} />
                    <CreateRoomBtn />
                </div>
            </MediaQuery>
            <div className="room-list">
                {rooms.map((room, index) => {
                    return (
                        <RoomBlock room={room} key={index} />
                    )
                })}
            </div>
            {control_room == 1 ? (
                <div className="simple-btn" onClick={loadRooms}>Показать больше</div>) : ""}
        </div>
    )
}

//  <TagFilterBtn onTagSelect={onTagSelect} tags={tags} />