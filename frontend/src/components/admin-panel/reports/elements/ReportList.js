import React, { Component } from 'react'
import ReportBlock_wrap from "../../../../store/wraps/admin-panel/ReportBlock_wrap"
import axios from "axios"

class ReportList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reports: [],
        }
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-reports').then(res => {
            const reports = res.data
            this.setState({reports: reports})
        })
    }

    render() {
        return (
            <div className="reports-list">
                {this.state.reports.map((report, index) => {
                    return (
                        <ReportBlock_wrap key={index} report={report}/>
                    )
                })}
            </div>
        )
    }
}

export default ReportList
