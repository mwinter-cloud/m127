import React, {Component, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

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

	if (announcementLoadingStatus == "loaded") {
		return (
			<aside className="aside">
				<div className="info-block">
					<p>{announcement}</p>
				</div>
				<div className="transparent-btn">
					<Link to="/info-page">Инфо-панель</Link>
				</div>
			</aside>
		)
	} else {
		return null
	}
}
