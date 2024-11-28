import React, {useState} from 'react'

export const SectionHeader = ({articles}) => {
	const [section_name, setSectionName] = useState('')
	
    const scrollToArticle = (e) => {
        let article_id = e.target.getAttribute('data-id')
        let article_y = document.getElementById('card' + article_id).offsetTop - 20
        window.scrollTo(0, article_y)
    }

    return (
		<div className="guide-title">
			<h3>{section_name}</h3>
			<ul>
				{articles.length != 0 ? (
					articles.map((art, index) => {
						return (
							<li key={index} data-id={art.id} onClick={scrollToArticle}>{art.name}</li>
						)
					})
				) : (<p>Записи отсутствуют</p>)}
			</ul>
		</div>
	)
}