import { connect } from 'react-redux';
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import Article from "../../../components/admin-panel/guide/elements/article/Article"

const Article_wrap = connect(mapStateToProps("Article"), mapDispatchToProps("Article"))(Article)

export default Article_wrap