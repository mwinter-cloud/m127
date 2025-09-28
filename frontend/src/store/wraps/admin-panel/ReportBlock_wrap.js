import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import ReportBlock from "../../../components/admin-panel/reports/elements/ReportBlock"

const ReportBlock_wrap = connect(mapStateToProps("ReportBlock"), mapDispatchToProps("ReportBlock"))(ReportBlock)

export default ReportBlock_wrap