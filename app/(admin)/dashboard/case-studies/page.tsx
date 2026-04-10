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
  heading: "Real Campaign Results from Real \n Estate Projects",
  description: "Real campaign results showing how qualified buyer leads turn into site visits and property deals.",
  projects: [
    {
      title: "Luxury Residential Project – Goa",
      leads: "3.4K+",
      rate: "28%",
      requests: "270+",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    },
    {
      title: "Luxury Residential Project – Goa",
      leads: "3.4K+",
      rate: "28%",
      requests: "270+",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Luxury Residential Project – Goa",
      leads: "3.4K+",
      rate: "28%",
      requests: "270+",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    },
  ]
}

export default function CaseStudiesCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'case-studies')
      if (data) setContent({ ...defaultContent, ...data })
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleProjectChange = (index: number, key: string, value: string) => {
    setContent(prev => {
      const newProjects = [...prev.projects]
      newProjects[index] = { ...newProjects[index], [key]: value } as any
      return { ...prev, projects: newProjects }
    })
  }

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIndex(index)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handleProjectChange(index, 'image', finalUrl)
        toast.success("Image uploaded")
      }
    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setUploadingIndex(null)
    }
  }

  const addProject = () => {
    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "New Project", leads: "0+", rate: "0%", requests: "0+", image: "" }]
    }))
  }

  const removeProject = (index: number) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'case-studies', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Case Studies CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6 border-b pb-6">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading (Use \n for breaks)</Label><Textarea rows={2} value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Projects Grid</h3>
            <Button size="sm" onClick={addProject}><Plus className="w-4 h-4 mr-2"/> Add Project</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.projects.map((project, i) => (
            <Card key={i} className="relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10" onClick={() => removeProject(i)}>
                <Trash className="w-4 h-4" />
                </Button>
                <CardHeader><CardTitle className="text-base mt-2">Project #{i+1}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1"><Label className="text-xs">Project Title</Label><Input value={project.title} onChange={e => handleProjectChange(i, 'title', e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1"><Label className="text-xs">Leads Value</Label><Input value={project.leads} onChange={e => handleProjectChange(i, 'leads', e.target.value)} /></div>
                        <div className="space-y-1"><Label className="text-xs">Rate Value</Label><Input value={project.rate} onChange={e => handleProjectChange(i, 'rate', e.target.value)} /></div>
                    </div>
                    <div className="space-y-1"><Label className="text-xs">Requests Value</Label><Input value={project.requests} onChange={e => handleProjectChange(i, 'requests', e.target.value)} /></div>
                    
                    <div className="space-y-2 pt-2">
                        <Label className="text-xs">Project Background</Label>
                        <div className="relative w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30 overflow-hidden group">
                        {project.image ? (
                            <img src={project.image} className="w-full h-full object-cover opacity-80" />
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
