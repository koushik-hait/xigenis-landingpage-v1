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
import { Loader2 } from 'lucide-react'

const defaultContent = {
  pillText: "PROBLEM 01 • LEAD QUALITY",
  heading: "Spending Lakhs on Portals & Getting Fake Numbers",
  description: "MagicBricks, 99acres, Housing.com — 80-90% of those leads are cold or uncontactable. You're not getting leads. You're buying noise.",
  points: [
    "100 leads, 4 site visits. Zero predictability.",
    "Every month feels like starting from scratch.",
    "AI Algo-Plex delivers pre-qualified buyer intent only."
  ],
  mainStatValue: "72%",
  mainStatText: "of Indian agents say unqualified inquiries is their #1 problem.",
  mainStatSource: "Source: 99acres Agent Survey 2024.",
  auditTotalLabel: "Total Leads This Month",
  auditTotalValue: "112 inquiries received",
  auditFakeLabel: "Fake / Wrong Numbers",
  auditFakeValue: "84 leads were invalid or unreachable",
  auditNoRespLabel: "No Response After 3 Calls",
  auditNoRespValue: "19 leads never answered follow-ups",
  auditQualLabel: "Actually Qualified Buyers",
  auditQualValue: "Only 9 leads showed real buying intent",
  auditSiteLabel: "Site Visit Rate",
  auditSiteValue: "4% of leads converted into site visits"
}

export default function LeadQualityCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'lead-quality')
      if (data) setContent({ ...defaultContent, ...data })
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'lead-quality', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Lead Quality CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Text Content (Right side)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Textarea value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Paragraph</Label><Textarea rows={4} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
            <div className="space-y-2">
              <Label>Bullet Points (One per line)</Label>
              <Textarea rows={4} value={content.points.join('\n')} onChange={e => handleChange('points', e.target.value.split('\n'))} />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div className="space-y-2"><Label>Main Stat Value</Label><Input value={content.mainStatValue} onChange={e => handleChange('mainStatValue', e.target.value)} /></div>
                <div className="space-y-2"><Label>Main Stat Source</Label><Input value={content.mainStatSource} onChange={e => handleChange('mainStatSource', e.target.value)} /></div>
                <div className="space-y-2 col-span-2"><Label>Main Stat Text</Label><Textarea value={content.mainStatText} onChange={e => handleChange('mainStatText', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Audit Card Items (Left side)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 border-b pb-4"><div className="space-y-2"><Label>Total Leads Label</Label><Input value={content.auditTotalLabel} onChange={e => handleChange('auditTotalLabel', e.target.value)} /></div><div className="space-y-2"><Label>Total Leads Value</Label><Input value={content.auditTotalValue} onChange={e => handleChange('auditTotalValue', e.target.value)} /></div></div>
            <div className="grid grid-cols-2 gap-2 border-b pb-4"><div className="space-y-2"><Label>Fake Label</Label><Input value={content.auditFakeLabel} onChange={e => handleChange('auditFakeLabel', e.target.value)} /></div><div className="space-y-2"><Label>Fake Value</Label><Input value={content.auditFakeValue} onChange={e => handleChange('auditFakeValue', e.target.value)} /></div></div>
            <div className="grid grid-cols-2 gap-2 border-b pb-4"><div className="space-y-2"><Label>No Resp Label</Label><Input value={content.auditNoRespLabel} onChange={e => handleChange('auditNoRespLabel', e.target.value)} /></div><div className="space-y-2"><Label>No Resp Value</Label><Input value={content.auditNoRespValue} onChange={e => handleChange('auditNoRespValue', e.target.value)} /></div></div>
            <div className="grid grid-cols-2 gap-2 border-b pb-4"><div className="space-y-2"><Label>Qualified Label</Label><Input value={content.auditQualLabel} onChange={e => handleChange('auditQualLabel', e.target.value)} /></div><div className="space-y-2"><Label>Qualified Value</Label><Input value={content.auditQualValue} onChange={e => handleChange('auditQualValue', e.target.value)} /></div></div>
            <div className="grid grid-cols-2 gap-2"><div className="space-y-2"><Label>Site Visit Label</Label><Input value={content.auditSiteLabel} onChange={e => handleChange('auditSiteLabel', e.target.value)} /></div><div className="space-y-2"><Label>Site Visit Value</Label><Input value={content.auditSiteValue} onChange={e => handleChange('auditSiteValue', e.target.value)} /></div></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
