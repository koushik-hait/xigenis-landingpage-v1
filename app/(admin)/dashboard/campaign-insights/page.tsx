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
import { Loader2, Plus, Trash, Upload } from 'lucide-react'

const defaultContent = {
  pillText: "LOREM IPSUM DOLOR SIT",
  heading: "Ad Campaign Insights",
  description: "Performance analytics and real-time tracking of ad campaigns across multiple platforms.",
  slides: [
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Social Channel Engagement",
      desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
    {
      title: "Search Engine Marketing (SEM)",
      desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop",
    },
    {
      title: "Lead Quality Metrics",
      desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    },
  ]
}

export default function CampaignInsightsCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'campaign-insights')
      if (data) setContent({ ...defaultContent, ...data })
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleSlideChange = (index: number, key: string, value: string) => {
    setContent(prev => {
      const newSlides = [...prev.slides]
      newSlides[index] = { ...newSlides[index], [key]: value } as any
      return { ...prev, slides: newSlides }
    })
  }

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIndex(index)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handleSlideChange(index, 'image', finalUrl)
        toast.success("Image uploaded")
      }
    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setUploadingIndex(null)
    }
  }

  const addSlide = () => {
    setContent(prev => ({
      ...prev,
      slides: [...prev.slides, { title: "New Slide", desc: "Description text", image: "" }]
    }))
  }

  const removeSlide = (index: number) => {
    setContent(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'campaign-insights', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Campaign Insights CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6 border-b pb-6">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Input value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={2} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Insights Carousel Slides</h3>
            <Button size="sm" onClick={addSlide}><Plus className="w-4 h-4 mr-2"/> Add Slide</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.slides.map((slide, i) => (
            <Card key={i} className="relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10" onClick={() => removeSlide(i)}>
                <Trash className="w-4 h-4" />
                </Button>
                <CardHeader><CardTitle className="text-base mt-2">Slide #{i+1}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1"><Label className="text-xs">Title</Label><Textarea rows={2} className="text-xs" value={slide.title} onChange={e => handleSlideChange(i, 'title', e.target.value)} /></div>
                    <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea rows={3} className="text-xs" value={slide.desc} onChange={e => handleSlideChange(i, 'desc', e.target.value)} /></div>
                    
                    <div className="space-y-2 pt-2">
                        <Label className="text-xs">Slide Image / Dashboard Screenshot</Label>
                        <div className="relative w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
                        {slide.image ? (
                            <img src={slide.image} className="w-full h-full object-cover opacity-80" />
                        ) : (
                            <Upload className="opacity-20 w-8 h-8" />
                        )}
                        <Input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={e => {
                                if (e.target.files?.[0]) handleFileUpload(i, e.target.files[0])
                            }} 
                        />
                        {uploadingIndex === i && (
                            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                                <Loader2 className="animate-spin w-8 h-8" />
                            </div>
                        )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
