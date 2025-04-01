import React, {useState, useEffect} from 'react'
import MediaQuery from 'react-responsive'
import axios from "axios"
import logo from "./small-logo.png"

export const Logo = () => {
	const [citename, setCitename] = useState('')
	
	useEffect(() => {
		axios.get('/api/get-citename').then(({data}) => {
			setCitename(data.text)
		})
		axios.get('/api/get-logo').then(({data}) => {
			setLogo(data.text)
		})
	}, [])
	
	return (
		<div className="logo-block">
			<MediaQuery minWidth={801}>
				<img src={logo} className="main-logo" />
				<span className="citenamelogo">{citename}</span>
			</MediaQuery>
			<MediaQuery maxWidth={800}>
				<img src={logo} />
			</MediaQuery>
		</div>
	)
}
