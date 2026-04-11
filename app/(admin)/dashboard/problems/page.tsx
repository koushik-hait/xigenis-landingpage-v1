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
  pillText: "The Real Problem", heading: "You're not failing. Your pipeline has a leak.",
  description: "Agents closing 4–5 deals every 90 days aren't smarter. They just fixed these 3 things.",
  introPill: "Sound Familiar?", introHeading: "Your Lead Problem Is Not What You Think",
  introPoints: ["Do you spend ₹30K to ₹1L on ads and still get 80% fake numbers?", "Are you chasing 100 leads a month but can't get 4 site visits a week?", "Have you tried portals, freelancers, and cold calls and NOTHING worked consistently?"],
  introPara: "You're not bad at sales. You're using a broken system in a market that rewards speed, follow-up, and qualified traffic — not volume.",
  stat1Value: "900%", stat1Label: "Higher conversion when you respond within 5 minutes",
  stat2Value: "72%", stat2Label: "Agents say unqualified leads are their #1 problem",
  stat3Value: "3-5%", stat3Label: "Average lead-to-site-visit conversion in India",
  stat4Value: "60%", stat4Label: "Of leads die because no one follows up after Day 2",
  bgImage: "/assets/problems-bg.png",
  mainImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
}

export default function ProblemsCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState<'bg' | 'main' | null>(null)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'problems'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile', type: 'bgImage' | 'mainImage') => { const file = e.target.files?.[0]; if (!file) return; setUploadingImage(type === 'bgImage' ? 'bg' : 'main'); try { const formData = new FormData(); formData.append('file', file); const { success, finalUrl } = await uploadFile(formData); if (success && finalUrl) { handleChange(device, type, finalUrl); toast.success("Image uploaded") } } catch (err) { toast.error("Upload failed") } finally { setUploadingImage(null) } }
  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'problems', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Main Section Content</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Section Pill</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Section Heading</Label><Input value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
            <div className="space-y-2 md:col-span-2"><Label>Section Description</Label><Textarea value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
            <div className="space-y-2"><Label>Intro Pill</Label><Input value={d.introPill} onChange={e => handleChange(device, 'introPill', e.target.value)} /></div>
            <div className="space-y-2"><Label>Intro Heading</Label><Input value={d.introHeading} onChange={e => handleChange(device, 'introHeading', e.target.value)} /></div>
            <div className="space-y-2 md:col-span-2"><Label>Intro Paragraph</Label><Textarea value={d.introPara} onChange={e => handleChange(device, 'introPara', e.target.value)} /></div>
            <div className="space-y-2 md:col-span-2"><Label>Intro Points (One per line)</Label><Textarea rows={4} value={d.introPoints.join('\n')} onChange={e => handleChange(device, 'introPoints', e.target.value.split('\n'))} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Floating Stats</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-3 gap-2 border-b pb-4"><div className="col-span-1"><Label>Stat 1 Value</Label><Input value={d.stat1Value} onChange={e => handleChange(device, 'stat1Value', e.target.value)} /></div><div className="col-span-2"><Label>Stat 1 Label</Label><Input value={d.stat1Label} onChange={e => handleChange(device, 'stat1Label', e.target.value)} /></div></div>
            <div className="grid grid-cols-3 gap-2 border-b pb-4"><div className="col-span-1"><Label>Stat 2 Value</Label><Input value={d.stat2Value} onChange={e => handleChange(device, 'stat2Value', e.target.value)} /></div><div className="col-span-2"><Label>Stat 2 Label</Label><Input value={d.stat2Label} onChange={e => handleChange(device, 'stat2Label', e.target.value)} /></div></div>
            <div className="grid grid-cols-3 gap-2 border-b pb-4"><div className="col-span-1"><Label>Stat 3 Value</Label><Input value={d.stat3Value} onChange={e => handleChange(device, 'stat3Value', e.target.value)} /></div><div className="col-span-2"><Label>Stat 3 Label</Label><Input value={d.stat3Label} onChange={e => handleChange(device, 'stat3Label', e.target.value)} /></div></div>
            <div className="grid grid-cols-3 gap-2"><div className="col-span-1"><Label>Stat 4 Value</Label><Input value={d.stat4Value} onChange={e => handleChange(device, 'stat4Value', e.target.value)} /></div><div className="col-span-2"><Label>Stat 4 Label</Label><Input value={d.stat4Label} onChange={e => handleChange(device, 'stat4Label', e.target.value)} /></div></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Images</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2"><Label>Background Image</Label><div className="relative w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden">{d.bgImage ? <img src={d.bgImage} className="w-full h-full object-cover" /> : <Upload className="opacity-20" />}<Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, device, 'bgImage')} />{uploadingImage === 'bg' && <div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}</div></div>
            <div className="space-y-2"><Label>Main Subject Image</Label><div className="relative w-full h-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden">{d.mainImage ? <img src={d.mainImage} className="w-full h-full object-cover" /> : <Upload className="opacity-20" />}<Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, device, 'mainImage')} />{uploadingImage === 'main' && <div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}</div></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Problems Overview CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
