import React, { Component } from 'react'
import '../../styles/main-rooms.css'
import MainRoomsBanner from "./MainRoomsBanner"
import MainRoomList from "./MainRoomList"
import MobileMainRoomsBanner from "./mobile/MobileMainRoomsBanner"
import MediaQuery from 'react-responsive'

class MainRooms extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="rooms-main">
				<MediaQuery minWidth={801}>
                    <MainRoomsBanner/>
                    <MainRoomList/>
                </MediaQuery>
				<MediaQuery maxWidth={800}>
                    <MobileMainRoomsBanner/>
                    <MainRoomList mobile="1"/>
                </MediaQuery>
            </main>
        )
    }
}

export default MainRooms
