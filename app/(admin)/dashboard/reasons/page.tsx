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
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: "LOREM IPSUM DOLOR SIT",
  heading: "8 Reasons Top Real Estate Professionals \n Choose Our AI Lead System",
  description: "Most agencies promise leads. We build a predictable pipeline of qualified property buyers that turns into site visits and closed deals.",
  reasons: [
    { tag: "EXCLUSIVE MARKET ACCESS", title: "Secure Your Market Before a Competitor Does & Own Your City", desc: "We take one client per property segment per city. Once your slot is filled, your competitors can never access the same system — ever." },
    { tag: "RESULTS-FOCUSED SYSTEM", title: "We Measure Success Only by Closed Deals", desc: "Unlike traditional marketing agencies that focus on impressions or clicks, our system is built around real outcomes." },
    { tag: "AI Lead Qualification", title: "Speak Only With Serious Buyers", desc: "Our AI system filters leads based on intent, engagement, and buying capability." },
    { tag: "Automated Follow-Up System", title: "Every Lead Gets Instant Attention", desc: "Most deals are lost because agents respond too late. Our system follows up instantly." },
    { tag: "Data-Driven Campaign Strategy", title: "Advertising Designed for Real Buyers", desc: "We create campaigns focused on people actively searching for properties in your market." },
    { tag: "Authority Positioning", title: "Become the Trusted Expert in Your Market", desc: "We help position you as a trusted property advisor." },
    { tag: "Predictable Lead Pipeline", title: "Speak Only With Serious Buyers", desc: "Our system creates a steady flow of qualified property buyers." },
    { tag: "Automated Follow-Up System", title: "See Measurable Results Within 90 Days", desc: "Our framework is designed to deliver visible progress within three months." },
  ]
}

export default function ReasonsCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'reasons'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleReasonChange = (device: 'desktop' | 'mobile', index: number, key: string, value: string) => {
    const newReasons = [...content[device].reasons]
    newReasons[index] = { ...newReasons[index], [key]: value } as any
    handleChange(device, 'reasons', newReasons)
  }
  const addReason = (device: 'desktop' | 'mobile') => { handleChange(device, 'reasons', [...content[device].reasons, { tag: "NEW TAG", title: "New Reason", desc: "Description here" }]) }
  const removeReason = (device: 'desktop' | 'mobile', index: number) => { handleChange(device, 'reasons', content[device].reasons.filter((_: any, i: number) => i !== index)) }

  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'reasons', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 mt-4">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading (Use \n for breaks)</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={4} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center"><CardTitle>Reasons Cards</CardTitle><Button size="sm" onClick={() => addReason(device)}><Plus className="w-4 h-4 mr-2"/>Add Card</Button></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {d.reasons.map((reason, i) => (
                <div key={i} className="p-4 border rounded relative space-y-3 bg-muted/20">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeReason(device, i)}><Trash className="w-4 h-4" /></Button>
                  <p className="font-bold text-sm">Reason #{i+1}</p>
                  <div className="space-y-1"><Label className="text-xs">Tag</Label><Input value={reason.tag} onChange={e => handleReasonChange(device, i, 'tag', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Title</Label><Textarea value={reason.title} onChange={e => handleReasonChange(device, i, 'title', e.target.value)} /></div>
                  <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea rows={3} value={reason.desc} onChange={e => handleReasonChange(device, i, 'desc', e.target.value)} /></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Reasons Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
