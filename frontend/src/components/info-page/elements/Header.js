import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";

export const Header = () => {
	const [hello, setHello] = useState('')

	useEffect(() => {
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
		<header className="header">
			<Link to="../"><i className="el-icon-back arrow-back"></i></Link>
			<h1>{hello}!</h1>
		</header>
	)
}