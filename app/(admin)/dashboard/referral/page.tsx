'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { Loader2 } from 'lucide-react'

const defaultContent = {
  pillText: "Problem 04 • No Referral System",
  heading: "Closing Deals But \n Starting From Zero Every Month",
  description: "After closing, most agents disappear. No CRM, no structured referral process means every month is a fresh hunt — with no compounding momentum.",
  points: [
    "Happy clients forget you exist without a system to stay top-of-mind.",
    "Zero referral pipeline means 100% dependence on paid ads forever.",
    "AI Algo-Plex automates referral nurture so every deal spawns the next."
  ],
  statBoxValue: "3x",
  statBoxText: "Agents with automated referral systems close 3× more deals than those relying on portals alone.",
  btnText: "Build My Own Pipeline",
  headBoxValue: "0",
  headBoxTitle: "Referrals this month",
  card1Title: "No post-sale CRM or \n follow-up system",
  card1Tag: "Missing",
  card2Title: "Past clients never \n re-contacted",
  card2Tag: "0 Leads",
  card3Title: "With referral system \n avg. revenue uplift",
  card3Tag: "+30%"
}

export default function ReferralCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'referral')
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
    const { success } = await upsertCmsContent('home', 'referral', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Referral Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Text Content (Left side)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Textarea value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Paragraph</Label><Textarea rows={3} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
            <div className="space-y-2">
              <Label>Bullet Points (One per line)</Label>
              <Textarea rows={4} value={content.points.join('\n')} onChange={e => handleChange('points', e.target.value.split('\n'))} />
            </div>
            <div className="border-t pt-4 space-y-4">
                <div className="space-y-2"><Label>Stat Box Value</Label><Input value={content.statBoxValue} onChange={e => handleChange('statBoxValue', e.target.value)} /></div>
                <div className="space-y-2"><Label>Stat Box Text</Label><Textarea value={content.statBoxText} onChange={e => handleChange('statBoxText', e.target.value)} /></div>
            </div>
            <div className="border-t pt-4 space-y-4">
                <div className="space-y-2"><Label>Button Text</Label><Input value={content.btnText} onChange={e => handleChange('btnText', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Visual UI Cards (Right side)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div className="space-y-2"><Label>Red Head Box Value</Label><Input value={content.headBoxValue} onChange={e => handleChange('headBoxValue', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Red Head Box Title</Label><Input value={content.headBoxTitle} onChange={e => handleChange('headBoxTitle', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div className="space-y-2"><Label>Card 1 Text</Label><Textarea value={content.card1Title} onChange={e => handleChange('card1Title', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Card 1 Tag</Label><Input value={content.card1Tag} onChange={e => handleChange('card1Tag', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div className="space-y-2"><Label>Card 2 Text</Label><Textarea value={content.card2Title} onChange={e => handleChange('card2Title', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Card 2 Tag</Label><Input value={content.card2Tag} onChange={e => handleChange('card2Tag', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Card 3 Text</Label><Textarea value={content.card3Title} onChange={e => handleChange('card3Title', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Card 3 Tag</Label><Input value={content.card3Tag} onChange={e => handleChange('card3Tag', e.target.value)} /></div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
