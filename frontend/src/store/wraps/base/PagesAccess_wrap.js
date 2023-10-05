import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import PagesAccess from "../../../PagesAccess"

const PagesAccess_wrap = connect(mapStateToProps("PagesAccess"), mapDispatchToProps("PagesAccess"))(PagesAccess)

export default PagesAccess_wrap