import React from 'react'
import parse from "html-react-parser"

export const ProfilePost = ({title, text, image}) => {
	if (title == "" && text == "" && image == null) {
		return (
			<main className="post">
				<article>
					<p className="null-post">
						<i className="el-icon-question"></i> Пользователь не рассказал о себе. Наверное, он что-то скрывает.
					</p>
				</article>
			</main>
		)
	} else {
		return (
			<article className="post">
				<main>
					{title ? (<h2>{title}</h2>) : null}
					{text ? (<p>{parse(text)}</p>) : null}
					{image ? (<img src={image}/>) : null}
				</main>
			</article>
		)
	}
}