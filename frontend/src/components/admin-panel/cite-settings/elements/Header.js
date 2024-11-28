import React from 'react'

export const Header = ({active_section,setItem}) => {
	return (
		<header>
			<h2>
				<i className="el-icon-picture-outline-round"></i> Оформление
			</h2>
			<ul className="card-menu">
				<li className={active_section == "color_and_text" && "active"} onClick={setItem} data-section="color_and_text">
					Цвет и текст
					{active_section == "color_and_text" && (<div className="line"></div>)}
				</li>
				<li className={active_section == "illustrations" && "active"} onClick={setItem} data-section="illustrations">Иллюстрации
					{active_section == "illustrations" && (<div className="line"></div>)}
				</li>
			</ul>
		</header>
	)
}