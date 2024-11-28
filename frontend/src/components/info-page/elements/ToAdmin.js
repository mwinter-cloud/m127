import React from 'react'
import {Link} from "react-router-dom"

export const ToAdmin = ({member}) => {
	if (member.profile.is_admin) {
		return (
			<Link to="/admin-panel/cite-settings">
				<div className="admin-panel-link">
					<i className="el-icon-star-off icon"></i>
					<span>Администрирование</span>
					<i className="el-icon-arrow-right arrow"></i>
				</div>
			</Link>
		)
	}
}