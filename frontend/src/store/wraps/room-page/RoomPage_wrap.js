import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import RoomPage from "../../../components/room-page/base/RoomPage"

const RoomPage_wrap = connect(mapStateToProps("RoomPage"), mapDispatchToProps("RoomPage"))(RoomPage)

export default RoomPage_wrap