"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { setAdminDomain } from "@/app/actions/cms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// These could be dynamic from the DB, but for now we list the common ones
// plus ca.xigenis.com which is the main fallback.
const AVAILABLE_DOMAINS = [
  { id: "ca.xigenis.com", label: "Main Site (CA)" },
  { id: "cd.xigenis.com", label: "CD" },
  { id: "wa.xigenis.com", label: "WA" },
  { id: "wd.xigenis.com", label: "WD" },
]

export function DomainSelector({ initialDomain = "ca.xigenis.com" }: { initialDomain?: string }) {
  const router = useRouter()
  const [domain, setDomain] = useState(initialDomain)

  const handleDomainChange = async (newDomain: string) => {
    setDomain(newDomain)
    await setAdminDomain(newDomain)
    // Refresh the current route to refetch CMS data for the new domain
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-muted-foreground text-sm font-medium">Editing:</span>
      <Select value={domain} onValueChange={handleDomainChange}>
        <SelectTrigger className="h-8 w-[200px] text-sm">
          <SelectValue placeholder="Select Domain" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_DOMAINS.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
