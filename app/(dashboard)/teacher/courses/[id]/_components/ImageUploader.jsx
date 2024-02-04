'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../../../../components/ui/button'
import {
  Cloud,
  CloudFogIcon,
  Download,
  Pencil,
  PencilIcon,
  PlusCircle,
  UploadCloud
} from 'lucide-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Upload from '../_components/Upload'
import Image from 'next/image'
const formSchema = z.object({
  imageUrl: z.string().min(2, {
    imageUrl: 'Image is required'
  })
})

const ImageUploader = ({ initialValues, courseId, setData }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const handler = () => {
    setIsEditing(prev => !prev)
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })

  async function onSubmit (values) {
    console.log(values)
    try {
      const res = axios.patch(`/api/courses/${courseId}`, {
        courseId: courseId,
        values
      })
      const data = (await res)?.data?.course
      setData(data)
      form.reset(data)
      toast.success('Course updated', {
        duration: 800
      })

      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  const { isSubmitting, isValid } = form.formState

  return (
    <div className='mt-4 border bg-slate-50 rounded-md p-4'>
      <Toaster />
      <div className='font-medium flex items-center justify-between'>
        Course Image
        {isEditing ? (
          <>
            <Button
              variant='ghost'
              className='flex items-center gap-x-2'
              onClick={handler}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant='ghost '
              className='flex items-center gap-x-2'
              onClick={handler}
            >
              {initialValues?.imageUrl ? (
                <>
                  <Pencil size={16} className='font-bold' />
                  Edit
                </>
              ) : (
                <>
                  <PlusCircle size={16} className='font-bold' />
                  <p>Add an image</p>
                </>
              )}
            </Button>
          </>
        )}
      </div>

      {!isEditing ? (
        <>
          {initialValues?.imageUrl ? (
            <>
              <div className='flex items-center gap-x-2'>
                <Image
                  height={1000}
                  width={1000}
                  className='object-contain rounded-md h-60 outline'
                  src={initialValues?.imageUrl}
                  alt='image'
                />
              </div>
            </>
          ) : (
            <>
              <p className='text-xs text-gray-500 pt-2'>No Image Uploaded</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {!initialValues?.imageUrl ||
        (isEditing && (
          <div className='flex items-center justify-center flex-col py-4'>
     
            <Upload
              endpoint='courseImage'
              onChange={url => {
                if (url) {
                  onSubmit({ imageUrl: url })
                }
              }}
            />
          </div>
        ))}
    </div>
  )
}

export default ImageUploader
