import { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { auth } from "@clerk/nextjs/server"
import { cookies } from "next/headers"
import { DomainSelector } from "@/components/admin/domain-selector"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { sessionClaims } = await auth()
  const role = sessionClaims?.metadata?.role || "user"
  const cookieStore = await cookies()
  const currentDomain = cookieStore.get('admin_domain')?.value || 'default'

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-80 border-r bg-muted/40 md:block">
        <AdminSidebar userRole={role} />
      </aside>
      <div className="flex flex-1 flex-col md:pl-80">
        <header className="flex h-14 items-center justify-between border-b px-4 md:px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="font-semibold text-sm">Content Management System</h1>
          <DomainSelector initialDomain={currentDomain} />
        </header>
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
        <footer className="border-t p-4 md:p-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Xigenis. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
