'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { uploadFile } from '@/app/actions/upload'
import { Loader2, Upload, Plus, Trash2 } from 'lucide-react'

const defaultContent = {
  bgImage: "/assets/transformation-bg.jpg",
  pillLabel: "Sound Familiar?",
  headingLine1: "AI Lead System Results",
  headingLine2: "The 90-Day Transformation",
  ctaButtonText: "Start My 90 Days",
  description1: "This is the after state — what your pipeline, calendar, and revenue look like after 90 days working with our system.",
  description2: "No random referrals. No cold calling. Just a predictable system that brings serious buyers.",
  timelineSteps: [
    { number: "1", days: "Day 1-7", text: "System setup & target audience research" },
    { number: "2", days: "Day 8-14", text: "First qualified buyer appointments booked" },
    { number: "3", days: "Day 30-60", text: "Lead pipeline fills and site visits increase" },
    { number: "4", days: "Day 90", text: "3-5 property deals closed" }
  ],
  testimonials: [
    {
      name: "Ananya Singh",
      role: "Independent Agent — Delhi",
      revenue: "₹1.5 Cr Closed",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      text: "Struggled for months with generic leads. Within 60 days of implementing the system, she had a completely transformed pipeline with high-intent buyers, resulting in 3 major closures.",
      stats: ["32 buyer appointments", "3 luxury deals closed", "3 months timeline"],
      beforeVal: "₹8L",
      afterVal: "₹32L"
    },
    {
      name: "Rahul Sharma",
      role: "Luxury Broker — Mumbai",
      revenue: "₹2.1 Cr Closed",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      text: "From chasing portal leads to closing ₹2.1 Cr worth of luxury properties in just four months. The system generated qualified high-net-worth buyers, booked directly into his calendar.",
      stats: ["44 buyer appointments", "5 luxury deals closed", "4 months timeline"],
      beforeVal: "₹15L",
      afterVal: "₹48L"
    }
  ]
}

export default function TransformationCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingIdx, setUploadingIdx] = useState<number | 'bg' | null>(null)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'transformation')
      if (data) {
        setContent({ ...defaultContent, ...data })
      }
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleStepChange = (index: number, field: string, value: string) => {
    const newSteps = [...content.timelineSteps]
    newSteps[index] = { ...newSteps[index], [field]: value } as any
    handleChange('timelineSteps', newSteps)
  }

  const handleTestimonialChange = (index: number, field: string, value: any) => {
    const newTestimonials = [...content.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value } as any
    handleChange('testimonials', newTestimonials)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: number | 'bg') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingIdx(target)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        if (target === 'bg') {
          handleChange('bgImage', finalUrl)
        } else {
          handleTestimonialChange(target, 'image', finalUrl)
        }
        toast.success("Image uploaded")
      }
    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setUploadingIdx(null)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'transformation', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Transformation CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Header Section</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Pill Label</Label>
              <Input value={content.pillLabel} onChange={e => handleChange('pillLabel', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>CTA Button Text</Label>
              <Input value={content.ctaButtonText} onChange={e => handleChange('ctaButtonText', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Heading Line 1</Label>
              <Input value={content.headingLine1} onChange={e => handleChange('headingLine1', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Heading Line 2</Label>
              <Input value={content.headingLine2} onChange={e => handleChange('headingLine2', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description Paragraph 1</Label>
              <Textarea value={content.description1} onChange={e => handleChange('description1', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description Paragraph 2</Label>
              <Textarea value={content.description2} onChange={e => handleChange('description2', e.target.value)} />
            </div>
            <div className="space-y-2 col-span-2">
                <Label>Background Image</Label>
                <div className="relative w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden">
                    {content.bgImage ? <img src={content.bgImage} className="w-full h-full object-cover" /> : <Upload className="opacity-20" />}
                    <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'bg')} />
                    {uploadingIdx === 'bg' && <div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Timeline Steps</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
              {content.timelineSteps.map((step, idx) => (
                  <div key={idx} className="space-y-3 p-4 border rounded-lg bg-muted/20">
                      <div className="font-bold flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">{idx + 1}</div>Step {idx + 1}</div>
                      <div className="space-y-2"><Label className="text-xs">Number/Identifier</Label><Input value={step.number} onChange={e => handleStepChange(idx, 'number', e.target.value)} /></div>
                      <div className="space-y-2"><Label className="text-xs">Days (Badge)</Label><Input value={step.days} onChange={e => handleStepChange(idx, 'days', e.target.value)} /></div>
                      <div className="space-y-2"><Label className="text-xs">Description</Label><Textarea value={step.text} onChange={e => handleStepChange(idx, 'text', e.target.value)} /></div>
                  </div>
              ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Testimonial Cards</CardTitle></CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            {content.testimonials.map((t, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-4 bg-muted/20">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full border overflow-hidden bg-background shrink-0">
                            {t.image ? <img src={t.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Upload className="opacity-20" /></div>}
                            <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, idx)} />
                            {uploadingIdx === idx && <div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                        </div>
                        <div className="w-full space-y-2">
                            <Input placeholder="Name" value={t.name} onChange={e => handleTestimonialChange(idx, 'name', e.target.value)} />
                            <Input placeholder="Role" value={t.role} onChange={e => handleTestimonialChange(idx, 'role', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label className="text-xs">Revenue Amount</Label><Input value={t.revenue} onChange={e => handleTestimonialChange(idx, 'revenue', e.target.value)} /></div>
                        <div className="space-y-2"><Label className="text-xs">Before Value</Label><Input value={t.beforeVal} onChange={e => handleTestimonialChange(idx, 'beforeVal', e.target.value)} /></div>
                        <div className="space-y-2"><Label className="text-xs">After Value</Label><Input value={t.afterVal} onChange={e => handleTestimonialChange(idx, 'afterVal', e.target.value)} /></div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Long Description</Label>
                        <Textarea value={t.text} onChange={e => handleTestimonialChange(idx, 'text', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Stats List (One per line)</Label>
                        <Textarea 
                            value={t.stats.join('\n')} 
                            onChange={e => handleTestimonialChange(idx, 'stats', e.target.value.split('\n'))} 
                        />
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
