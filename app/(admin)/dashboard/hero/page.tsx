'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { uploadFile } from '@/app/actions/upload'
import { Loader2, Upload, Plus, Trash2 } from 'lucide-react'

// Default template structure
const defaultContentInner = {
  headlineLine1: "LEAD",
  headlineLine2: "DOMINANCE",
  headlineSize: "100", // in px for desktop
  headlineColor: "#ffffff",
  subtitle: "Convert ready buyers into deals with a proven 90-day system.",
  subtitleSize: "12", // in px
  subtitleColor: "#ffffff",
  ctaText: "Apply for Strategy Call",
  ctaLink: "#",
  ctaBgColor: "#000000",
  ctaTextColor: "#ffffff",
  ctaArrowBgColor: "#F36B2B",
  ratingConfig: "RATED 4.5/5",
  trustedByText: "Trusted by 250+ B2B Organizations",
  backgroundImageUrl: "/assets/hero-bg.jpg",
  avatars: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  ],
  checkmarks: ["Instant Access", "Step-By-Step Plan", "Cancel Anytime"],
  marqueeSpeed: "40",
  marqueeLogos: [
    { image: "/assets/xigenis-logo.png", alt: "The Umansky Team" },
    { image: "/assets/xigenis-logo.png", alt: "EST" },
    { image: "/assets/xigenis-logo.png", alt: "FF" },
    { image: "/assets/xigenis-logo.png", alt: "Godrej" }
  ]
}

const defaultContent = {
  desktop: { ...defaultContentInner },
  mobile: { ...defaultContentInner, headlineSize: "60", subtitleSize: "10" }
}

