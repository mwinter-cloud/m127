import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import NotificationsSection from "../../../components/common-elements/base/header/NotificationsSection"

const NotificationsSection_wrap = connect(mapStateToProps("NotificationsSection"), mapDispatchToProps("NotificationsSection"))(NotificationsSection)

export default NotificationsSection_wrap