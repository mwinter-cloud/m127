import React, {useState, useEffect} from 'react'
import '../../styles/create-profile.css'
import RegistrationForm from '../forms/RegistrationForm'
import '../../styles/registration.css'

export const RegistrationPage = ({illustrations, set_member}) => {
    const [banner, setBanner] = useState('')
	
	useEffect(() => {
		illustrations.map(el => {
            if (el.type == "RP") {
                setBanner(el.text)
            }
        })
	}, [])

	return (
		<main className="registration-page night-mode">
			{banner ?
				(<div className="banner"></div>) : null}
			<div className={banner ? "registration-window" : "registration-window no-banner-window"}>
				<h1>Регистрация</h1>
				<RegistrationForm set_member={set_member} />
			</div>
		</main>
	)
}

export default RegistrationPage
