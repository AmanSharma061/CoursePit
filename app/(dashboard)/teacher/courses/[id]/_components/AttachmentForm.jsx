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

const AttachmentForm = ({ initialValues, courseId, setData }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const handler = () => {
    setIsEditing(prev => !prev)
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })

  async function onSubmit (values) {

    try {
      const res = axios.post(`/api/courses/${courseId}/attachment`, {
        courseId,
        values
      })
  
      const data = (await res)?.course
      setData(data)
      console.log(data)
      setIsEditing(false)
      toast.success('Attachment added successfully', {
        position: 'top-center',
        duration: 800
      })
    } catch (error) {
      toast.error('failed ', {
        position: 'top-center',
        duration: 800
      })
      console.log(error)
    }
  }

  const { isSubmitting, isValid } = form.formState

  return (
    <div className='mt-4 border bg-slate-50 rounded-md py-4 px-2'>
      <Toaster />
      <div className='font-medium flex items-center justify-between'>
        Course Attachments
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
              {initialValues?.attachments ? (
                <>
                  <Pencil size={16} className='font-bold' />
                  Edit
                </>
              ) : (
                <>
                  <PlusCircle size={16} className='font-bold ' />
                  <p className='text-xs'>Add an attachment</p>
                </>
              )}
            </Button>
          </>
        )}
      </div>

      {!isEditing ? (
        <>
          {initialValues?.url ? (
            <>
              <div className='flex items-center gap-x-2 py-2'>
                {/* {
                    initialValues?.attachments?.map((attachment)=>{
                        return (
                            <p>
                                {attachment?.name}
                            </p>
                        )
                    })
                } */}
              </div>
            </>
          ) : (
            <>
              <p className='text-xs text-gray-500 pt-2'>No Attachments yet</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {isEditing && (
        <div className='flex items-center justify-center flex-col py-4 w-full'>
          <Upload
            endpoint='courseAttachment'
            onChange={url => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default AttachmentForm
