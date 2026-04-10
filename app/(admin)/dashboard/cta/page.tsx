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
  bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  heading: "Ready to Build a \n Predictable Pipeline of \n Property Buyers?",
  description: "Discover how our system helps real estate professionals generate qualified leads, increase site visits, and close more deals.",
  buttonText: "Book Your Strategy Call"
}

export default function CTACmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'cta')
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
    const { success } = await upsertCmsContent('home', 'cta', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">CTA Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
            <Card>
            <CardHeader><CardTitle>Text Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Heading (Use \n for breaks)</Label><Textarea rows={4} value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea rows={4} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
                <div className="space-y-2"><Label>Button Text</Label><Input value={content.buttonText} onChange={e => handleChange('buttonText', e.target.value)} /></div>
            </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Background Image</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-center">
                    <div className="relative mx-auto w-full h-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
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
