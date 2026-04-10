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
import { Loader2, Upload } from 'lucide-react'

const defaultContent = {
  bgImage: "/assets/about-bg.png",
  pillText: "About Us",
  heading: "About Company",
  description: "At Xigenis, we help real estate professionals build a predictable pipeline of qualified property buyers. \n\nOur system combines AI-driven lead generation, targeted campaigns, and smart follow-up automation to attract serious buyers and close more deals consistently.",
  btnText: "Build My Pipeline",
  stat1Value: "2X",
  stat1Label: "Faster Growth",
  stat1Sub: "Vs Industry Peers",
  stat2Value: "4X",
  stat2Label: "Higher Sales",
  stat2Sub: "Vs Non-Clients",
  gridStat1Value: "90+",
  gridStat1Label: "Real Estate \n Professionals Served",
  gridStat2Value: "₹25 Cr+",
  gridStat2Label: "Property Pipeline \n Created",
  gridStat3Value: "5000+",
  gridStat3Label: "Qualified Buyer \n Leads Generated",
  gridStat4Value: "15+",
  gridStat4Label: "Cities Covered \n Across India",
}

export default function AboutCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'about')
      if (data) setContent({ ...defaultContent, ...data })
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handleChange('bgImage', finalUrl)
        toast.success("Image uploaded")
      }
    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'about', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">About Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
            <Card>
            <CardHeader><CardTitle>Text Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
                <div className="space-y-2"><Label>Heading</Label><Input value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
                <div className="space-y-2"><Label>Description (Supports \n for breaks)</Label><Textarea rows={6} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
                <div className="space-y-2"><Label>Button Text</Label><Input value={content.btnText} onChange={e => handleChange('btnText', e.target.value)} /></div>
            </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Left Highlight Card Stats</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <div className="space-y-2"><Label>Stat 1 Value</Label><Input value={content.stat1Value} onChange={e => handleChange('stat1Value', e.target.value)} /></div>
                        <div className="space-y-2">
                            <Label>Stat 1 Label</Label><Input value={content.stat1Label} className="mb-2" onChange={e => handleChange('stat1Label', e.target.value)} />
                            <Label>Stat 1 Subtext</Label><Input value={content.stat1Sub} onChange={e => handleChange('stat1Sub', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Stat 2 Value</Label><Input value={content.stat2Value} onChange={e => handleChange('stat2Value', e.target.value)} /></div>
                        <div className="space-y-2">
                            <Label>Stat 2 Label</Label><Input value={content.stat2Label} className="mb-2" onChange={e => handleChange('stat2Label', e.target.value)} />
                            <Label>Stat 2 Subtext</Label><Input value={content.stat2Sub} onChange={e => handleChange('stat2Sub', e.target.value)} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Grid Stats (Right Panel)</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <div className="space-y-2"><Label>Grid Stat 1 Value</Label><Input value={content.gridStat1Value} onChange={e => handleChange('gridStat1Value', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Grid Stat 1 Label</Label><Textarea value={content.gridStat1Label} onChange={e => handleChange('gridStat1Label', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <div className="space-y-2"><Label>Grid Stat 2 Value</Label><Input value={content.gridStat2Value} onChange={e => handleChange('gridStat2Value', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Grid Stat 2 Label</Label><Textarea value={content.gridStat2Label} onChange={e => handleChange('gridStat2Label', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <div className="space-y-2"><Label>Grid Stat 3 Value</Label><Input value={content.gridStat3Value} onChange={e => handleChange('gridStat3Value', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Grid Stat 3 Label</Label><Textarea value={content.gridStat3Label} onChange={e => handleChange('gridStat3Label', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Grid Stat 4 Value</Label><Input value={content.gridStat4Value} onChange={e => handleChange('gridStat4Value', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Grid Stat 4 Label</Label><Textarea value={content.gridStat4Label} onChange={e => handleChange('gridStat4Label', e.target.value)} /></div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Background Pattern Image</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-center">
                    <div className="relative mx-auto w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
                    {content.bgImage ? (
                        <img src={content.bgImage} className="w-full h-full object-cover opacity-50 bg-black" />
                    ) : (
                        <Upload className="opacity-20 w-8 h-8" />
                    )}
                    <Input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={handleFileUpload} 
                    />
                    {isUploading && (
                        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                        </div>
                    )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
