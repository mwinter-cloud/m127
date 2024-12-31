import React, {Component} from "react"

class HolidayHeader extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
			<div className="holiday-header">
				<img src="https://media1.tenor.com/m/TSQdvnNwdLQAAAAd/happy-new-year-cats.gif" />
				<p>Поздравляем с Новым Годом и очень-очень желаем радости!</p>
			</div>
        )
    }
}

export default HolidayHeader
