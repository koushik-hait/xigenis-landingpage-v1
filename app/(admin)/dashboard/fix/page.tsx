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
  bgImage: "/assets/fix-bg.png", pillText: "THE FIX • AI ALGO-PLEX SYSTEM",
  heading: "You Don't Need More Leads.\n You Need a System That Closes.",
  description: "Not another portal. Not a freelancer running random ads. A full pipeline — built, managed, and optimised for one outcome: closed deals in 90 days.",
  btnText: "Build My Pipeline",
  card1Title: "Complete Ad-to-Close Funnel", card1Text: "Targeting, nurture, and conversion — fully managed.",
  card2Title: "Qualified Buyers Only", card2Text: "Pre-filtered buyer intent. No fake numbers, no time-wasters.",
  card3Title: "Referral Engine Built In", card3Text: "Past clients become your next pipeline automatically.",
  card4Title: "Automated in 5 Minutes", card4Text: "Every lead followed up instantly. Zero manual effort needed."
}

export default function FixCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'fix'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile') => { const file = e.target.files?.[0]; if (!file) return; setIsUploading(true); try { const formData = new FormData(); formData.append('file', file); const { success, finalUrl } = await uploadFile(formData); if (success && finalUrl) { handleChange(device, 'bgImage', finalUrl); toast.success("Image uploaded") } } catch (err) { toast.error("Upload failed") } finally { setIsUploading(false) } }
  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'fix', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader><CardTitle>Text Content (Left side)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Paragraph</Label><Textarea rows={4} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
            <div className="space-y-2"><Label>Button Text</Label><Input value={d.btnText} onChange={e => handleChange(device, 'btnText', e.target.value)} /></div>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Feature Cards (Right side)</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 1 Title</Label><Input value={d.card1Title} onChange={e => handleChange(device, 'card1Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 1 Text</Label><Textarea value={d.card1Text} onChange={e => handleChange(device, 'card1Text', e.target.value)} /></div></div>
                    <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 2 Title</Label><Input value={d.card2Title} onChange={e => handleChange(device, 'card2Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 2 Text</Label><Textarea value={d.card2Text} onChange={e => handleChange(device, 'card2Text', e.target.value)} /></div></div>
                    <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 3 Title</Label><Input value={d.card3Title} onChange={e => handleChange(device, 'card3Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 3 Text</Label><Textarea value={d.card3Text} onChange={e => handleChange(device, 'card3Text', e.target.value)} /></div></div>
                    <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Card 4 Title</Label><Input value={d.card4Title} onChange={e => handleChange(device, 'card4Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 4 Text</Label><Textarea value={d.card4Text} onChange={e => handleChange(device, 'card4Text', e.target.value)} /></div></div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Background Image</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-center">
                    <div className="relative mx-auto w-full h-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
                    {d.bgImage ? (<img src={d.bgImage} className="w-full h-full object-cover" />) : (<Upload className="opacity-20 w-8 h-8" />)}
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
        <h2 className="text-3xl font-bold">The Fix Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
