import React from 'react'
import '../../styles/guide.css'
import GuidePage_wrap from "../../../../store/wraps/admin-panel/GuidePage_wrap"
import {useParams} from "react-router-dom"

function Guide() {
	const {section} = useParams()
	return (
		<GuidePage_wrap active_section={section}/>
	)
}

export default Guide
