import React from "react"

export const InfoHeader = ({main_section, member, changeMode}) => {
	return (
		<header className="info-header">
			<ul>	
				<li><a href="/room/8">Помощь</a></li>
				<li><a href="/room/4">Предложения</a></li>
				<li><a href="/room/7">Сообщить об ошибке</a></li>
			</ul>
		</header>
	)
}

