import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import {RegistrationPage} from "../../../components/member/registration/base/RegistrationPage"

const RegistrationPage_wrap = connect(mapStateToProps("RegistrationPage"), mapDispatchToProps("RegistrationPage"))(RegistrationPage)

export default RegistrationPage_wrap