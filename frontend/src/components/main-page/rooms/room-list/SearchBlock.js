import React, {Component} from 'react'
import TagFilter from "../../../common-elements/form/elements/tag-filter/TagFilter"
import MediaQuery from 'react-responsive'

class SearchBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="section-search-block">
				<MediaQuery minWidth={801}>
					<TagFilter popular_tags="true" tags={this.props.tags} items="rooms" onTagSelect={this.props.onTagSelect}/>
				</MediaQuery>
                <input className="section-search" placeholder="Что ищем?" onInput={this.props.onSearch}/>
            </div>
        )
    }
}

export default SearchBlock
