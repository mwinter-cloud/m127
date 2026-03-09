import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../../styles/login.css'
import LoginForm from '../forms/LoginForm'

export default function LoginPage({illustrations, set_member}) {
    const [banner, setBanner] = useState('')

    useEffect(() => {
        illustrations.map(el => {
            if (el.type == "LP") {
               setBanner(el.text)
            }
        })
    }, [])
	
	return (
		<main className="registration-page login-page night-mode">
				<div className={banner ? "registration-window" : "registration-window no-banner-window"}>
					<div className="blur-bg" />
					<div className='content-container'>
						<h1>Вход</h1>
						<LoginForm set_member={set_member}/>
						<p className="registration-invite">Если ты здесь впервые, <Link to="/registration">зарегистрируйся</Link>.</p>
					</div>
				</div>
		</main>
	)
}