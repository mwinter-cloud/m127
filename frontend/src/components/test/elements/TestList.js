import React, {Component} from 'react'
import axios from 'axios'

class TestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
		return (
			<aside>
				<ul>
					<li>Процессор</li>
					<li>Процессор (сложный) <span className="result">60%</span></li>
					<li>Память</li>
				</ul>
			</aside>
		)
	}
}

export default TestList
