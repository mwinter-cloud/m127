import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import AnswerBtns from "../../../components/room-page/elements/AnswerBtns"

const AnswerBtns_wrap = connect(mapStateToProps("AnswerBtns"), mapDispatchToProps("AnswerBtns"))(AnswerBtns)

export default AnswerBtns_wrap