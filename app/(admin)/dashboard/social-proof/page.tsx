'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { uploadFile } from '@/app/actions/upload'
import { Loader2, Plus, Trash2, Upload } from 'lucide-react'
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

// Hardcoded default positions for avatar visually floating overlay effect
const avatarDefaults = [
    { size: 72, top: "8%", left: "12%" },
    { size: 80, top: "5%", left: "32%" },
    { size: 76, top: "8%", left: "68%" },
    { size: 68, top: "4%", left: "86%" },
    { size: 72, top: "28%", left: "22%" },
    { size: 64, top: "32%", left: "78%" },
]

const defaultContent = {
  pillText: "Testimonials",
  heading: "Trusted by Real Estate Professionals \n Across Cities",
  headingSize: "48",
  description: "See how agents, brokers, and developers are generating qualified buyer leads, increasing site visits, and closing more property deals with our proven system.",
  descriptionSize: "16",
  btnText: "See How It Works",
  testimonials: [
    { name: "Rahul Sharma", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", alt: "Real estate professional", rating: "5", quote: "The system completely changed how we generate buyer leads." },
    { name: "Priya Nair", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", alt: "Property agent", rating: "5", quote: "Before Xigenis, we were spending ₹1L/month on portals with zero tracking." },
    { name: "Amrita Verma", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", alt: "Broker", rating: "5", quote: "320+ qualified buyer leads in 60 days. ₹4.2 Cr property deals closed." },
    { name: "Vikram Desai", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop", alt: "Channel partner", rating: "5", quote: "We closed 8 deals within the first quarter." },
    { name: "Sneha Kapoor", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", alt: "Sales professional", rating: "5", quote: "Our site visit ratio jumped from 5% to 22%." },
    { name: "Rajesh Kumar", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", alt: "Marketing lead", rating: "5", quote: "The AI-driven follow-up system ensures no lead ever goes cold." }
  ]
}

export default function SocialProofCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingValue, setIsUploadingValue] = useState<number | null>(null) 

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'social-proof'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleTestimonialChange = (device: 'desktop' | 'mobile', index: number, key: string, value: string) => {
    const newData = [...content[device].testimonials]
    newData[index] = { ...newData[index], [key]: value } as any
    handleChange(device, 'testimonials', newData)
  }
  const addTestimonial = (device: 'desktop' | 'mobile') => { handleChange(device, 'testimonials', [...content[device].testimonials, { name: "New Person", src: "", alt: "Role", rating: "5", quote: "New Quote" }]) }
  const removeTestimonial = (device: 'desktop' | 'mobile', index: number) => { handleChange(device, 'testimonials', content[device].testimonials.filter((_: any, i: number) => i !== index)) }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile', arrayIndex: number) => {
    const file = e.target.files?.[0]; if (!file) return
    setIsUploadingValue(arrayIndex)
    try { const formData = new FormData(); formData.append('file', file); const { success, finalUrl } = await uploadFile(formData); if (success && finalUrl) { handleTestimonialChange(device, arrayIndex, 'src', finalUrl); toast.success("Image uploaded") } } catch (err) { toast.error("Upload failed") } finally { setIsUploadingValue(null) }
  }

  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'social-proof', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <Card>
                <CardHeader><CardTitle>Text Content Header</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange(device, 'headingSize', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Description paragraph</Label><Textarea rows={3} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={d.descriptionSize} onChange={e => handleChange(device, 'descriptionSize', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Button Text</Label><Input value={d.btnText} onChange={e => handleChange(device, 'btnText', e.target.value)} /></div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1"><CardTitle>Testimonials Array</CardTitle><CardDescription>First 6 avatars will be used for the floating background effect. All are part of the slider.</CardDescription></div>
                    <Button variant="outline" size="sm" onClick={() => addTestimonial(device)}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto pt-4">
                    {d.testimonials.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md relative space-y-4 bg-muted/10 shadow-sm">
                            <div className="absolute right-2 top-2 flex items-center justify-center gap-2">
                                <span className="text-xs text-muted-foreground mr-2 font-mono">#{index + 1}</span>
                                <Button type="button" variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8" onClick={() => removeTestimonial(device, index)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pr-16">
                                <div className="space-y-2"><Label>Name</Label><Input value={item.name} onChange={e => handleTestimonialChange(device, index, 'name', e.target.value)} /></div>
                                <div className="space-y-2"><Label>Rating (1-5)</Label><Input type="number" min="1" max="5" value={item.rating} onChange={e => handleTestimonialChange(device, index, 'rating', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4"><div className="space-y-2 col-span-2"><Label>Quote</Label><Textarea value={item.quote} onChange={e => handleTestimonialChange(device, index, 'quote', e.target.value)} /></div></div>
                            <div className="space-y-2">
                                <Label>Avatar Image ({item.alt})</Label>
                                <div className="flex gap-4 items-center">
                                    {item.src && <img src={item.src} className="w-10 h-10 rounded-full object-cover border" />}
                                    <Input value={item.src} onChange={e => handleTestimonialChange(device, index, 'src', e.target.value)} className="flex-1" />
                                    <div className="relative overflow-hidden shrink-0">
                                        <Button type="button" variant="outline" disabled={isUploadingValue === index}>{isUploadingValue === index ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}Upload</Button>
                                        <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, device, index)} />
                                    </div>
                                </div>
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
        <h2 className="text-3xl font-bold">Social Proof / Testimonials CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
