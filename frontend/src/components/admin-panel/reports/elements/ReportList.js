import React, {useState, useEffect} from 'react'
import ReportBlock_wrap from "../../../../store/wraps/admin-panel/ReportBlock_wrap"
import axios from "axios"

export const ReportList = () => {
    const [reports, setReports] = useState([])
	
	useEffect(() => {
		axios.get(`${window.location.origin}/api/get-reports`).then(({data}) => {
            setReports(data)
        })
	}, [])

	return (
		<div className="reports-list">
			{reports.map((report, index) => {
				return (
					<ReportBlock_wrap key={index} report={report}/>
				)
			})}
		</div>
	)
}
