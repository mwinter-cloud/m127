import React from 'react'
import {useLocation, Navigate} from "react-router-dom"
import RegistrationPage_wrap from "../../../../store/wraps/member/RegistrationPage_wrap"

function Registration() {
	const location = useLocation()
	let entered_code = false
	if(location.state!=null) {
		entered_code = location.state.entered_code
	}
	if(entered_code) {
		return (
			<RegistrationPage_wrap/>
		)
	} else {
		return (
			<Navigate to='/hello-i-invite-you' />
		)
	}
}

export default Registration
