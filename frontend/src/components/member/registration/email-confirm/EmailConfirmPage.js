import React, {useEffect, useState} from 'react'
import '../../styles/message-page.css'
import {Link} from 'react-router-dom'

export default function EmailConfirmPage() {
	window.scrollTo(0, 0)
	
	return (
		<main className="center-container night-mode">
			<div className="text-block middle-content-block">
				<div>
					<i className="el-icon-message message-page-icon"></i>
				</div>
				<main>
					<p className="info-msg">Подожди, пока запись будет подтверждена. Либо <Link to="../login">вернись на стартовую страницу</Link>.</p>
				</main>
			</div>
		</main>
	)
}