export default function HeroCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadingAvatarIdx, setUploadingAvatarIdx] = useState<number | null>(null)
  const [uploadingMarqueeIdx, setUploadingMarqueeIdx] = useState<number | null>(null)

  // Fetch initial content
  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'hero')
      if (data) {
         if (data.desktop && data.mobile) {
           setContent({ ...defaultContent, ...data })
         } else {
           // Migration from flat payload to nested mobile/desktop structure
           setContent({
             desktop: { ...defaultContent.desktop, ...data },
             mobile: { ...defaultContent.mobile, ...data, headlineSize: "60", subtitleSize: "10" }
           })
         }
      }
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (device: 'desktop' | 'mobile', key: keyof typeof defaultContentInner, value: any) => {
    setContent(prev => ({ 
        ...prev, 
        [device]: { ...prev[device], [key]: value } 
    }))
  }

  const handleArrayChange = (device: 'desktop' | 'mobile', key: 'avatars' | 'checkmarks', index: number, value: string) => {
    const newArr = [...content[device][key]]
    newArr[index] = value
    handleChange(device, key, newArr)
  }

  const addArrayItem = (device: 'desktop' | 'mobile', key: 'avatars' | 'checkmarks') => {
    const newArr = [...content[device][key], ""]
    handleChange(device, key, newArr)
  }

  const removeArrayItem = (device: 'desktop' | 'mobile', key: 'avatars' | 'checkmarks', index: number) => {
    const newArr = content[device][key].filter((_, i) => i !== index)
    handleChange(device, key, newArr)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const { success, finalUrl, error } = await uploadFile(formData)
      
      if (!success || !finalUrl) {
        throw new Error(error || "Failed to upload file")
      }

      handleChange(device, 'backgroundImageUrl', finalUrl)
      toast.success(`Background image (${device}) uploaded successfully!`)
    } catch (err: any) {
      toast.error(err.message || "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number, device: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatarIdx(index)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const { success, finalUrl, error } = await uploadFile(formData)
      
      if (!success || !finalUrl) {
        throw new Error(error || "Failed to upload avatar")
      }

      handleArrayChange(device, 'avatars', index, finalUrl)
      toast.success("Avatar uploaded successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar")
    } finally {
      setUploadingAvatarIdx(null)
    }
  }

  const handleMarqueeLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number, device: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingMarqueeIdx(index)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const { success, finalUrl, error } = await uploadFile(formData)
      
      if (!success || !finalUrl) {
        throw new Error(error || "Failed to upload marquee logo")
      }

      const newLogos = [...content[device].marqueeLogos]
      newLogos[index] = { 
        image: finalUrl,
        alt: newLogos[index]?.alt || ""
      }
      handleChange(device, 'marqueeLogos', newLogos)
      toast.success("Logo uploaded successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to upload logo")
    } finally {
      setUploadingMarqueeIdx(null)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success, error } = await upsertCmsContent('home', 'hero', content)
    if (success) {
      toast.success("Hero content updated successfully")
    } else {
      toast.error(error || "Failed to save")
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  const renderForm = (device: 'desktop' | 'mobile') => {
    const deviceContent = content[device]

    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
             <CardTitle>Main Copy & Styling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2 col-span-2">
                 <Label>Headline Line 1</Label>
                 <Input value={deviceContent.headlineLine1} onChange={e => handleChange(device, 'headlineLine1', e.target.value)} />
               </div>
               <div className="space-y-2 col-span-2">
                 <Label>Headline Line 2</Label>
                 <Input value={deviceContent.headlineLine2} onChange={e => handleChange(device, 'headlineLine2', e.target.value)} />
               </div>
               <div className="space-y-2">
                 <Label>Headline Font Size (px)</Label>
                 <Input type="number" value={deviceContent.headlineSize} onChange={e => handleChange(device, 'headlineSize', e.target.value)} />
               </div>
               <div className="space-y-2">
                 <Label>Headline Color</Label>
                 <div className="flex gap-2">
                    <Input type="color" className="p-1 h-10 w-12" value={deviceContent.headlineColor} onChange={e => handleChange(device, 'headlineColor', e.target.value)} />
                    <Input value={deviceContent.headlineColor} onChange={e => handleChange(device, 'headlineColor', e.target.value)} />
                 </div>
               </div>
             </div>

             <div className="space-y-4 pt-4 border-t">
               <div className="space-y-2">
                 <Label>Subtitle</Label>
                 <Textarea value={deviceContent.subtitle} onChange={e => handleChange(device, 'subtitle', e.target.value)} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Subtitle Font Size (px)</Label>
                   <Input type="number" value={deviceContent.subtitleSize} onChange={e => handleChange(device, 'subtitleSize', e.target.value)} />
                 </div>
                 <div className="space-y-2">
                   <Label>Subtitle Color</Label>
                   <div className="flex gap-2">
                      <Input type="color" className="p-1 h-10 w-12" value={deviceContent.subtitleColor} onChange={e => handleChange(device, 'subtitleColor', e.target.value)} />
                      <Input value={deviceContent.subtitleColor} onChange={e => handleChange(device, 'subtitleColor', e.target.value)} />
                   </div>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>CTA Button Styling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <Label>Button Text</Label>
               <Input value={deviceContent.ctaText} onChange={e => handleChange(device, 'ctaText', e.target.value)} />
             </div>
             <div className="space-y-2">
               <Label>Button Link (URL)</Label>
               <Input value={deviceContent.ctaLink} onChange={e => handleChange(device, 'ctaLink', e.target.value)} />
             </div>
             <div className="grid grid-cols-1 gap-4">
               <div className="space-y-2">
                 <Label>Button Background Color</Label>
                 <div className="flex gap-2">
                    <Input type="color" className="p-1 h-10 w-12" value={deviceContent.ctaBgColor} onChange={e => handleChange(device, 'ctaBgColor', e.target.value)} />
                    <Input value={deviceContent.ctaBgColor} onChange={e => handleChange(device, 'ctaBgColor', e.target.value)} />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label>Button Text Color</Label>
                 <div className="flex gap-2">
                    <Input type="color" className="p-1 h-10 w-12" value={deviceContent.ctaTextColor} onChange={e => handleChange(device, 'ctaTextColor', e.target.value)} />
                    <Input value={deviceContent.ctaTextColor} onChange={e => handleChange(device, 'ctaTextColor', e.target.value)} />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label>Arrow Icon Wrapper Color</Label>
                 <div className="flex gap-2">
                    <Input type="color" className="p-1 h-10 w-12" value={deviceContent.ctaArrowBgColor} onChange={e => handleChange(device, 'ctaArrowBgColor', e.target.value)} />
                    <Input value={deviceContent.ctaArrowBgColor} onChange={e => handleChange(device, 'ctaArrowBgColor', e.target.value)} />
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
             <CardTitle>Background Asset</CardTitle>
             <CardDescription>Upload a background image directly to Cloudflare R2</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {deviceContent.backgroundImageUrl && (
               <div className="relative h-40 w-full overflow-hidden rounded-md border">
                 <img src={deviceContent.backgroundImageUrl} alt="Background Preview" className="object-cover w-full h-full" />
               </div>
             )}

             <div className="flex items-center gap-4">
               <Button variant="outline" className="relative w-full" disabled={isUploading}>
                 {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                 {isUploading ? 'Uploading...' : 'Upload New Background'}
                 <input 
                   type="file" 
                   accept="image/*"
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                   onChange={e => handleFileUpload(e, device)} 
                   disabled={isUploading}
                 />
               </Button>
             </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
             <CardTitle>Trust Badge Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <Label>Rating Text</Label>
               <Input value={deviceContent.ratingConfig} onChange={e => handleChange(device, 'ratingConfig', e.target.value)} />
             </div>
             <div className="space-y-2">
               <Label>Trusted By Text</Label>
               <Input value={deviceContent.trustedByText} onChange={e => handleChange(device, 'trustedByText', e.target.value)} />
             </div>
             
             <div className="space-y-2 pt-4">
               <div className="flex items-center justify-between">
                 <Label>Value Propostion Checkmarks</Label>
                 <Button variant="ghost" size="sm" onClick={() => addArrayItem(device, 'checkmarks')}><Plus className="h-4 w-4" /></Button>
               </div>
               {deviceContent.checkmarks.map((text, idx) => (
                 <div key={idx} className="flex gap-2">
                    <Input value={text} onChange={e => handleArrayChange(device, 'checkmarks', idx, e.target.value)} />
                    <Button variant="outline" size="icon" onClick={() => removeArrayItem(device, 'checkmarks', idx)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
             <CardTitle>Top Performer Avatars</CardTitle>
             <CardDescription>Manage and upload avatar images for the trust badge</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            {deviceContent.avatars.map((url, idx) => (
              <div key={idx} className="flex flex-col gap-4 p-4 border rounded-lg bg-card/50">
                <div className="flex items-center justify-between">
                  <Label>Avatar {idx + 1}</Label>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(device, 'avatars', idx)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border bg-muted overflow-hidden flex-shrink-0">
                    {url ? (
                      <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs text-center p-1">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <Input value={url} placeholder="Enter image URL..." onChange={e => handleArrayChange(device, 'avatars', idx, e.target.value)} />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="relative flex-1" disabled={uploadingAvatarIdx === idx}>
                        {uploadingAvatarIdx === idx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {uploadingAvatarIdx === idx ? 'Uploading...' : 'Upload'}
                        <input 
                          type="file" 
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          onChange={(e) => handleAvatarUpload(e, idx, device)} 
                          disabled={uploadingAvatarIdx === idx}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="h-full border-dashed" onClick={() => addArrayItem(device, 'avatars')}>
              <Plus className="mr-2 h-4 w-4" /> Add New Avatar
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Logo Marquee Settings</CardTitle>
            <CardDescription>Manage the logos that scroll at the bottom of the hero section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 max-w-sm">
              <Label>Marquee Speed (Scroll Duration in seconds)</Label>
              <div className="flex items-center gap-4">
                <Input 
                  type="number" 
                  value={deviceContent.marqueeSpeed} 
                  onChange={e => handleChange(device, 'marqueeSpeed', e.target.value)} 
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">Lower = Faster</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {deviceContent.marqueeLogos?.map((logo: { image: string, alt: string }, idx: number) => (
                <div key={idx} className="flex flex-col gap-4 p-4 border rounded-lg bg-card/50">
                  <div className="flex items-center justify-between">
                    <Label>Logo {idx + 1}</Label>
                    <Button variant="ghost" size="sm" onClick={() => {
                      const newLogos = deviceContent.marqueeLogos.filter((_: any, i: number) => i !== idx);
                      handleChange(device, 'marqueeLogos', newLogos);
                    }} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-20 w-full rounded border bg-muted/30 overflow-hidden flex items-center justify-center p-4">
                      {logo.image ? (
                        <img src={logo.image} alt={logo.alt} className="max-w-full max-h-full object-contain filter invert" />
                      ) : (
                        <div className="text-muted-foreground text-xs">No Logo</div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Alt Text / Name</Label>
                      <Input 
                        value={logo.alt} 
                        placeholder="Organization name..." 
                        onChange={e => {
                          const newLogos = [...deviceContent.marqueeLogos];
                          newLogos[idx] = { 
                            image: newLogos[idx]?.image || "",
                            alt: e.target.value || "" 
                          };
                          handleChange(device, 'marqueeLogos', newLogos);
                        }} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Logo Image URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={logo.image} 
                          placeholder="Image URL..." 
                          className="flex-1"
                          onChange={e => {
                            const newLogos = [...deviceContent.marqueeLogos];
                            newLogos[idx] = { 
                              image: e.target.value || "",
                              alt: newLogos[idx]?.alt || ""
                            };
                            handleChange(device, 'marqueeLogos', newLogos);
                          }} 
                        />
                        <Button variant="outline" size="icon" className="relative shrink-0" disabled={uploadingMarqueeIdx === idx}>
                          {uploadingMarqueeIdx === idx ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={(e) => handleMarqueeLogoUpload(e, idx, device)} 
                            disabled={uploadingMarqueeIdx === idx}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="h-full border-dashed flex flex-col gap-2 min-h-[200px]" 
                onClick={() => {
                  const newLogos = [...(deviceContent.marqueeLogos || []), { image: "", alt: "" }];
                  handleChange(device, 'marqueeLogos', newLogos);
                }}
              >
                <Plus className="h-6 w-6" /> 
                <span>Add New Logo</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hero Section Settings</h2>
          <p className="text-muted-foreground">Manage the content that appears first on the landing page</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="desktop" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="desktop">Desktop Edition</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Edition</TabsTrigger>
        </TabsList>
        <TabsContent value="desktop">
          {renderForm('desktop')}
        </TabsContent>
        <TabsContent value="mobile">
          {renderForm('mobile')}
        </TabsContent>
      </Tabs>
    </div>
  )
}
