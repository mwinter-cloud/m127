import React from 'react'

class Colorline extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			color_class: '',
		}
	}
	componentDidMount(){
	    let MyDate = new Date
        let MyHours = MyDate.getHours()
        let color_class = ''
        switch (true){
        	case (MyHours >= 3) && (MyHours < 6):color_class = 'EAC'
        	break
        	case (MyHours >= 6) && (MyHours < 10):color_class = 'MC'
        	break
        	case (MyHours >= 10) && (MyHours < 17):color_class = 'DAC'
        	break
        	case (MyHours >= 17) && (MyHours < 22):color_class = 'EC'
        	break
        	default:color_class = 'night-color'
        	break
        }
		this.setState({
			color_class: color_class
		})
	}
	render() {
	  return (
    	<header className={"colorline "+this.state.color_class}></header>
	  )
	}
}

export default Colorline
