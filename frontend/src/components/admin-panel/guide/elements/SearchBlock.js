import React, {useRef} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import CSRFToken from "../../../common-elements/form/CSRFToken"

const SearchBlock = (props) => {
	const formRef = useRef(null)
	
    const formik = useFormik({
        initialValues: {
            search_str: '',
        },
        validationSchema: Yup.object({
            search_str: Yup.string()
                .required(''),
        }),
        validateOnChange: false,
        onSubmit: (values, {setStatus, setErrors}) => {
            props.search(formRef.current)
        },
    })
	
    const onSearch = ({target}) => {
        formik.setFieldValue('search_str', target.value)
        formik.handleSubmit()
    }
	
    const preventDefault = (e) => {
        e.preventDefault()
    }

    return (
        <form className="search-block guide-search-block" onSubmit={preventDefault} ref={formRef}>
            <CSRFToken />
            <input placeholder="Искать..." onChange={onSearch} name="search_str" value={formik.values.search_str} />
            <i className="el-icon-search search-btn"></i>
        </form>
    )
}

export default SearchBlock