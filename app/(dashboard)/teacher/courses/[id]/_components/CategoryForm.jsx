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
  category: z.string().min(2, {
    category: 'title must be at least 2 characters.'
  })
})

const CategoryForm = ({ initialValues, courseId, setData }) => {
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
      console.log(data)
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
        Course Category
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
          {initialValues?.category ? (
            <>
              <div className='flex items-center gap-x-2'>
                <p className='text-sm text-gray-500 pt-2'>
                  {initialValues?.category}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className='text-xs text-gray-500 pt-2'>
                Category not Selected
              </p>
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
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
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

export default CategoryForm
