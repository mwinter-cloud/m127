import React, { Component,useState, useEffect } from "react"
import Carousel from "./Carousel"
import {InfoBlock} from "./InfoBlock"
import axios from "axios"
import {Link} from "react-router-dom"

export const MainRoomsBanner = () => {
	
	return (
		<header className="cite-top">
			<InfoBlock />
			<Carousel />
		</header>
	)
}
