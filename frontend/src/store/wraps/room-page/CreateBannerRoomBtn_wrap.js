import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import CreateBannerRoomBtn from "../../../components/room-page/elements/CreateBannerRoomBtn"

const CreateBannerRoomBtn_wrap = connect(mapStateToProps("CreateBannerRoomBtn"), mapDispatchToProps("CreateBannerRoomBtn"))(CreateBannerRoomBtn)

export default CreateBannerRoomBtn_wrap