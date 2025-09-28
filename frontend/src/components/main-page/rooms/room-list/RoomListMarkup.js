import React, {Component} from 'react'
import {RoomBlock} from "./RoomBlock"
import TagFilterBtn from "../main-rooms/mobile/TagFilterBtn"
import MediaQuery from 'react-responsive'

export const RoomListMarkup  = ({tags, rooms, loadRooms, control_room}) => {
    return (
        <div className="room-items">
                {rooms.map((room, index) => {
                    return (
                        <RoomBlock room={room} key={index} />
                    )
                })}
            {control_room == 1 ? (
                <div className="simple-btn" onClick={loadRooms}>Показать больше</div>) : ""}
        </div>
    )
}