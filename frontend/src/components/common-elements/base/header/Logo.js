import React, {useState, useEffect} from 'react'
import MediaQuery from 'react-responsive'
import axios from "axios"

export const Logo = () => {
	const [citename, setCitename] = useState('')
	const [logo, setLogo] = useState('')
	
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
				{logo && <img src={logo} className="main-logo" />}
				<span className="citenamelogo">{citename}</span>
			</MediaQuery>
			<MediaQuery maxWidth={800}>
				{logo && <img src={logo} />}
			</MediaQuery>
		</div>
	)
}
