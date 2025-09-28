import { connect } from 'react-redux'
import {GuidePage} from "../../../components/admin-panel/guide/base/GuidePage"
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"

const GuidePage_wrap = connect(mapStateToProps("GuidePage"), mapDispatchToProps("GuidePage"))(GuidePage)

export default GuidePage_wrap