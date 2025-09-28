import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import SettingsPage from "../../../components/member/settings/base/SettingsPage"

const SettingsPage_wrap = connect(mapStateToProps("SettingsPage"), mapDispatchToProps("SettingsPage"))(SettingsPage)

export default SettingsPage_wrap