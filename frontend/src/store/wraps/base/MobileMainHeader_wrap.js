import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import {MobileMainHeader} from "../../../components/common-elements/base/header/mobile/MobileMainHeader"

const MobileMainHeader_wrap = connect(mapStateToProps("MobileMainHeader"), mapDispatchToProps("MobileMainHeader"))(MobileMainHeader)

export default MobileMainHeader_wrap