import React, {useEffect} from 'react'
import './style/form-window.css'

export const FormWindow = ({closeWindow, title, children}) => {
	useEffect(() => {
		document.querySelector('body').classList.add('hidden-y-scroll')
		
		return function () {
			document.querySelector('body').classList.remove('hidden-y-scroll')
		};
	}, [])

	return (
		<div className="shadow">
				<div className="form-window">
					<header><i className="el-icon-back" onClick={closeWindow}></i>
						<h4>{title}</h4></header>
					<main>{children}</main>
				</div>
		</div>
	)
}
