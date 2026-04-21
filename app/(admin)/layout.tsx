import { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { auth } from "@clerk/nextjs/server"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { sessionClaims } = await auth()
  const role = sessionClaims?.metadata?.role || "user"

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-80 border-r bg-muted/40 md:block">
        <AdminSidebar userRole={role} />
      </aside>
      <div className="flex flex-1 flex-col md:pl-80">
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
