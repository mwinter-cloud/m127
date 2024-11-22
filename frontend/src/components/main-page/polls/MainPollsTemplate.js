import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import PollsFilter from './filter/PollsFilter'
import MediaQuery from 'react-responsive'

export const MainPollsTemplate = () => {
	const [menuStatus, setMenuStatus] = useState('disabled')

    const openMenu = () => {
        setMenuStatus(menuStatus == 'active' ? 'disabled' : 'active')
    }

	return (
		<main className="main-page polls-page">
			<div className="flex container">
				<MediaQuery minWidth={801}>
					<aside className="col1">
						<PollsFilter />
					</aside>
				</MediaQuery>
				<MediaQuery maxWidth={800}>
					{menuStatus == 'active' && (
						<div className="col1">
							<PollsFilter closeMenu={openMenu} />
						</div>)}
					<div className="poll-section-btn" onClick={openMenu}>
						<div className="section-title">
							<i className="el-icon-copy-document"></i> {menuStatus == 'active' ? ('меню') : ('опрос')}
						</div>
					</div>
				</MediaQuery>
				{menuStatus == 'disabled' && (<Outlet />)}
			</div>
		</main>
	)
}
