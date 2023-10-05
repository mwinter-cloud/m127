import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import ReportsPage from "../../../components/admin-panel/reports/base/ReportsPage"

const ReportsPage_wrap = connect(mapStateToProps("ReportsPage"), mapDispatchToProps("ReportsPage"))(ReportsPage)

export default ReportsPage_wrap