"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Save, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Image from "next/image"
import { getCmsContent, upsertCmsContent } from "@/app/actions/cms"
import { uploadFile } from "@/app/actions/upload"
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: "Testimonials", heading: "Trusted by Real Estate Professionals",
  description: "Rated by agents, brokers, and developers who are generating qualified buyer leads and closing more property deals with our system.",
  testimonials: [
    { name: "Rahul Sharma", role: "Real Estate Broker, Mumbai", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop", text: "We were struggling with low-quality portal leads. After implementing this system, we started getting serious buyer inquiries." },
    { name: "Amit Desai", role: "Property Developer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop", text: "We were struggling with low-quality portal leads. After implementing this system, we started getting serious buyer inquiries." },
    { name: "Vikram Singh", role: "Agency Owner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop", text: "We were struggling with low-quality portal leads. After implementing this system, we started getting serious buyer inquiries." },
  ],
}

export default function TestimonialAdmin() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadState, setUploadState] = useState<{ [key: number]: boolean }>({})

  useEffect(() => { async function loadData() { try { const data = await getCmsContent("home", "testimonial"); if (data && Object.keys(data).length > 0) { setContent(migrateToDeviceStructure(data, defaultContent)) } } catch (error) { console.error("Failed to load:", error) } finally { setLoading(false) } } loadData() }, [])

  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleSave = async () => { setSaving(true); try { await upsertCmsContent("home", "testimonial", content); toast.success("Testimonial updated successfully") } catch (error) { console.error("Failed to save:", error); toast.error("Failed to save changes") } finally { setSaving(false) } }

  const handleTestimonialChange = (device: 'desktop' | 'mobile', index: number, field: string, value: string) => {
    const newItems = [...content[device].testimonials]; newItems[index] = { ...newItems[index], [field]: value } as any; handleChange(device, 'testimonials', newItems)
  }
  const addTestimonial = (device: 'desktop' | 'mobile') => { handleChange(device, 'testimonials', [...content[device].testimonials, { name: "", role: "", image: "", text: "" }]) }
  const removeTestimonial = (device: 'desktop' | 'mobile', index: number) => { handleChange(device, 'testimonials', content[device].testimonials.filter((_: any, i: number) => i !== index)) }

  const handleImageUpload = async (device: 'desktop' | 'mobile', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploadState({ ...uploadState, [index]: true })
    try { const formData = new FormData(); formData.append("file", file); const url = await uploadFile(formData); handleTestimonialChange(device, index, "image", url.toString()); toast.success("Image uploaded successfully") } catch (error) { console.error("Upload failed:", error); toast.error("Failed to upload image") } finally { setUploadState({ ...uploadState, [index]: false }) }
  }

  if (loading) return (<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>)

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
        <div>
          <Card>
            <CardHeader><CardTitle>Display Text</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Pill Text</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
              <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} rows={2} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} rows={4} /></div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Testimonials List</CardTitle><Button onClick={() => addTestimonial(device)} variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add</Button></CardHeader>
            <CardContent className="space-y-6">
              {d.testimonials.map((item: any, index: number) => (
                <div key={index} className="relative space-y-4 rounded-lg border bg-gray-50 p-4">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeTestimonial(device, index)}><Trash2 className="h-4 w-4" /></Button>
                  <div className="mt-4 space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      {item.image && (<div className="relative h-16 w-16 overflow-hidden rounded-full border bg-gray-200"><Image src={item.image} alt="Profile" fill className="object-cover" /></div>)}
                      <Label className="cursor-pointer"><div className="flex items-center gap-2 rounded border bg-white px-4 py-2 hover:bg-gray-50">{uploadState[index] ? (<Loader2 className="h-4 w-4 animate-spin text-gray-500" />) : (<ImageIcon className="h-4 w-4" />)}<span className="text-sm">Upload</span></div><input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(device, index, e)} disabled={uploadState[index]} /></Label>
                    </div>
                  </div>
                  <div className="space-y-2"><Label>Name</Label><Input value={item.name} onChange={(e) => handleTestimonialChange(device, index, "name", e.target.value)} /></div>
                  <div className="space-y-2"><Label>Role</Label><Input value={item.role} onChange={(e) => handleTestimonialChange(device, index, "role", e.target.value)} /></div>
                  <div className="space-y-2"><Label>Feedback</Label><Textarea value={item.text} onChange={(e) => handleTestimonialChange(device, index, "text", e.target.value)} rows={3} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Testimonial Section</h1>
        <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}<Save className="mr-2 h-4 w-4" />Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
