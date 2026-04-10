import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { auth } from '@clerk/nextjs/server'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role || 'user';

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={role} />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  )
}
