import { connect } from 'react-redux'
import {ModeratorsPage} from "../../../components/admin-panel/moderators/base/ModeratorsPage"
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"

const ModeratorsPage_wrap = connect(mapStateToProps("ModeratorsPage"), mapDispatchToProps("ModeratorsPage"))(ModeratorsPage)

export default ModeratorsPage_wrap