'use client'
import { getCourseById } from '../../../../../lib/helpers/courseHelper'
import { useUser } from '@clerk/nextjs'
import {
  IndianRupee,
  Layout,
  LayoutDashboard,
  ListChecks,
  ListChecksIcon
} from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import ImageUploader from './_components/ImageUploader'
import CategoryForm from './_components/CategoryForm'
import PriceForm from './_components/PriceForm'
import AttachmentForm from './_components/AttachmentForm'

const page = () => {
  const { userId } = useUser()
  const [course, setCourse] = useState([])
  const { id } = useParams()
  const [data, setData] = useState({})
  useEffect(() => {
    getCourseById(id)
      .then(res => {
        setCourse(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [data])

  const isCreater = course?.userId === userId
  const RequiredFields = [
    course?.title,
    course?.description,
    course?.price,
    course?.category,
    course?.imageUrl
  ]
  const toatlFields = RequiredFields.length
  const FilledFields = RequiredFields.filter(field => {
    return field != null || field != undefined
  }).length

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between '>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>Course Setup</h1>
          <span className='text-sm text-slate-700'>
            {FilledFields === toatlFields
              ? 'Your course is ready to publish'
              : `Fill all the fields to publish  (${FilledFields}/${toatlFields} ) `}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-16 '>
        <div>
          <div className='flex items-center gap-x-2 '>
            <div className='w-14 h-14 flex items-center justify-center   rounded-full bg-sky-100 '>
              <LayoutDashboard className='w-10 h-10 text-sky-700' />
            </div>
            <h2 className='text-xl font-semibold'>Customize Your Course</h2>
          </div>

          <div>
            <TitleForm initialValues={course} courseId={id} setData={setData} />
            <DescriptionForm
              initialValues={course}
              courseId={id}
              setData={setData}
            />
            <ImageUploader
              initialValues={course}
              courseId={id}
              setData={setData}
            />
            <CategoryForm
              initialValues={course}
              courseId={id}
              setData={setData}
            />
          </div>
        </div>

        <div className='py-2 space-y-8'>
          <div className='flex  gap-x-2   flex-col justify-start '>
            <div className='flex  items-center gap-x-2'>
              <div className='w-14 h-14 flex items-center justify-center   rounded-full bg-sky-100 '>
                <ListChecksIcon className='w-10 h-10 text-sky-700' />
              </div>
              <h2 className='text-xl font-semibold'>Course Chapters</h2>
            </div>
            <div>
              <h1>todos</h1>
            </div>
          </div>

          <div className='flex gap-x-4 items-center'>
            <div className='w-14 h-14 flex items-center justify-center   rounded-full bg-sky-100 '>
              <IndianRupee className='w-10 h-10 text-sky-700' />
            </div>
            <div>
              <h2 className='text-xl font-semibold'>Sell Your Course</h2>
            </div>
          </div>
          <PriceForm initialValues={course} courseId={id} setData={setData} />
          <AttachmentForm initialValues={course} courseId={id} setData={setData} />
        </div>
      </div>
    </div>
  )
}

export default page
