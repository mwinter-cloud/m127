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
        	        if(answer.id!=0){
            			if(!document.body.contains(document.getElementById('answer'+answer.id))){
                			return (
                				<AnswerBlock key={index} answer={answer}/>
                			)
            			}
        	        }
        		})}
    		</div>
		)
	}
}

export default NewAnswers
