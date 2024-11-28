import React from "react"
import SearchBlock from "./SearchBlock"

export const Header = ({search}) => {
	return (
		<header className="guide-header">
			<h2>Добро пожаловать в руководство по сайту Почта ветров!</h2>
			<SearchBlock search={search}/>
		</header>
	)
}