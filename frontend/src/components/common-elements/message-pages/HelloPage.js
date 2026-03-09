import React from "react"
import {useNavigate} from "react-router-dom"
import "./style/hello-page.css"

const HelloPage = () => {
	const navigate = useNavigate()

	return (
		<main className="hello-page">
			<header className="hello-page__nav">
				<div className="hello-page__nav-logo">Почта ветров</div>
				<button className="hello-page__nav-phone"><a href="https://github.com/mwinter-cloud/m127" target="_blank">m127 на github</a></button>
			</header>
			<section className="hello-page__hero">
				<div className="hello-page__text">
					<p className="hello-page__subtitle">привет-привет! это одна маленькая</p>
					<h1 className="hello-page__title">интернет-тетрадь</h1>
					<ul className="hello-page__list hello-page__accent">
						<p>Как она устроена?</p>
						<li><img src="/static/frontend/images/beach.png" /> записи структурированы по комнатам, ответы можно оформлять с помощью кода, сортировка без флагов и нейросетей</li>
						<li><img src="/static/frontend/images/beach.png" /> доступ к своим данным, создание правил, возможность менять систему под свои желания, свободный доступ к коду</li>
						<li><img src="/static/frontend/images/beach.png" /> без привязки к другим сервисам</li>
					</ul>
				</div>
				<button className="hello-page__cta" onClick={() => navigate("/login")}>войти</button>
			</section>
			<div className="hello-page__cat" aria-hidden />
		</main>
	)
}

export default HelloPage
