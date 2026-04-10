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

export default function FeaturesAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [content, setContent] = useState<any>({
    pillText: 'Our Commitment',
    heading: 'Why Trust Us With Your Growth',
    description: "We don't hide behind dashboards or vanity metrics. What you see is exactly what is happening.",
    buttonText: 'BOOK A FREE STRATEGY CALL',
    image: '/assets/man-on-house.png',
    features: [
      {
        title: "Limited Partners Per City",
        description: "We take one client per micro-market. Your direct competitors cannot access our system in your territory — ever.",
        tag: "Zero conflict of interest",
      },
      {
        title: "End-to-End Data Encryption",
        description: "Every lead, every conversation, every file is fully encrypted and stored securely. Your business data never leaves our protected environment.",
        tag: "Your data. Always safe.",
      },
      {
        title: "Real Estate-Only Team",
        description: "We work exclusively in real estate. No lifestyle brands. No e-commerce. Every person on your account understands your market and your buyer.",
        tag: "100% domain-specific expertise",
      },
      {
        title: "Transparent Reporting — No Black Box",
        description: "You see exactly what we're running, what's working, and what each rupee is producing. Live dashboards. Weekly reviews. Zero hidden metrics.",
        tag: "Full visibility. Always.",
      },
    ]
  })

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCmsContent('home', 'features')
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      } catch (error) {
        console.error('Failed to load Features data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await upsertCmsContent('home', 'features', content)
      toast.success('Features updated successfully')
    } catch (error) {
      console.error('Failed to save Features data:', error)
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent({ ...content, [name]: value })
  }

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...content.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value } as any
    setContent({ ...content, features: newFeatures })
  }

  const addFeature = () => {
    setContent({
      ...content,
      features: [...content.features, { title: '', description: '', tag: '' }]
    })
  }

  const removeFeature = (index: number) => {
    const newFeatures = content.features.filter((_: any, i: number) => i !== index)
    setContent({ ...content, features: newFeatures })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const url = await uploadFile(formData)
      setContent({ ...content, image: url })
      toast.success('Image uploaded successfully')
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
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pill Text</Label>
                <Input name="pillText" value={content.pillText} onChange={handleTextChange} />
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Textarea name="heading" value={content.heading} onChange={handleTextChange} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="description" value={content.description} onChange={handleTextChange} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input name="buttonText" value={content.buttonText} onChange={handleTextChange} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Main Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.image && (
                <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden border">
                  <Image fill src={content.image} alt="Feature image" className="object-contain" />
                </div>
              )}
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Features List</CardTitle>
              <Button onClick={addFeature} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.features.map((feature: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeFeature(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={feature.description} onChange={(e) => handleFeatureChange(index, 'description', e.target.value)} rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tag</Label>
                    <Input value={feature.tag} onChange={(e) => handleFeatureChange(index, 'tag', e.target.value)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
