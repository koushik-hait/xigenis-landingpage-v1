import { ClerkProvider } from '@clerk/nextjs'
import "styles/tailwind.css"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Agentation } from "agentation";
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
          <Agentation />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
