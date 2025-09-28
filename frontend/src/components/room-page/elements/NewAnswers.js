import React from 'react'
import AnswerBlock from './AnswerBlock'

class NewAnswers extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
	    return(
	        <div className="new-answers">
        	    {this.props.answers.map((answer, index) => {
                			return (
                				<AnswerBlock key={index} answer={answer}/>
                			)
        		})}
    		</div>
		)
	}
}

export default NewAnswers
