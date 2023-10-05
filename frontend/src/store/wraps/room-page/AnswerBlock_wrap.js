import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import AnswerBlock from "../../../components/room-page/elements/AnswerBlock"

const AnswerBlock_wrap = connect(mapStateToProps("AnswerBlock"), mapDispatchToProps("AnswerBlock"))(AnswerBlock)

export default AnswerBlock_wrap