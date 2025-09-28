import { connect } from 'react-redux'
import WorkplanPage from "../../../components/admin-panel/workplan/base/WorkplanPage"
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"

const WorkplanPage_wrap = connect(mapStateToProps("WorkplanPage"), mapDispatchToProps("WorkplanPage"))(WorkplanPage)

export default WorkplanPage_wrap