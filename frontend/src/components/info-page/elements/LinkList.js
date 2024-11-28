import React from 'react'
import {InviteCreator} from "./InviteCreator"

export const LinkList = ({invite_image}) => {
	return (
		<ul className="social-menu-ul">
			<InviteCreator invite_image={invite_image}/>
			<li><a href="../agreement" target="_blank">Соглашение</a></li>
			<li><a href="../admin-panel/guide/2" target="_blank">Руководство по использованию</a></li>
			<li><a href="../admin-panel/guide/1" target="_blank">Идеи сайта</a></li>
		</ul>
	)
}