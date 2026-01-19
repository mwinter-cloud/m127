import React, { Component,useState, useEffect } from "react"
import Carousel from "./Carousel"
import {InfoBlock} from "./InfoBlock"
import axios from "axios"
import {Link} from "react-router-dom"

export const MainRoomsBanner = () => {
	const [announcement, setAnnouncement] = useState('')
	const [announcementLoadingStatus, setAnnouncementLoadingStatus] = useState('undefined')
	
    useEffect(() => {
        axios.get('/api/get-announcement', {
			onDownloadProgress: () => {
				setAnnouncementLoadingStatus('loading')
			}
		}).catch(() => {
			setAnnouncementLoadingStatus('error')
		}).then(({data}) => {
			setAnnouncementLoadingStatus('loaded')
            const text = data.text
            setAnnouncement(text)
        })
    }, [])
	
	return (
		<header className="cite-top">
			<ul className="cite-top-item-list">
				<li>{announcement}</li>
				<li><Link to="/info-page">Инфо-панель</Link></li>
				<li><Link to="/poll">Опросы</Link></li>
			</ul>
			<InfoBlock />
			<Carousel />
		</header>
	)
}
