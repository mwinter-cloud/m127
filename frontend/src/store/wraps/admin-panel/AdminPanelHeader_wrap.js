import { connect } from 'react-redux';
import {AdminPanelHeader} from "../../../components/admin-panel/common-elements/AdminPanelHeader"
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"

const AdminPanelHeader_wrap = connect(mapStateToProps("AdminPanelHeader"), mapDispatchToProps("AdminPanelHeader"))(AdminPanelHeader)

export default AdminPanelHeader_wrap