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
import { Loader2, Upload, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'

const defaultContent = {
  tag: "AI ALGO-PLEX - VERIFIED RESULTS",
  headingLine1: "How we change their",
  headingLine2: "business",
  headingSize: "48", // in px
  headingColor: "#000000",
  description: "Real success stories from agents who generated qualified buyer leads, increased site visits, and closed high-value property deals using our proven system.",
  descriptionSize: "14", // in px
  descriptionColor: "#6B7280",
  ctaText: "Apply for Strategy Call",
  ctaBgColor: "#000000",
  ctaTextColor: "#ffffff",
  ctaArrowBgColor: "#F36B2B",
  performers: [
    {
      name: "Amrita Verma",
      role: "Agent | Mumbai",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      badge: "TOP CLOSER",
      metrics: [
        { label: "qualified buyer leads in 60 days", value: "320+" },
        { label: "property deals closed", value: "₹4.2 Cr" },
        { label: "high-intent buyer inquiries generated", value: "210+" }
      ]
    }
  ],
  footerCard: {
    number: "12",
    labels: ["More", "Success", "Stories"],
    subLabels: "Agents • CPs Builders • Brokers"
  }
}

export default function TopPerformersCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'top-performers')
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

  const handlePerformerChange = (index: number, field: 'name' | 'role' | 'image' | 'badge', value: string) => {
    const newPerformers = [...content.performers]
    const performer = newPerformers[index]
    if (!performer) return

    newPerformers[index] = { ...performer, [field]: value }
    handleChange('performers', newPerformers)
  }

  const handleMetricChange = (perIdx: number, metIdx: number, field: 'label' | 'value', value: string) => {
    const newPerformers = [...content.performers]
    const performer = newPerformers[perIdx]
    if (!performer) return
    
    const newMetrics = [...performer.metrics]
    const metric = newMetrics[metIdx]
    if (!metric) return

    newMetrics[metIdx] = { ...metric, [field]: value }
    newPerformers[perIdx] = { ...performer, metrics: newMetrics }
    handleChange('performers', newPerformers)
  }

  const addPerformer = () => {
    const newPerformer = {
      name: "New Performer",
      role: "Role | City",
      image: "",
      badge: "TOP CLOSER",
      metrics: [
        { label: "metric label", value: "0" },
        { label: "metric label", value: "0" },
        { label: "metric label", value: "0" }
      ]
    }
    handleChange('performers', [...content.performers, newPerformer])
  }

  const removePerformer = (index: number) => {
      handleChange('performers', content.performers.filter((_, i) => i !== index))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingIdx(index)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handlePerformerChange(index, 'image', finalUrl)
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
    const { success } = await upsertCmsContent('home', 'top-performers', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Top Performers CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Left Section Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Badge Tag</Label>
              <Input value={content.tag} onChange={e => handleChange('tag', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2"><Label>Heading Line 1</Label><Input value={content.headingLine1} onChange={e => handleChange('headingLine1', e.target.value)} /></div>
              <div className="space-y-2 col-span-2"><Label>Heading Line 2</Label><Input value={content.headingLine2} onChange={e => handleChange('headingLine2', e.target.value)} /></div>
              <div className="space-y-2"><Label>Heading Size (px)</Label><Input type="number" value={content.headingSize} onChange={e => handleChange('headingSize', e.target.value)} /></div>
              <div className="space-y-2"><Label>Heading Color</Label><Input type="color" value={content.headingColor} onChange={e => handleChange('headingColor', e.target.value)} /></div>
            </div>
            <div className="space-y-2 pt-4 border-t">
              <Label>Description</Label>
              <Textarea value={content.description} onChange={e => handleChange('description', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>CTA Button Styling</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Button Text</Label><Input value={content.ctaText} onChange={e => handleChange('ctaText', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Bg Color</Label><Input type="color" value={content.ctaBgColor} onChange={e => handleChange('ctaBgColor', e.target.value)} /></div>
              <div className="space-y-2"><Label>Text Color</Label><Input type="color" value={content.ctaTextColor} onChange={e => handleChange('ctaTextColor', e.target.value)} /></div>
              <div className="space-y-2 col-span-2"><Label>Arrow Wrapper Color</Label><Input type="color" value={content.ctaArrowBgColor} onChange={e => handleChange('ctaArrowBgColor', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performer Cards</CardTitle>
              <CardDescription>Configure the individual success story cards</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addPerformer}><Plus className="h-4 w-4 mr-2" /> Add Card</Button>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            {content.performers.map((p, idx) => (
              <div key={idx} className="p-4 border rounded-lg space-y-4 bg-muted/30 relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removePerformer(idx)}><Trash2 className="h-4 w-4" /></Button>
                
                <div className="flex flex-col items-center gap-4">
                   <div className="relative group">
                     <div className="w-20 h-20 rounded-full border overflow-hidden bg-background">
                       {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Upload className="opacity-20" /></div>}
                     </div>
                     <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, idx)} />
                     {uploadingIdx === idx && <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-full"><Loader2 className="animate-spin" /></div>}
                   </div>
                   <div className="w-full space-y-2">
                     <Input placeholder="Name" value={p.name} onChange={e => handlePerformerChange(idx, 'name', e.target.value)} />
                     <Input placeholder="Role/City" value={p.role} onChange={e => handlePerformerChange(idx, 'role', e.target.value)} />
                     <Input placeholder="Badge" value={p.badge} onChange={e => handlePerformerChange(idx, 'badge', e.target.value)} />
                   </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-[10px] font-bold uppercase opacity-50">Metrics</Label>
                  {p.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="grid grid-cols-3 gap-2">
                      <Input className="col-span-1 text-xs" placeholder="Value" value={m.value} onChange={e => handleMetricChange(idx, mIdx, 'value', e.target.value)} />
                      <Input className="col-span-2 text-xs" placeholder="Label" value={m.label} onChange={e => handleMetricChange(idx, mIdx, 'label', e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Footer Summary Card</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
             <div className="space-y-2">
               <Label>Number</Label>
               <Input value={content.footerCard.number} onChange={e => handleChange('footerCard', { ...content.footerCard, number: e.target.value })} />
             </div>
             <div className="space-y-2">
               <Label>Vertical Labels (One per line)</Label>
               <Textarea 
                 value={content.footerCard.labels.join('\n')} 
                 onChange={e => handleChange('footerCard', { ...content.footerCard, labels: e.target.value.split('\n') })} 
               />
             </div>
             <div className="space-y-2">
               <Label>Secondary Sub-labels</Label>
               <Input value={content.footerCard.subLabels} onChange={e => handleChange('footerCard', { ...content.footerCard, subLabels: e.target.value })} />
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
