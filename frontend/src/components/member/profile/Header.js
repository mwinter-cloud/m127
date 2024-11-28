import React from 'react'

export const Header = ({name, cover, avatar, color, is_admin}) => {
	return (
		<header className="main-profile-header">
			{cover ? (<img src={cover} className="cover"/>) : (<div className="cover-block"></div>)}
			<div className="user-info">
				{avatar !== null && (<img src={avatar} className="avatar"/>)}
				<h3 className={color ? color.type : null}>{name}</h3>
				{is_admin ? (<div className="admin-icon">💫</div>) : null}
			</div>
		</header>
	)
}