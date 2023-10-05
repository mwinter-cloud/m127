import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import '../../style/file-input.css'

const Dropzone = props => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onprogress = (e) => {
        const loadingPercentage = 100 * e.loaded / e.total;
      }
      reader.onload = (e) => {
          $('#'+props.field+'_img').attr('src',e.target.result)
      }
      reader.readAsDataURL(file)
    })

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="file-input-block">
      <input {...getInputProps()} name={props.field} style={{display:'block'}} id={props.field+"_img_input"} />
      <p className="file-input">Выбрать файл</p>
    </div>
  )
}
export default Dropzone