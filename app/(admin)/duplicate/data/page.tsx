'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  getDomainsWithContent, 
  getAllUniqueSections, 
  duplicateContent 
} from '@/app/actions/cms'
import { Loader2, Copy, AlertTriangle, CheckCircle2, ArrowRightLeft } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Available domains (matching domain-selector.tsx)
const AVAILABLE_DOMAINS = [
  { id: 'ca.xigenis.com', label: 'Main Site (CA)' },
  { id: 'cd.xigenis.com', label: 'CD' },
  { id: 'wa.xigenis.com', label: 'WA' },
  { id: 'wd.xigenis.com', label: 'WD' },
]

interface SectionInfo {
  page: string
  section: string
}

export default function DuplicateDataPage() {
  const [domains, setDomains] = useState<string[]>([])
  const [sections, setSections] = useState<SectionInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDuplicating, setIsDuplicating] = useState(false)
  
  // Form state
  const [sourceDomain, setSourceDomain] = useState('')
  const [destinationDomain, setDestinationDomain] = useState('')
  const [selectedPage, setSelectedPage] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [overwrite, setOverwrite] = useState(false)
  
  // Result state
  const [result, setResult] = useState<{
    success: boolean
    message?: string
    error?: string
    exists?: boolean
  } | null>(null)

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const [domainsData, sectionsData] = await Promise.all([
          getDomainsWithContent(),
          getAllUniqueSections()
        ])
        setDomains(domainsData.length > 0 ? domainsData : AVAILABLE_DOMAINS.map(d => d.id))
        setSections(sectionsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
        toast.error('Failed to load domain and section data')
        // Fallback to all available domains
        setDomains(AVAILABLE_DOMAINS.map(d => d.id))
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Get unique pages from sections
  const uniquePages = Array.from(new Set(sections.map(s => s.page)))
  
  // Get sections for selected page
  const sectionsForPage = sections.filter(s => s.page === selectedPage)

  // Handle page change - reset section
  const handlePageChange = (page: string) => {
    setSelectedPage(page)
    setSelectedSection('')
    setResult(null)
  }

  // Handle duplicate action
  const handleDuplicate = async () => {
    if (!sourceDomain || !destinationDomain || !selectedPage || !selectedSection) {
      toast.error('Please fill in all fields')
      return
    }

    if (sourceDomain === destinationDomain) {
      toast.error('Source and destination domains must be different')
      return
    }

    setIsDuplicating(true)
    setResult(null)

    try {
      const response = await duplicateContent(
        sourceDomain,
        destinationDomain,
        selectedPage,
        selectedSection,
        { overwrite }
      )

      setResult(response)

      if (response.success) {
        toast.success(response.message || 'Content duplicated successfully!')
      } else if (response.exists) {
        toast.error(response.error || 'Content already exists')
      } else {
        toast.error(response.error || 'Failed to duplicate content')
      }
    } catch (error) {
      console.error('Duplicate error:', error)
      toast.error('An unexpected error occurred')
      setResult({ success: false, error: 'An unexpected error occurred' })
    } finally {
      setIsDuplicating(false)
    }
  }

  // Get domain label
  const getDomainLabel = (domainId: string) => {
    const domain = AVAILABLE_DOMAINS.find(d => d.id === domainId)
    return domain ? `${domain.label} (${domainId})` : domainId
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Duplicate Content</h2>
          <p className="text-muted-foreground">
            Copy content from one domain&apos;s section to another domain&apos;s same section
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Content Transfer
          </CardTitle>
          <CardDescription>
            Select source domain, destination domain, page, and section to duplicate content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Source and Destination Row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Source Domain */}
            <div className="space-y-2">
              <Label htmlFor="source-domain">Source Domain</Label>
              <Select value={sourceDomain} onValueChange={(value) => { setSourceDomain(value); setResult(null); }}>
                <SelectTrigger id="source-domain">
                  <SelectValue placeholder="Select source domain" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_DOMAINS.map((domain) => (
                    <SelectItem key={domain.id} value={domain.id}>
                      {domain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Domain to copy content from
              </p>
            </div>

            {/* Destination Domain */}
            <div className="space-y-2">
              <Label htmlFor="destination-domain">Destination Domain</Label>
              <Select value={destinationDomain} onValueChange={(value) => { setDestinationDomain(value); setResult(null); }}>
                <SelectTrigger id="destination-domain">
                  <SelectValue placeholder="Select destination domain" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_DOMAINS.map((domain) => (
                    <SelectItem key={domain.id} value={domain.id}>
                      {domain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Domain to copy content to
              </p>
            </div>
          </div>

          {/* Page and Section Row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Page Selection */}
            <div className="space-y-2">
              <Label htmlFor="page-select">Page</Label>
              <Select value={selectedPage} onValueChange={handlePageChange}>
                <SelectTrigger id="page-select">
                  <SelectValue placeholder="Select page" />
                </SelectTrigger>
                <SelectContent>
                  {uniquePages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Page containing the section
              </p>
            </div>

            {/* Section Selection */}
            <div className="space-y-2">
              <Label htmlFor="section-select">Section</Label>
              <Select 
                value={selectedSection} 
                onValueChange={(value) => { setSelectedSection(value); setResult(null); }}
                disabled={!selectedPage}
              >
                <SelectTrigger id="section-select">
                  <SelectValue placeholder={selectedPage ? "Select section" : "Select page first"} />
                </SelectTrigger>
                <SelectContent>
                  {sectionsForPage.map((section) => (
                    <SelectItem key={section.section} value={section.section}>
                      {section.section.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Specific section to duplicate
              </p>
            </div>
          </div>

          {/* Overwrite Option */}
          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="overwrite"
              checked={overwrite}
              onCheckedChange={(checked) => { setOverwrite(checked as boolean); setResult(null); }}
            />
            <div className="space-y-1 leading-none">
              <Label
                htmlFor="overwrite"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Overwrite existing content
              </Label>
              <p className="text-xs text-muted-foreground">
                If content already exists at the destination, it will be replaced with the source content.
                Without this option, the duplicate operation will fail if content already exists.
              </p>
            </div>
          </div>

          {/* Result Alert */}
          {result && (
            <Alert variant={result.success ? 'default' : 'destructive'}>
              {result.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertTitle>
                {result.success ? 'Success' : result.exists ? 'Content Exists' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {result.message || result.error}
              </AlertDescription>
            </Alert>
          )}

          {/* Duplicate Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleDuplicate}
              disabled={isDuplicating || !sourceDomain || !destinationDomain || !selectedPage || !selectedSection}
              className="min-w-[200px]"
            >
              {isDuplicating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Duplicating...
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate Content
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      {(sourceDomain || destinationDomain || selectedPage || selectedSection) && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Operation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source:</span>
                <span className="font-medium">
                  {sourceDomain ? getDomainLabel(sourceDomain) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination:</span>
                <span className="font-medium">
                  {destinationDomain ? getDomainLabel(destinationDomain) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Page:</span>
                <span className="font-medium">
                  {selectedPage ? selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Section:</span>
                <span className="font-medium">
                  {selectedSection 
                    ? selectedSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                    : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overwrite Mode:</span>
                <span className="font-medium">
                  {overwrite ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
