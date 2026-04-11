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
import { Loader2, Upload, Plus, Trash2 } from 'lucide-react'
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: "Sales Insights", heading: "Real Estate \n Performance Metrics",
  headingSize: "48",
  description: "Turning property insights into measurable success across every segment.",
  descriptionSize: "16",
  btnText: "See How It Works",
  mainCardBg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  mainCardTitle: "Residential Real Estate", mainCardSubtitle: "Achievement Metrics:",
  mainCardStat1Value: "340+", mainCardStat1Label: "Residential Campaigns Delivered",
  mainCardStat2Value: "78%", mainCardStat2Label: "Pre-Qualified Buyer Rate",
  metricsData: [
    { title: "Commercial Real Estate", image: "https://images.unsplash.com/photo-1486406146926-c627a92af1bd?q=80&w=2072&auto=format&fit=crop" },
    { title: "Industrial Real Estate", image: "https://images.unsplash.com/photo-1590674116584-d131495c256a?q=80&w=2070&auto=format&fit=crop" },
    { title: "Farmlands & Farmhouses", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop" },
    { title: "Special Purpose Real Estate", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1996&auto=format&fit=crop" }
  ]
}

export default function PerformanceCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingValue, setIsUploadingValue] = useState<string | null>(null)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'performance'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleMetricDataChange = (device: 'desktop' | 'mobile', index: number, key: string, value: string) => {
    const newData = [...content[device].metricsData]
    newData[index] = { ...newData[index], [key]: value } as any
    handleChange(device, 'metricsData', newData)
  }
  const addMetricCard = (device: 'desktop' | 'mobile') => { handleChange(device, 'metricsData', [...content[device].metricsData, { title: "New Metric", image: "" }]) }
  const removeMetricCard = (device: 'desktop' | 'mobile', index: number) => { handleChange(device, 'metricsData', content[device].metricsData.filter((_: any, i: number) => i !== index)) }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile', fieldKey: string, arrayIndex: number | null = null) => {
    const file = e.target.files?.[0]; if (!file) return
    setIsUploadingValue(fieldKey + (arrayIndex !== null ? `-${arrayIndex}` : ''))
    try { const formData = new FormData(); formData.append('file', file); const { success, finalUrl } = await uploadFile(formData); if (success && finalUrl) { if (arrayIndex !== null) { handleMetricDataChange(device, arrayIndex, fieldKey, finalUrl) } else { handleChange(device, fieldKey, finalUrl) } toast.success("Image uploaded") } } catch (err) { toast.error("Upload failed") } finally { setIsUploadingValue(null) }
  }

  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'performance', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Text Content Header</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange(device, 'headingSize', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={d.descriptionSize} onChange={e => handleChange(device, 'descriptionSize', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Button Text</Label><Input value={d.btnText} onChange={e => handleChange(device, 'btnText', e.target.value)} /></div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Main Featured Card</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Main Card Title</Label><Input value={d.mainCardTitle} onChange={e => handleChange(device, 'mainCardTitle', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Main Card Subtitle</Label><Input value={d.mainCardSubtitle} onChange={e => handleChange(device, 'mainCardSubtitle', e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-4 border-t pt-4"><div className="space-y-2"><Label>Stat 1 Value</Label><Input value={d.mainCardStat1Value} onChange={e => handleChange(device, 'mainCardStat1Value', e.target.value)} /></div><div className="space-y-2"><Label>Stat 1 Label</Label><Textarea value={d.mainCardStat1Label} onChange={e => handleChange(device, 'mainCardStat1Label', e.target.value)} /></div></div>
                    <div className="grid grid-cols-2 gap-4 border-t pt-4"><div className="space-y-2"><Label>Stat 2 Value</Label><Input value={d.mainCardStat2Value} onChange={e => handleChange(device, 'mainCardStat2Value', e.target.value)} /></div><div className="space-y-2"><Label>Stat 2 Label</Label><Textarea value={d.mainCardStat2Label} onChange={e => handleChange(device, 'mainCardStat2Label', e.target.value)} /></div></div>
                    <div className="space-y-2 pt-4"><Label>Featured Card Background Image</Label>
                        <div className="flex gap-4"><Input value={d.mainCardBg} onChange={e => handleChange(device, 'mainCardBg', e.target.value)} className="flex-1" /><div className="relative overflow-hidden"><Button type="button" variant="outline" disabled={isUploadingValue === 'mainCardBg'}>{isUploadingValue === 'mainCardBg' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}Upload</Button><Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, device, 'mainCardBg')} /></div></div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Masonry Grid Cards</CardTitle><Button variant="outline" size="sm" onClick={() => addMetricCard(device)}><Plus className="w-4 h-4 mr-1" /> Add Card</Button></CardHeader>
                <CardContent className="space-y-6">
                    {d.metricsData.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md relative space-y-4 bg-muted/20">
                            <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-2 text-destructive hover:bg-destructive/10" onClick={() => removeMetricCard(device, index)}><Trash2 className="w-4 h-4" /></Button>
                            <div className="space-y-2 pr-8"><Label>Title {index + 1}</Label><Input value={item.title} onChange={e => handleMetricDataChange(device, index, 'title', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Background Image URL / Upload</Label>
                                <div className="flex gap-4"><Input value={item.image} onChange={e => handleMetricDataChange(device, index, 'image', e.target.value)} className="flex-1" /><div className="relative overflow-hidden"><Button type="button" variant="outline" disabled={isUploadingValue === `image-${index}`}>{isUploadingValue === `image-${index}` ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}Upload</Button><Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, device, 'image', index)} /></div></div>
                                {item.image && (<img src={item.image} alt="Preview" className="h-20 object-cover mt-2 rounded border" />)}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Performance Metrics CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
