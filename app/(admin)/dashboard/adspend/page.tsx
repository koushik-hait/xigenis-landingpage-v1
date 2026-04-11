'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { uploadFile } from '@/app/actions/upload'
import { Loader2, Upload } from 'lucide-react'
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: "PROBLEM 03 • LEAD QUALITY",
  heading: "Burning ₹30K—₹1L Monthly \n on Ads That Convert Nothing",
  description: "Running ads yourself or with a cheap freelancer? Poor targeting and zero funnel follow-up kill your ROI before a single visit happens.",
  points: ["Wrong audience targeting means paying to reach non-buyers.", "No nurture funnel means leads evaporate after the first click.", "AI Algo-Plex runs a complete paid acquisition system end-to-end."],
  mainStatValue: "83%",
  mainStatText: "of Meta real estate campaigns fail due to poor targeting and no follow-up funnel.",
  card1Value: "₹80K", card1Label: "Ad Spend / Month",
  card2Value: "94", card2Label: "Leads Generated",
  card3Value: "0—1", card3Label: "Deals Closed",
  card4Value: "3—4", card4Label: "Site Visits Booked", card4SubText: "83% of Meta campaigns end here",
  mainImage: "/assets/man.png"
}

export default function AdSpendCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'adspend'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile') => { const file = e.target.files?.[0]; if (!file) return; setIsUploading(true); try { const formData = new FormData(); formData.append('file', file); const { success, finalUrl } = await uploadFile(formData); if (success && finalUrl) { handleChange(device, 'mainImage', finalUrl); toast.success("Image uploaded") } } catch (err) { toast.error("Upload failed") } finally { setIsUploading(false) } }
  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'adspend', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader><CardTitle>Text Content (Right side)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Paragraph</Label><Textarea rows={4} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
            <div className="space-y-2"><Label>Bullet Points (One per line)</Label><Textarea rows={4} value={d.points.join('\n')} onChange={e => handleChange(device, 'points', e.target.value.split('\n'))} /></div>
            <div className="border-t pt-4 space-y-4">
                <div className="space-y-2"><Label>Footer Stat Box Value</Label><Input value={d.mainStatValue} onChange={e => handleChange(device, 'mainStatValue', e.target.value)} /></div>
                <div className="space-y-2"><Label>Footer Stat Box Text</Label><Textarea value={d.mainStatText} onChange={e => handleChange(device, 'mainStatText', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
            <CardHeader><CardTitle>Floating Cards (Left side)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 1 Value</Label><Input value={d.card1Value} onChange={e => handleChange(device, 'card1Value', e.target.value)} /></div><div className="space-y-2"><Label>Card 1 Label</Label><Input value={d.card1Label} onChange={e => handleChange(device, 'card1Label', e.target.value)} /></div></div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 2 Value</Label><Input value={d.card2Value} onChange={e => handleChange(device, 'card2Value', e.target.value)} /></div><div className="space-y-2"><Label>Card 2 Label</Label><Input value={d.card2Label} onChange={e => handleChange(device, 'card2Label', e.target.value)} /></div></div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 3 Value</Label><Input value={d.card3Value} onChange={e => handleChange(device, 'card3Value', e.target.value)} /></div><div className="space-y-2"><Label>Card 3 Label</Label><Input value={d.card3Label} onChange={e => handleChange(device, 'card3Label', e.target.value)} /></div></div>
                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Card 4 Value</Label><Input value={d.card4Value} onChange={e => handleChange(device, 'card4Value', e.target.value)} /></div><div className="space-y-2"><Label>Card 4 Label</Label><Input value={d.card4Label} className="mb-2" onChange={e => handleChange(device, 'card4Label', e.target.value)} /><Label>Card 4 Subtext</Label><Input value={d.card4SubText} onChange={e => handleChange(device, 'card4SubText', e.target.value)} /></div></div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader><CardTitle>Main Subject Image</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-center">
                <div className="relative mx-auto w-48 h-64 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
                {d.mainImage ? (<img src={d.mainImage} className="w-full h-full object-cover" />) : (<Upload className="opacity-20 w-8 h-8" />)}
                <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, device)} />
                {isUploading && (<div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Loader2 className="animate-spin" /></div>)}
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Ad Spend CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
