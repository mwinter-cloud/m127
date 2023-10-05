import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const SearchBlock = (props) => {
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
            props.search(values.search_str)
        },
    })
    const onSearch = (e) => {
        const str = e.target.value
        formik.setFieldValue('search_str', str)
        formik.handleSubmit()
    }
    const preventDefault = (e) => {
        e.preventDefault()
    }

    return (
        <form className="search-block guide-search-block" onSubmit={preventDefault}>
            <input placeholder="Искать..." onChange={onSearch}
                   value={formik.values.password}/>
            <i className="el-icon-search search-btn"></i>
        </form>
    )
}

export default SearchBlock