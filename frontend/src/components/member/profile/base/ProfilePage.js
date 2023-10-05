import React from 'react'
import {useParams} from "react-router-dom"
import Profile from "../Profile"

function ProfilePage(props) {
	const {id} = useParams()
	props.set_section('')
	return (
		<Profile id={id} />
	)
}

export default ProfilePage
