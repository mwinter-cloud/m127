import React, {useState} from "react"
import {Link} from "react-router-dom"

export const Menu = ({active_section}) => {
	const [sections, setSections] = useState([
		{
			name: "1",
			title: "Концепция и информация",
		},
		{
			name: "2",
			title: "Руководство по использованию",
		},
		{
			name: "3",
			title: "Описание кода backend",
		},
		{
			name: "4",
			title: "Описание кода frontend",
		},
		{
			name: "5",
			title: "Учебные материалы по организации сообщества",
		},
		{
			name: "6",
			title: "Учебные материалы для программистов",
		},
	])

	return (
		<aside>
			<ul>
				{sections.map((section, index) => {
					return (
						<li className="active" data-section={section.name} key={index}>
							{active_section == section.name && (<div className="activeline"></div>)}
							<Link to={`/admin-panel/guide/${section.name}`}>{section.title}</Link>
						</li>
					)
				})}
			</ul>
		</aside>
	)
}