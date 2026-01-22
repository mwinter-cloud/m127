import React, {Component, useState, useEffect} from "react"
import LatestAnswer from "./LatestAnswer"
import axios from "axios"
import {Link} from "react-router-dom"

export const InfoBlock = () => {
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
		<>
			<ul className="cite-top-item-list">
				<li><Link to="/info-page">Инфо-панель</Link></li>
				<li><Link to="/poll">Опросы</Link></li>
			</ul>
			<aside className="aside">
				<LatestAnswer />
			</aside>
			<ul className="cite-top-item-list">
				<li>{announcement}</li>
			</ul>
		</>
	)
}
