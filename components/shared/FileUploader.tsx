import React, { Dispatch, SetStateAction } from 'react'

type FileUploadProps = {
  imageUrl: string
  onFieldChange: (value: string) => void
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({onFieldChange,setFiles,imageUrl}:FileUploadProps) => {
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader