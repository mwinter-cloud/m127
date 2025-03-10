import React, {useState, useEffect} from 'react'
import axios from "axios"

export const SpecialRoomList = () => {
	const [hello, setHello] = useState('')
	const [rooms, setRooms] = useState([])
	
	useEffect(() => {
        axios.get(window.location.origin + '/api/get-oficial-rooms').then(({data}) => {
            setRooms(data)
        })
		
		const MyDate = new Date
        const MyHours = MyDate.getHours()
        let name = ''
        switch (true){
        	case (MyHours >= 5) && (MyHours < 11):name = 'Доброе утро'
        	break
        	case (MyHours >= 11) && (MyHours < 16):name = 'Добрый день'
        	break
        	case (MyHours >= 16) && (MyHours <= 23):name = 'Добрый вечер'
        	break
        	case (MyHours >= 0) && (MyHours < 5):name = 'Доброй ночи'
        	break
        	default:name = 'Здравствуй'
        	break
        }
		setHello(name)
	}, [])

	return (
		<>
			<h1>{hello}!</h1>
			<ul>
				{rooms.map((room, index) => {
					return (
						<li key={index}><a href={`/room/${room.id}`} target="_blank">{room.name}</a></li>
					)
				})}
			</ul>
		</>
	)
}