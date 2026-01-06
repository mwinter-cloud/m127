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
		}
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