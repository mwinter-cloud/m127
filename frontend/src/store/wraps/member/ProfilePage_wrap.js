import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import ProfilePage from "../../../components/member/profile/base/ProfilePage"

const ProfilePage_wrap = connect(mapStateToProps("ProfilePage"), mapDispatchToProps("ProfilePage"))(ProfilePage)

export default ProfilePage_wrap