import React, {Component} from "react"
import {ReportList} from "../elements/ReportList"
import Header from "../elements/Header"

class ReportsPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.set_menu_item('reports')
    }

    render() {
        return (
            <main className="big-container reports-section">
                <Header/>
                <ReportList member={this.props.member}/>
            </main>
        )
    }
}

export default ReportsPage
