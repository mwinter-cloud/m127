import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import InfoPage from "../../../components/info-page/base/InfoPage"

const InfoPage_wrap = connect(mapStateToProps("InfoPage"), mapDispatchToProps("InfoPage"))(InfoPage)

export default InfoPage_wrap