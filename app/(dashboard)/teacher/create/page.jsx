'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../../components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import Link from 'next/link'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

const page = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  })
  const { isSubmitting, isValid } = form.formState
  async function onSubmit (values) {
    try {
      const res = await axios.post('/api/courses/create', {
        title: values.title
      })
      const data = await res.data

      console.log(data)
      toast.success('Course created', {
        duration: 800
      })
      const cc = setTimeout(() => {
        router.push(`/teacher/courses/${data._id}`)
      }, 800)
      return () => clearTimeout(cc)
    } catch (error) {
      console.log(error)
      toast.error('Failed to create course')
    }
  }

  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g  'Next Js Bootcamp'" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex  items-center  gap-x-2'>
            <Link href={'/'}>
              <Button variant='ghost'>Cancel</Button>
            </Link>
            <Button type='submit'>Create</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default page
