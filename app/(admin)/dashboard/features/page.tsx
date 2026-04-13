'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import Image from 'next/image'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { uploadFile } from '@/app/actions/upload'
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: 'Our Commitment', heading: 'Why Trust Us With Your Growth',
  headingSize: '48',
  description: "We don't hide behind dashboards or vanity metrics. What you see is exactly what is happening.",
  descriptionSize: '16',
  buttonText: 'BOOK A FREE STRATEGY CALL',
  buttonLink: '#',
  image: '/assets/man-on-house.png',
  features: [
    { title: "Limited Partners Per City", description: "We take one client per micro-market. Your direct competitors cannot access our system.", tag: "Zero conflict of interest" },
    { title: "End-to-End Data Encryption", description: "Every lead, every conversation, every file is fully encrypted.", tag: "Your data. Always safe." },
    { title: "Real Estate-Only Team", description: "We work exclusively in real estate. No lifestyle brands. No e-commerce.", tag: "100% domain-specific expertise" },
    { title: "Transparent Reporting — No Black Box", description: "You see exactly what we're running, what's working, and what each rupee is producing.", tag: "Full visibility. Always." },
  ]
}

export default function FeaturesAdmin() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => { async function loadData() { try { const data = await getCmsContent('home', 'features'); if (data && Object.keys(data).length > 0) { setContent(migrateToDeviceStructure(data, defaultContent)) } } catch (error) { console.error('Failed to load Features data:', error) } finally { setLoading(false) } } loadData() }, [])

  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleSave = async () => { setSaving(true); try { await upsertCmsContent('home', 'features', content); toast.success('Features updated successfully') } catch (error) { console.error('Failed to save:', error); toast.error('Failed to save changes') } finally { setSaving(false) } }

  const handleFeatureChange = (device: 'desktop' | 'mobile', index: number, field: string, value: string) => {
    const newFeatures = [...content[device].features]; newFeatures[index] = { ...newFeatures[index], [field]: value } as any; handleChange(device, 'features', newFeatures)
  }
  const addFeature = (device: 'desktop' | 'mobile') => { handleChange(device, 'features', [...content[device].features, { title: '', description: '', tag: '' }]) }
  const removeFeature = (device: 'desktop' | 'mobile', index: number) => { handleChange(device, 'features', content[device].features.filter((_: any, i: number) => i !== index)) }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0]; if (!file) return
    setUploadingImage(true)
    try { const formData = new FormData(); formData.append('file', file); const url = await uploadFile(formData); handleChange(device, 'image', url); toast.success('Image uploaded successfully') } catch (error) { console.error('Upload failed:', error); toast.error('Failed to upload image') } finally { setUploadingImage(false) }
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Display Text</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Pill Text</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
              <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} rows={2} /></div>
              <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange(device, 'headingSize', e.target.value)} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} rows={3} /></div>
              <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={d.descriptionSize} onChange={e => handleChange(device, 'descriptionSize', e.target.value)} /></div>
              <div className="space-y-2"><Label>Button Text</Label><Input value={d.buttonText} onChange={e => handleChange(device, 'buttonText', e.target.value)} /></div>
              <div className="space-y-2"><Label>Button Link (URL)</Label><Input value={d.buttonLink || ""} onChange={e => handleChange(device, 'buttonLink', e.target.value)} /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Main Image</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {d.image && (<div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden border"><Image fill src={d.image} alt="Feature image" className="object-contain" /></div>)}
              <div><Label htmlFor={`image-upload-${device}`} className="cursor-pointer"><div className="flex items-center justify-center w-full h-12 px-4 border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">{uploadingImage ? <Loader2 className="h-5 w-5 animate-spin text-gray-500" /> : <span className="flex items-center text-sm text-gray-600"><ImageIcon className="mr-2 h-4 w-4" /> Upload Image</span>}</div><input id={`image-upload-${device}`} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, device)} disabled={uploadingImage} /></Label></div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Features List</CardTitle><Button onClick={() => addFeature(device)} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button></CardHeader>
            <CardContent className="space-y-6">
              {d.features.map((feature: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeFeature(device, index)}><Trash2 className="h-4 w-4" /></Button>
                  <div className="space-y-2"><Label>Title</Label><Input value={feature.title} onChange={(e) => handleFeatureChange(device, index, 'title', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Description</Label><Textarea value={feature.description} onChange={(e) => handleFeatureChange(device, index, 'description', e.target.value)} rows={2} /></div>
                  <div className="space-y-2"><Label>Tag</Label><Input value={feature.tag} onChange={(e) => handleFeatureChange(device, index, 'tag', e.target.value)} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Features Section</h1>
        <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}<Save className="mr-2 h-4 w-4" />Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
