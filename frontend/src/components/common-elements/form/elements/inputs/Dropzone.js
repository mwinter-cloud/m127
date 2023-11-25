import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import '../../style/file-input.css'

const Dropzone = props => {
  const [error, setError] = useState(0)
  const [isSelectedFile, setIsSelectedFile] = useState(null)

  const useMountEffect = () => {
    useEffect(() => {
      if (props.src) {
        setIsSelectedFile(true)
      }
    }, [props.src])
  }
  useMountEffect()

  const onDrop = useCallback((acceptedFiles) => {
    setIsSelectedFile(true)
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
        document.querySelector("#" + props.field + "_img_input").src = event.target.result
        imgElement.onload = function (e) {
          if (imgElement.width > 1500 || imgElement.height > 1200) {
            setError('(・`ω´・) Размер изображения превышает допустимый. Выбери другое.')
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

  const resetInput = (e) => {
    e.preventDefault()
    document.querySelector("#" + props.field + "_img_input").value = ''
    props.setSrc("")
    setIsSelectedFile(false)
  }

  return (
      <>
        <div {...getRootProps()} className="file-input-block">
          <input {...getInputProps()} name={props.field} style={{display: 'block'}} id={props.field + "_img_input"}/>
          <p className="file-input">{props.type == "plus" ? (<i className="el-icon-plus"></i>) : ("Выбрать файл")}</p>
        </div>
        {isSelectedFile ? (<button className="text-button" onClick={resetInput}>
          <i className="el-icon-minus"></i> Очистить</button>) : null}
        {error ? (<p>{error}</p>) : null}
      </>
  )
}
export default Dropzone