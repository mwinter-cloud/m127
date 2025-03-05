import React from 'react'

export const Header = ({name, cover, avatar, color, is_admin, system_status}) => {
	return (
		<header className="main-profile-header">
			{cover ? (<img src={cover} className="cover"/>) : (<div className="cover-block"></div>)}
			<div className="user-info">
				{avatar !== null && (<img src={avatar} className="avatar"/>)}
				<h3 className={color ? color.type : null}>
					{name} 
					{system_status ? (<span className="system-status">{system_status}</span>) : null}
				</h3>
				{is_admin ? (<div className="admin-icon">💫</div>) : null}
			</div>
		</header>
	)
}