import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../../style/file-input.css'

const Dropzone = props => {
  const [error, setError] = useState(0)

  const onDrop = useCallback((acceptedFiles) => {
	  const file_input = document.querySelector("#" + props.field + "_img_input")
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
      /*reader.onprogress = (e) => {
        const loadingPercentage = 100 * e.loaded / e.total;
      }*/
        reader.onload = (event) => {
            const imgElement = document.createElement("img")
            imgElement.src = event.target.result
            //file_input.src = event.target.result
            imgElement.onload = function (e) {
				if (imgElement.width > 1500 || imgElement.height > 1200 || file.size>1000000) {
					setError('(・`ω´・) Размер изображения превышает допустимый. Выбери другое.')
					file_input.value = null
				} else {
					setError(false)
				}
			}
			props.setSrc(event.target.result)
      }
      reader.readAsDataURL(file)
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  
  const clearInput = () => {
	file_input.value = null
  }


  return (
      <>
        <div {...getRootProps()} className="file-input-block">
          <input {...getInputProps()} name={props.field} style={{display: 'block'}} id={props.field + "_img_input"}/>
          <p className="file-input">{props.type == "plus" ? (<i className="el-icon-plus"></i>) : ("Выбрать файл")}</p>
        </div>
        {props.src ? (
            <p className="checkboxWrapper">
              <input type="checkbox" name={"clear_" + props.field} className="simple-checkbox" onClick={clearInput}/> Удалить файл
            </p>) : null}
        {error ? (<p>{error}</p>) : null}
      </>
  )
}
export default Dropzone