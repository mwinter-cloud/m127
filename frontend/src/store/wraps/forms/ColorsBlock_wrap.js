import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import ColorsBlock from "../../../components/common-elements/form/elements/editor/ColorsBlock"

const ColorsBlock_wrap = connect(mapStateToProps("ColorsBlock"), mapDispatchToProps("ColorsBlock"))(ColorsBlock)

export default ColorsBlock_wrap