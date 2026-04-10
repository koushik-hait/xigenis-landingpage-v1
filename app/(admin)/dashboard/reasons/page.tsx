'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { Loader2, Plus, Trash } from 'lucide-react'

const defaultContent = {
  pillText: "LOREM IPSUM DOLOR SIT",
  heading: "8 Reasons Top Real Estate Professionals \n Choose Our AI Lead System",
  description: "Most agencies promise leads. We build a predictable pipeline of qualified property buyers that turns into site visits and closed deals.",
  reasons: [
    {
      tag: "EXCLUSIVE MARKET ACCESS",
      title: "Secure Your Market Before a Competitor Does & Own Your City",
      desc: "We take one client per property segment per city. Once your slot is filled, your competitors can never access the same system — ever.",
    },
    {
      tag: "RESULTS-FOCUSED SYSTEM",
      title: "We Measure Success Only by Closed Deals",
      desc: "Unlike traditional marketing agencies that focus on impressions or clicks, our system is built around real outcomes.",
    },
    {
      tag: "AI Lead Qualification",
      title: "Speak Only With Serious Buyers",
      desc: "Our AI system filters leads based on intent, engagement, and buying capability, ensuring you spend time only with potential buyers.",
    },
    {
      tag: "Automated Follow-Up System",
      title: "Every Lead Gets Instant Attention",
      desc: "Most deals are lost because agents respond too late. Our system follows up with every inquiry instantly.",
    },
    {
      tag: "Data-Driven Campaign Strategy",
      title: "Advertising Designed for Real Buyers",
      desc: "Instead of generic ads, we create campaigns focused on people actively searching for properties in your market.",
    },
    {
      tag: "Authority Positioning",
      title: "Become the Trusted Expert in Your Market",
      desc: "We help position you as a trusted property advisor, increasing credibility and attracting serious buyers.",
    },
    {
      tag: "Predictable Lead Pipeline",
      title: "Speak Only With Serious Buyers",
      desc: "Our system creates a steady flow of qualified property buyers, so you no longer depend on random portal leads.",
    },
    {
      tag: "Automated Follow-Up System",
      title: "See Measurable Results Within 90 Days",
      desc: "From campaign launch to site visits and bookings, our framework is designed to deliver visible progress within three months.",
    },
  ]
}

export default function ReasonsCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'reasons')
      if (data) setContent({ ...defaultContent, ...data })
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleReasonChange = (index: number, key: string, value: string) => {
    setContent(prev => {
      const newReasons = [...prev.reasons]
      newReasons[index] = { ...newReasons[index], [key]: value } as any
      return { ...prev, reasons: newReasons }
    })
  }

  const addReason = () => {
    setContent(prev => ({
      ...prev,
      reasons: [...prev.reasons, { tag: "NEW TAG", title: "New Reason", desc: "Description here" }]
    }))
  }

  const removeReason = (index: number) => {
    setContent(prev => ({
      ...prev,
      reasons: prev.reasons.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'reasons', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Reasons Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading (Use \n for breaks)</Label><Textarea value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={4} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Reasons Cards</CardTitle>
            <Button size="sm" onClick={addReason}><Plus className="w-4 h-4 mr-2"/> Add Card</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.reasons.map((reason, i) => (
                <div key={i} className="p-4 border rounded relative space-y-3 bg-muted/20">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeReason(i)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                  <p className="font-bold text-sm">Reason #{i+1}</p>
                  <div className="space-y-1"><Label className="text-xs">Tag</Label><Input value={reason.tag} onChange={e => handleReasonChange(i, 'tag', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Title</Label><Textarea value={reason.title} onChange={e => handleReasonChange(i, 'title', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea rows={3} value={reason.desc} onChange={e => handleReasonChange(i, 'desc', e.target.value)} /></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
