import React, {Component} from 'react'
import axios from 'axios'
import TestList from "../elements/TestList"
import TestContent from "../elements/TestContent"

class TestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
		window.scrollTo(0, 0);
    }

    render() {
		return (
			<div className="test-page">
				<header className="first-header">
					<h1>тесты по ЭВМ</h1>
				</header>
				<header className="second-header">
				    <nav>
						<ul>
						    <li><a href="index.html">Главная</a></li>
						    <li className="active"><a href="catalog.html">Тесты</a></li>
						</ul>
				    </nav>
				</header>
				<main>
					<div className="intro">
						<TestList />
						<TestContent />
					</div>
				</main>
			</div>
		)
	}
}

export default TestPage
