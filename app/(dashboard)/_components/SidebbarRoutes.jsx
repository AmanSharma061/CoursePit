'use client'
import { BarChart, Compass, Layout, List } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import SidebarItem from './SidebarItem'

const SidebbarRoutes = () => {
  const guestRoutes = [
    {
      icon: Layout,
      label: 'Dashboard',
      href: '/'
    },
    {
      icon: Compass,
      label: 'Explore',
      href: '/explore'
    }
  ]

  const teacherRoutes = [
    {
      icon: List,
      label: 'Courses',
      href: '/teacher/courses'
    },
    {
      icon: BarChart,
      label: 'Analytics',
      href: '/teacher/analytics'
    }
  ]

  const pathname = usePathname()
  const routes = pathname.includes('/teacher') ? teacherRoutes : guestRoutes
  return (
    <div className='flex flex-col w-full'>
      {routes.map(route => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebbarRoutes
