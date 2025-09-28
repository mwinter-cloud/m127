import React, { Component } from 'react'
import '../../styles/main-rooms.css'
import {MainRoomsBanner} from "./MainRoomsBanner"
import {MainRoomList} from "./MainRoomList"
import MobileMainRoomsBanner from "./mobile/MobileMainRoomsBanner"
import MediaQuery from 'react-responsive'

export const MainRoomsMarkup = () => {
	return (
		<main className="rooms-main">
			<MediaQuery minWidth={801}>
				<MainRoomsBanner/>
			</MediaQuery>
			<MediaQuery maxWidth={800}>
				<MobileMainRoomsBanner/>
				<MainRoomList device="mobile"/>
			</MediaQuery>
		</main>
	)
}
