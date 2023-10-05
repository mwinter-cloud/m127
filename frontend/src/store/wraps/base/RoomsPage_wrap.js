import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import RoomsPage from "../../../components/main-page/rooms/base/RoomsPage"

const RoomsPage_wrap = connect(mapStateToProps("RoomsPage"), mapDispatchToProps("RoomsPage"))(RoomsPage)

export default RoomsPage_wrap