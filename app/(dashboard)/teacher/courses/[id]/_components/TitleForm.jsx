'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../../../../components/ui/button'
import { Input } from '../../../../../../components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '../../../../../../components/ui/form'
import { Pencil } from 'lucide-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const formSchema = z.object({
  category: z.string().min(2, {
    category: 'Select Category'
  })
})

const TitleForm = ({ initialValues, courseId, setData }) => {
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
    <div className='mt-6 border bg-slate-50 rounded-md p-4'>
      <Toaster />
      <div
        className='font-medium flex items-center justify-between
    '
      >
        Course Title
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
      {isEditing ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex gap-x-4'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='e.g. "Web Development"'
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </>
      ) : (
        <>
          <p className='text-sm text-gray-500 pt-2'>{initialValues?.title}</p>
        </>
      )}
    </div>
  )
}

export default TitleForm
