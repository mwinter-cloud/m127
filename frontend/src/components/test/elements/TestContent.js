import React, {Component} from 'react'
import axios from 'axios'

class TestContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
		return (
			<section>
			    <div className="question-block">
					<p className="question">1 вопрос. Вы уже должны были начать догадываться?</p>
					<ul>
						<li>Вариант 1 поцессор главное алу</li>
						<li>Вариант 2 поцессор не главное алу такого фон нейман не говорил</li>
					</ul>
					<div className="send-btn">Отправить ответы</div>
				</div>
			</section>
		)
	}
}

export default TestContent
