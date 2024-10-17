import React  from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"

const SearchForm = (props) => {
    const formik = useFormik({
        initialValues: {
            search_string: '',
        },
        validationSchema: Yup.object({
            search_string: Yup.string()
                .required(),
        }),
        validateOnChange: false,
        onSubmit: values => {
            props.setSearchString(values.search_string)
        },
    })
    return (
        <form className="search-block" onSubmit={formik.handleSubmit}>
            <div className="input">
                <input className="search" placeholder="Поиск" onChange={formik.handleChange} text_value={formik.values.search_string} name="search_string"/>
                <i className="el-icon-search"></i>
            </div>
            <input type="submit" hidden />
        </form>
    )
}

export default SearchForm
