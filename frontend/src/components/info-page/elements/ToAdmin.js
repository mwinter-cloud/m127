import React from 'react'
import {Link} from "react-router-dom"

export const ToAdmin = ({member}) => {
	if (member.profile.is_admin) {
		return (
			<Link to="/admin-panel/cite-settings">
				<button type="button" class="admin-btn">
				  <strong>Администрирование</strong>
				  <div id="container-stars">
					<div id="stars"></div>
				  </div>

				  <div id="glow">
					<div class="circle"></div>
					<div class="circle"></div>
				  </div>
				</button>
			</Link>
		)
	}
}