import React, {Component, useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import MegafonInfoWindow from "../../../common-elements/windows/MegafonInfoWindow"

export const InfoBlock = () => {
	const [megafonWindow, setMegafonWindow] = useState()
	const [announcement, setAnnouncement] = useState("")
	const [announcementLoadingStatus, setAnnouncementLoadingStatus] = useState("undefined")

    const openMegafonWindow = () => {
        setMegafonWindow(megafonWindow ? 0 : 1)
    }
	
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
			<aside>
				{megafonWindow && <MegafonInfoWindow closeWindow={openMegafonWindow} />}
				<div className="info-block">
					<p>{announcement}</p>
				</div>
				<div className="transparent-btn">
					<Link to="/info-page">Информация</Link>
				</div>
				<div className="transparent-btn" onClick={openMegafonWindow}>
					Специальный канал
				</div>
			</aside>
		)
	} else {
		return (
			<aside>
				<div className="loading-icon"><i className="el-icon-loading"></i></div>
			</aside>
		)
	}
}
