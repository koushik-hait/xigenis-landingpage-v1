import "styles/tailwind.css"
import { Toaster } from "@/components/ui/sonner"
import {Agentation} from "agentation"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <>
          {children}
        </>
        <Toaster />
        <Agentation />
      </body>
    </html>
  )
}
