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
  headingLine1: "For Real Estate Leaders Who Want",
  headingLine2: "Predictable Deals",
  notForYouLabel: "This is not for you if",
  forYouLabel: "This is for you if",
  notForYouPoints: [
    "You are **just starting in real estate**",
    "You are looking for **cheap or random leads**",
    "You don't have a **structured sales closing process**",
    "You only work with **low-budget property deals**"
  ],
  forYouPoints: [
    "Your annual revenue is **₹50L+**",
    "You sell **₹1Cr+ ticket size properties**",
    "You are ready to **invest ₹1-3L in client acquisition**",
    "You can handle **8-12 qualified buyer leads per month**"
  ],
  bgImage: "/assets/eligibility-bg.png",
  modelImage: "/assets/eligibility-cutout.png"
}

export default function TargetAudienceCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState<'bg' | 'model' | null>(null)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'target-audience')
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'bgImage' | 'modelImage') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(type === 'bgImage' ? 'bg' : 'model')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handleChange(type, finalUrl)
        toast.success("Image uploaded")
      }
    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setUploadingImage(null)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'target-audience', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Target Audience CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Heading & Section Labels</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Heading Line 1</Label>
                <Input value={content.headingLine1} onChange={e => handleChange('headingLine1', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading Line 2</Label>
                <Input value={content.headingLine2} onChange={e => handleChange('headingLine2', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Negative Label (Not For You)</Label>
                <Input value={content.notForYouLabel} onChange={e => handleChange('notForYouLabel', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Positive Label (For You)</Label>
                <Input value={content.forYouLabel} onChange={e => handleChange('forYouLabel', e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Negative Points (Not For You)</CardTitle>
            <CardDescription>One point per line. Use **text** for bolding.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[200px]"
              value={content.notForYouPoints.join('\n')}
              onChange={e => handleChange('notForYouPoints', e.target.value.split('\n'))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Positive Points (For You)</CardTitle>
            <CardDescription>One point per line. Use **text** for bolding.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[200px]"
              value={content.forYouPoints.join('\n')}
              onChange={e => handleChange('forYouPoints', e.target.value.split('\n'))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Background Image</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="relative mx-auto w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
              {content.bgImage ? (
                <img src={content.bgImage} className="w-full h-full object-contain" />
              ) : (
                <Upload className="opacity-20 w-12 h-12" />
              )}
              <Input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={e => handleFileUpload(e, 'bgImage')} 
              />
              {uploadingImage === 'bg' && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Click or drag to upload background</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Model/Character Image</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="relative mx-auto w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
              {content.modelImage ? (
                <img src={content.modelImage} className="w-full h-full object-contain" />
              ) : (
                <Upload className="opacity-20 w-12 h-12" />
              )}
              <Input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={e => handleFileUpload(e, 'modelImage')} 
              />
              {uploadingImage === 'model' && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Click or drag to upload model cutout</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
