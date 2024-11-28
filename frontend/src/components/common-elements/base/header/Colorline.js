import React, {useState, useEffect} from 'react'

export const Colorline = () => {
	const [color_class, setColorClass] = useState('')
	
	useEffect(() => {
		const MyDate = new Date
        const MyHours = MyDate.getHours()
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
        	default:color_class = 'EC'
        	break
        }
		setColorClass(color_class)
	}, [])
	
	return (
		<header className={`colorline ${color_class}`}></header>
	)
}