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
import { Loader2, Plus, Save, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useAdminTracking } from '@/hooks/use-admin-tracking'

const defaultContent = {
  pillText: 'Our Commitment',
  heading: 'Why Trust Us With Your Growth',
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
  const [content, setContent] = useState<typeof defaultContent>({ ...defaultContent })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { trackSave, trackCreate, trackDelete, trackUpload } = useAdminTracking()

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCmsContent('home', 'features')
        if (data && Object.keys(data).length > 0) {
          const flatData = data.desktop || data
          setContent({ ...defaultContent, ...flatData })
        }
      } catch (error) {
        console.error('Failed to load Features data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await upsertCmsContent('home', 'features', content)
      trackSave('features', `Saved features section content`)
      toast.success('Features updated successfully')
    } catch (error) {
      console.error('Failed to save:', error)
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...content.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value } as any
    handleChange('features', newFeatures)
  }

  const addFeature = () => {
    handleChange('features', [...content.features, { title: '', description: '', tag: '' }])
    trackCreate('features', `Added new feature item`, { featureCount: content.features.length + 1 })
  }

  const removeFeature = (index: number) => {
    handleChange('features', content.features.filter((_: any, i: number) => i !== index))
    trackDelete('features', `Removed feature item ${index + 1}`, { featureIndex: index })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handleChange('image', finalUrl)
        trackUpload('features', `Features section image upload`)
        toast.success('Image uploaded successfully')
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Features Section</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Display Text</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Pill Text</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
              <div className="space-y-2"><Label>Heading</Label><Textarea value={content.heading} onChange={e => handleChange('heading', e.target.value)} rows={2} /></div>
              <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={content.headingSize} onChange={e => handleChange('headingSize', e.target.value)} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={content.description} onChange={e => handleChange('description', e.target.value)} rows={3} /></div>
              <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={content.descriptionSize} onChange={e => handleChange('descriptionSize', e.target.value)} /></div>
              <div className="space-y-2"><Label>Button Text</Label><Input value={content.buttonText} onChange={e => handleChange('buttonText', e.target.value)} /></div>
              <div className="space-y-2"><Label>Button Link (URL)</Label><Input value={content.buttonLink || ""} onChange={e => handleChange('buttonLink', e.target.value)} /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Main Image</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {content.image && (<div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden border"><Image fill src={content.image} alt="Feature image" className="object-contain" /></div>)}
              <div>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-full h-12 px-4 border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                    {uploadingImage ? <Loader2 className="h-5 w-5 animate-spin text-gray-500" /> : <span className="flex items-center text-sm text-gray-600"><ImageIcon className="mr-2 h-4 w-4" /> Upload Image</span>}
                  </div>
                  <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Features List</CardTitle><Button onClick={addFeature} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button></CardHeader>
            <CardContent className="space-y-6">
              {content.features.map((feature: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeFeature(index)}><Trash2 className="h-4 w-4" /></Button>
                  <div className="space-y-2"><Label>Title</Label><Input value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Description</Label><Textarea value={feature.description} onChange={(e) => handleFeatureChange(index, 'description', e.target.value)} rows={2} /></div>
                  <div className="space-y-2"><Label>Tag</Label><Input value={feature.tag} onChange={(e) => handleFeatureChange(index, 'tag', e.target.value)} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
