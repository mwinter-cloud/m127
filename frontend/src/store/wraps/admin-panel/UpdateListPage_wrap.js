import { connect } from 'react-redux'
import UpdateListPage from "../../../components/admin-panel/updates-list/base/UpdateListPage"
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"

const UpdateListPage_wrap = connect(mapStateToProps("UpdateListPage"), mapDispatchToProps("UpdateListPage"))(UpdateListPage)

export default UpdateListPage_wrap