import React from 'react'
import {useParams} from "react-router-dom"
import Profile from "../Profile"

function ProfilePage({set_section}) {
	const {id} = useParams()
	set_section('')
	
	return (
		<Profile id={id} />
	)
}

export default ProfilePage
