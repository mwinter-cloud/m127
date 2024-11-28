import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import {MainHeader} from "../../../components/common-elements/base/header/MainHeader"

const MainHeader_wrap = connect(mapStateToProps("MainHeader"), mapDispatchToProps("MainHeader"))(MainHeader)

export default MainHeader_wrap