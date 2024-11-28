import React, {useState, useEffect} from 'react'
import '../../styles/login.css'
import LoginForm from "../forms/LoginForm"

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
			{banner ? (<div className="banner"></div>) : null}
				<div className={banner ? "registration-window" : "registration-window no-banner-window"}>
					<h1>Вход</h1>
					<LoginForm set_member={set_member}/>
				</div>
		</main>
	)
}