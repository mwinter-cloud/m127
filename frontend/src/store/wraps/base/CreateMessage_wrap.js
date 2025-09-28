import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import {CreateMessage} from "../../../components/common-elements/windows/megafons/CreateMessage"

const CreateMessage_wrap = connect(mapStateToProps("CreateMessage"), mapDispatchToProps("CreateMessage"))(CreateMessage)

export default CreateMessage_wrap