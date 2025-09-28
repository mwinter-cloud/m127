import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import PollContentField from "../../../components/main-page/polls/content-field/PollContentField"

const PollContentField_wrap = connect(mapStateToProps("PollContentField"), mapDispatchToProps("PollContentField"))(PollContentField)

export default PollContentField_wrap