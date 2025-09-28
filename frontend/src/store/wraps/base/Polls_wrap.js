import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import Polls from "../../../components/main-page/polls/base/Polls"

const Polls_wrap = connect(mapStateToProps("Polls"), mapDispatchToProps("Polls"))(Polls)

export default Polls_wrap