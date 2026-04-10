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

export default function RealEstateHeroAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [content, setContent] = useState<any>({
    badgeText: 'Trusted by 100+ B2B Organization',
    heading: 'Generate Qualified Property Buyer Leads Without Wasting Money On Low-Quality Inquiries',
    buttonText: 'Speak With A Strategy Expert Today',
    backgroundImage: '/hero-family-pool.jpg', // Placeholder fallback
    valueProps: [
      "High-Intent Property Buyers",
      "Qualified Buyer Inquiries Fast",
      "Full Campaign Transparency",
      "Real Estate Marketing Experts",
      "More Site Visits & Deals",
    ]
  })

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCmsContent('home', 'real-estate-hero')
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      } catch (error) {
        console.error('Failed to load Real Estate Hero data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await upsertCmsContent('home', 'real-estate-hero', content)
      toast.success('Hero updated successfully')
    } catch (error) {
      console.error('Failed to save Hero data:', error)
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent({ ...content, [name]: value })
  }

  const handleValuePropChange = (index: number, value: string) => {
    const newProps = [...content.valueProps]
    newProps[index] = value
    setContent({ ...content, valueProps: newProps })
  }

  const addValueProp = () => {
    setContent({
      ...content,
      valueProps: [...content.valueProps, '']
    })
  }

  const removeValueProp = (index: number) => {
    const newProps = content.valueProps.filter((_: any, i: number) => i !== index)
    setContent({ ...content, valueProps: newProps })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const url = await uploadFile(formData)
      setContent({ ...content, backgroundImage: url })
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
        <h1 className="text-3xl font-bold">Bottom Hero Section</h1>
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
                <Label>Trust Badge Text</Label>
                <Input name="badgeText" value={content.badgeText} onChange={handleTextChange} />
              </div>
              <div className="space-y-2">
                <Label>Main Heading</Label>
                <Textarea name="heading" value={content.heading} onChange={handleTextChange} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input name="buttonText" value={content.buttonText} onChange={handleTextChange} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Background Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.backgroundImage && (
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                  <Image fill src={content.backgroundImage} alt="Hero background" className="object-cover" />
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
              <CardTitle>Value Propositions</CardTitle>
              <Button onClick={addValueProp} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.valueProps.map((prop: string, index: number) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input value={prop} onChange={(e) => handleValuePropChange(index, e.target.value)} />
                  <Button variant="ghost" size="icon" className="text-red-500 shrink-0" onClick={() => removeValueProp(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
