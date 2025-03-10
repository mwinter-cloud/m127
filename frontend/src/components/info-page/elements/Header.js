import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

export const Header = () => {
	
	
	return (
		<header className="header">
			<Link to="../"><i className="el-icon-back arrow-back"></i></Link>
		</header>
	)
}