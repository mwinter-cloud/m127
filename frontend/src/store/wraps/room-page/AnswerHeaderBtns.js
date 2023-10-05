import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import AnswerHeaderBtns from "../../../components/room-page/elements/AnswerHeaderBtns"

const AnswerHeaderBtns_wrap = connect(mapStateToProps("AnswerHeaderBtns"), mapDispatchToProps("AnswerHeaderBtns"))(AnswerHeaderBtns)

export default AnswerHeaderBtns_wrap