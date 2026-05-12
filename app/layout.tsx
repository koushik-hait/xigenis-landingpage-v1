import { ClerkProvider } from '@clerk/nextjs'
import "styles/tailwind.css"
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <>
            {children}
          </>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
