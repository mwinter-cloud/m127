import React, {useState, useEffect} from 'react'
import MediaQuery from 'react-responsive'
import axios from "axios"
import {Link} from "react-router-dom"

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
            <Link to="/">
				<MediaQuery minWidth={801}>
					{logo && <img src={logo} className="main-logo" />}
				</MediaQuery>
				<MediaQuery maxWidth={800}>
					{logo && <img src={logo} />}
				</MediaQuery>
			</Link>
		</div>
	)
}
