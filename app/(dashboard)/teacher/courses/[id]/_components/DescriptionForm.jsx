'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../../../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '../../../../../../components/ui/form'
import { Input } from '../../../../../../components/ui/input'
import { Pencil } from 'lucide-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Textarea } from '../../../../../../components/ui/textarea'

const formSchema = z.object({
  description: z.string().min(2, {
    description: 'title must be at least 2 characters.'
  })
})

const DescriptionForm = ({ initialValues, courseId, setData }) => {
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
      const res = axios.patch(`/api/courses/${courseId}`, {
        courseId: courseId,
        title: values.title,
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
        Course Description
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
              <Pencil size={16} className='font-bold' />
              Edit
            </Button>
          </>
        )}
      </div>

      {!isEditing ? (
        <>
          {initialValues?.description ? (
            <>
              <div className='flex items-center gap-x-2'>
                <p className='text-sm text-gray-500 pt-2'>
                  {initialValues?.description}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className='text-xs text-gray-500 pt-2'>No description</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' gap-y-2 pt-2 flex flex-col '
          >
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='descrpition....'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit'>Save</Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default DescriptionForm
