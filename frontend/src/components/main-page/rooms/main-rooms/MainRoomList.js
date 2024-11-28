import React, {Component, useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

export const MainRoomList = ({device}) => {
	const [rooms, setRooms] = useState([])
	const [roomsLoadingStatus, setRoomsLoadingStatus] = useState("undefined")

    useEffect(() => {
		//с мобильного извлекаем 3 записи, с десктопов - 5
        axios.get(window.location.origin + '/api/get-header-rooms/' + (device == 'mobile' ? 3 : 5), {
			onDownloadProgress: () => {
				setRoomsLoadingStatus('loading')
			}
		}).catch(() => {
			setRoomsLoadingStatus('error')
		}).then(({data}) => {
			setRoomsLoadingStatus('loaded')
            setRooms(data)
        })
    }, [])

	if (roomsLoadingStatus == "loaded") {
		if(rooms.length > 0) {
			return (
				<section className="main-room-list container">
					{rooms.map((room, index) => {
						return (
							<article className="room" key={index}>
								<Link to={"./room/" + room.room.id}>
									<img src={room.cover}/>
									<div className="room-info">
										<h4>{room.room.name}</h4>
									</div>
								</Link>
							</article>
						)
					})}
				</section>
			)
		}
	} else if (roomsLoadingStatus == "loading") {
		return (
			<div className="main-room-list container">
				<div className="loading-icon"><i className="el-icon-loading"></i></div>
			</div>
		)
	} else if (roomsLoadingStatus == "error") {
		return (
			<div className="main-room-list container"></div>
		)
	} else {
		return (<div className="main-room-list container"></div>)
	}
}

export default MainRoomList
