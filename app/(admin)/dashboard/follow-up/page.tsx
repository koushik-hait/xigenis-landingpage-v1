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
  pillText: "Problem 02 • Follow-up Failure",
  heading: "60% of Your Leads Go Cold Because No One Followed Up",
  headingSize: "48",
  description: "Excel sheets and manual calls don't scale. Most agents lose their best leads in 48 hours — simply too busy to call back in time.",
  descriptionSize: "16",
  points: [
    "Serious buyers lose interest fast. Speed wins deals.",
    "Manual follow-up burns 20–30 hrs every single week.",
    "Our system auto-responds in under 5 minutes. Always."
  ],
  mainStatValue: "60%",
  mainStatText: "of leads are never followed up after Day 2. Deals you already paid for, silently slipping away.",
  agentRespValue: "24h",
  agentRespText: "Avg. agent response",
  aiRespValue: "5m",
  aiRespText: "AI Algo-Plex response",
  mobileImage: "/assets/follow-up-mobile.png"
}

export default function FollowUpCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'follow-up'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0]; if (!file) return
    setIsUploading(true)
    try { const formData = new FormData(); formData.append('file', file); const { success, finalUrl } = await uploadFile(formData); if (success && finalUrl) { handleChange(device, 'mobileImage', finalUrl); toast.success("Image uploaded") } } catch (err) { toast.error("Upload failed") } finally { setIsUploading(false) }
  }

  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'follow-up', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
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
            <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange(device, 'headingSize', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Paragraph</Label><Textarea rows={4} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={d.descriptionSize} onChange={e => handleChange(device, 'descriptionSize', e.target.value)} /></div>
            <div className="space-y-2"><Label>Bullet Points (One per line)</Label><Textarea rows={4} value={d.points.join('\n')} onChange={e => handleChange(device, 'points', e.target.value.split('\n'))} /></div>
            <div className="border-t pt-4 space-y-4">
                <div className="space-y-2"><Label>Main Stat Box Value</Label><Input value={d.mainStatValue} onChange={e => handleChange(device, 'mainStatValue', e.target.value)} /></div>
                <div className="space-y-2"><Label>Main Stat Box Text</Label><Textarea value={d.mainStatText} onChange={e => handleChange(device, 'mainStatText', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
            <CardHeader><CardTitle>Floating Cards (Right side)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div className="space-y-2"><Label>Agent Response Value</Label><Input value={d.agentRespValue} onChange={e => handleChange(device, 'agentRespValue', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Agent Response Text</Label><Input value={d.agentRespText} onChange={e => handleChange(device, 'agentRespText', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>AI Response Value</Label><Input value={d.aiRespValue} onChange={e => handleChange(device, 'aiRespValue', e.target.value)} /></div>
                    <div className="space-y-2"><Label>AI Response Text</Label><Input value={d.aiRespText} onChange={e => handleChange(device, 'aiRespText', e.target.value)} /></div>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader><CardTitle>Phone View</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-center">
                <div className="relative mx-auto w-48 h-96 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
                {d.mobileImage ? (<img src={d.mobileImage} className="w-full h-full object-cover" />) : (<Upload className="opacity-20 w-8 h-8" />)}
                <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, device)} />
                {isUploading && (<div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Loader2 className="animate-spin" /></div>)}
                </div>
                <p className="text-xs text-muted-foreground">Upload mobile frame background image</p>
            </CardContent>
            </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Follow Up CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
