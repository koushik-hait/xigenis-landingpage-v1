'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Building,
  Shield,
  LogOut,
} from 'lucide-react'

interface MenuItem {
  title: string
  href?: string
  icon: React.ReactNode
  children?: MenuItem[]
  requiredRole?: 'admin' | 'manager' | 'user'
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: 'Users',
    icon: <Users className="h-4 w-4" />,
    requiredRole: 'admin',
    children: [
      {
        title: 'All Users',
        href: '/users',
        icon: <Users className="h-3 w-3" />,
      },
      {
        title: 'Roles & Permissions',
        href: '/users/roles',
        icon: <Shield className="h-3 w-3" />,
      },
    ],
  },
  {
    title: 'Projects',
    icon: <Building className="h-4 w-4" />,
    children: [
      {
        title: 'All Projects',
        href: '/projects',
        icon: <Building className="h-3 w-3" />,
      },
      {
        title: 'Create Project',
        href: '/projects/create',
        icon: <FileText className="h-3 w-3" />,
      },
    ],
  },
  {
    title: 'Content Settings',
    icon: <FileText className="h-4 w-4" />,
    children: [
      {
        title: 'Hero Section',
        href: '/dashboard/hero',
        icon: <FileText className="h-3 w-3" />,
      },
    ],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
    requiredRole: 'admin',
  },
]

export function AdminSidebar({ userRole = 'user' }: { userRole?: 'admin' | 'manager' | 'user' }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Users', 'Projects'])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const hasPermission = (requiredRole?: string) => {
    if (!requiredRole) return true
    const roleHierarchy = { admin: 3, manager: 2, user: 1 }
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole as keyof typeof roleHierarchy]
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (!hasPermission(item.requiredRole)) return null

    const isActive = item.href === pathname
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.title}>
        <div
          className={cn(
            'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer',
            isActive && 'bg-accent text-accent-foreground',
            level > 0 && 'ml-4'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.title)
            } else if (item.href) {
              window.location.href = item.href
            }
          }}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.title}</span>
          </div>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6" />
            <span className="">Xigenis Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <SignOutButton>
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SignOutButton>
        </div>
      </div>
    </div>
  )
}
