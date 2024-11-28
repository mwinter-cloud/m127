import React from "react"
import {useLocation, Navigate} from "react-router-dom"
import RegistrationPage_wrap from "../../../../store/wraps/member/RegistrationPage_wrap"

function Registration() {
	const location = useLocation()
	let entered_code = false
	let operation_id = 0
	if(location.state!=null) {
		entered_code = location.state.entered_code
		operation_id = location.state.operation_id
	}
	if(entered_code) {
		return (
			<RegistrationPage_wrap operation_id={operation_id}/>
		)
	} else {
		return (
			<Navigate to='/hello-i-invite-you' />
		)
	}
}

export default Registration
