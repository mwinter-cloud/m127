import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import NoteBlock from "../../../components/admin-panel/workplan/elements/NoteBlock"

const WorkplanNote_wrap = connect(mapStateToProps("NoteBlock"), mapDispatchToProps("NoteBlock"))(NoteBlock)

export default WorkplanNote_wrap