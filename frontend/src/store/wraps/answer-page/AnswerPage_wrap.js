import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import AnswerPage from "../../../components/answer-page/base/AnswerPage"

const AnswerPage_wrap = connect(mapStateToProps("AnswerPage"), mapDispatchToProps("AnswerPage"))(AnswerPage)

export default AnswerPage_wrap
