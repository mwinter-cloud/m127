import React, { Component } from "react"
import Carousel from "./Carousel"
import {InfoBlock} from "./InfoBlock"

export const MainRoomsBanner = () => {
	return (
		<header className="cite-top">
			<Carousel />
			<InfoBlock />
		</header>
	)
}
