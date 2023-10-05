import { connect } from 'react-redux'
import CiteSettingsPage from "../../../components/admin-panel/cite-settings/base/CiteSettingsPage"
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"

const CiteSettingsPage_wrap = connect(mapStateToProps("CiteSettingsPage"), mapDispatchToProps("CiteSettingsPage"))(CiteSettingsPage)

export default CiteSettingsPage_wrap