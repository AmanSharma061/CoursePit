import React from 'react'
import toast from 'react-hot-toast'
import { UploadButton, UploadDropzone } from '../../../../../../lib/uploadthing'
import { Cloud, UploadCloud, UploadCloudIcon } from 'lucide-react'

const Upload = ({ endpoint, onChange }) => {
  return (
    <>
      <UploadDropzone
        className='w-full h-full items-center justify-center'
        endpoint={endpoint}
        onClientUploadComplete={res => {
          onChange(res[0]?.url)
          toast.success('Upload Completed', {
            duration: 800
          })
        }}
        onUploadError={error => {
          toast.error(`ERROR! ${error.message}`)
        }}
      />
    </>
  )
}

export default Upload
