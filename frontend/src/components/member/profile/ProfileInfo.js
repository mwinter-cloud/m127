import React from 'react'

export const ProfileInfo = ({city, email, webcite}) => {
	return (
		<ul className="profile-info">
			<header><h4>Информация</h4></header>
			<li>
				<span className="title">Город</span>
				<span className="text">{city ? city : "?"}</span>
			</li>
			<li>
				<span className="title">Почта</span>
				<span className="text">{email ? email : "?"}</span>
			</li>
			<li>
				<span className="title">Сайт</span>
				<span className="text">{webcite ? webcite : "?"}</span>
			</li>
		</ul>
	)
}