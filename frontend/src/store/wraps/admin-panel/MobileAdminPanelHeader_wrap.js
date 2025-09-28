import { connect } from 'react-redux';
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import MobileAdminPanelHeader from "../../../components/admin-panel/common-elements/mobile/MobileAdminPanelHeader"

const MobileAdminPanelHeader_wrap = connect(mapStateToProps("MobileAdminPanelHeader"), mapDispatchToProps("MobileAdminPanelHeader"))(MobileAdminPanelHeader)

export default MobileAdminPanelHeader_wrap