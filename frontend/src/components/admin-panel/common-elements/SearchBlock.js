import React from 'react'

export const SearchBlock = ({onSearch}) => {
	return (
		<div className="search-block">
			<input placeholder="Искать по названию" onInput={onSearch} />
			<button><i className="el-icon-search"></i></button>
		</div>
	)
}