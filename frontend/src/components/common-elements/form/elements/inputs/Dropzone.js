import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import '../../style/file-input.css'

const Dropzone = props => {
  const onDrop = useCallback((acceptedFiles) => {
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
        document.querySelector("#"+props.field+"_img_input").src = event.target.result

        imgElement.onload = function (e) {
          const canvas = document.createElement("canvas")
          const MAX_WIDTH = 900
          const scaleSize = MAX_WIDTH / e.target.width
          canvas.width = MAX_WIDTH
          canvas.height = e.target.height * scaleSize

          const ctx = canvas.getContext("2d")
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
          const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg")
          let outputFile = new File([srcEncoded], {type: 'image/jpg'})
          $('#' + props.field + '_img_input').attr('val', outputFile)
        }
        $('#' + props.field + '_img').attr('src', event.target.result)
      }
      reader.readAsDataURL(file)
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
      <div {...getRootProps()} className="file-input-block">
        <input {...getInputProps()} name={props.field} style={{display: 'block'}} id={props.field + "_img_input"}/>
        <p className="file-input">{props.type == "plus" ? (<i className="el-icon-plus"></i>) : ("Выбрать файл")}</p>
      </div>
  )
}
export default Dropzone