import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import LoginPage from "../../../components/member/login/base/LoginPage"

const LoginPage_wrap = connect(mapStateToProps("LoginPage"), mapDispatchToProps("LoginPage"))(LoginPage)

export default LoginPage_wrap