import React, {useState} from "react"
import UserMenu from "./UserMenu"
import {Link} from "react-router-dom"

export const ProfileBlock = ({member, changeMode}) => {
	const [menu_status, setMenuStatus] = useState('disabled')

    const changeMenuStatus = () => {
       setMenuStatus(menu_status == 'active' ? 'disabled' : 'active')
    }

	return (
		<div className="profile-block">
			<div className="flex">
				<Link to={`/profile/${member.profile.id}`}>
					{member.profile.avatar != null ?
						(<img src={member.profile.avatar} className="avatar"/>) :
						(<div className="base-avatar"></div> )}
				</Link>
				<div className="open-btn"><i className="el-icon-arrow-down" onClick={changeMenuStatus} id="user_menu_btn"></i></div>
			</div>
			{menu_status == 'active' && (<UserMenu closeMenu={changeMenuStatus} changeMode={changeMode} />)}
		</div>
	)
}
