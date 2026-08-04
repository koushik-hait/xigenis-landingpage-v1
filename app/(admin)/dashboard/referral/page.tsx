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
  headingSize: "48",
  description: "After closing, most agents disappear. No CRM, no structured referral process means every month is a fresh hunt — with no compounding momentum.",
  descriptionSize: "16",
  points: ["Happy clients forget you exist without a system to stay top-of-mind.", "Zero referral pipeline means 100% dependence on paid ads forever.", "AI Algo-Plex automates referral nurture so every deal spawns the next."],
  pointsSize: "16",
  statBoxValue: "3x",
  statValueSize: "36",
  statBoxText: "Agents with automated referral systems close 3× more deals than those relying on portals alone.",
  statTextSize: "14",
  btnText: "Build My Own Pipeline",
  btnLink: "#",
  headBoxValue: "0", headBoxTitle: "Referrals this month",
  card1Title: "No post-sale CRM or \n follow-up system", card1Tag: "Missing",
  card2Title: "Past clients never \n re-contacted", card2Tag: "0 Leads",
  card3Title: "With referral system \n avg. revenue uplift", card3Tag: "+30%"
}

export default function ReferralCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>({ ...defaultContent })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'referral'); if (data) { const flatData = data.desktop || data; setContent({ ...defaultContent, ...flatData }) }; setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (key: string, value: any) => { setContent(prev => ({ ...prev, [key]: value })) }
  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'referral', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = () => {
    const d = content
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader><CardTitle>Text Content (Left side)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange( 'pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Textarea value={d.heading} onChange={e => handleChange( 'heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange( 'headingSize', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Paragraph</Label><Textarea rows={3} value={d.description} onChange={e => handleChange( 'description', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={d.descriptionSize} onChange={e => handleChange( 'descriptionSize', e.target.value)} /></div>
            <div className="space-y-2"><Label>Bullet Points (One per line)</Label><Textarea rows={4} value={d.points.join('\n')} onChange={e => handleChange( 'points', e.target.value.split('\n'))} /></div>
            <div className="space-y-2"><Label>Bullet Points Font Size (px)</Label><Input type="number" value={d.pointsSize} onChange={e => handleChange( 'pointsSize', e.target.value)} /></div>
            <div className="border-t pt-4 space-y-4">
                <div className="space-y-2"><Label>Stat Box Value</Label><Input value={d.statBoxValue} onChange={e => handleChange( 'statBoxValue', e.target.value)} /></div>
                <div className="space-y-2"><Label>Stat Box Value Font Size (px)</Label><Input type="number" value={d.statValueSize} onChange={e => handleChange( 'statValueSize', e.target.value)} /></div>
                <div className="space-y-2"><Label>Stat Box Text</Label><Textarea value={d.statBoxText} onChange={e => handleChange( 'statBoxText', e.target.value)} /></div>
                <div className="space-y-2"><Label>Stat Box Text Font Size (px)</Label><Input type="number" value={d.statTextSize} onChange={e => handleChange( 'statTextSize', e.target.value)} /></div>
            </div>
            <div className="border-t pt-4 space-y-4">
                <div className="space-y-2"><Label>Button Text</Label><Input value={d.btnText} onChange={e => handleChange( 'btnText', e.target.value)} /></div>
                <div className="space-y-2"><Label>Button Link (URL)</Label><Input value={d.btnLink || ""} onChange={e => handleChange( 'btnLink', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Visual UI Cards (Right side)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Red Head Box Value</Label><Input value={d.headBoxValue} onChange={e => handleChange( 'headBoxValue', e.target.value)} /></div><div className="space-y-2"><Label>Red Head Box Title</Label><Input value={d.headBoxTitle} onChange={e => handleChange( 'headBoxTitle', e.target.value)} /></div></div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 1 Text</Label><Textarea value={d.card1Title} onChange={e => handleChange( 'card1Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 1 Tag</Label><Input value={d.card1Tag} onChange={e => handleChange( 'card1Tag', e.target.value)} /></div></div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4"><div className="space-y-2"><Label>Card 2 Text</Label><Textarea value={d.card2Title} onChange={e => handleChange( 'card2Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 2 Tag</Label><Input value={d.card2Tag} onChange={e => handleChange( 'card2Tag', e.target.value)} /></div></div>
                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Card 3 Text</Label><Textarea value={d.card3Title} onChange={e => handleChange( 'card3Title', e.target.value)} /></div><div className="space-y-2"><Label>Card 3 Tag</Label><Input value={d.card3Tag} onChange={e => handleChange( 'card3Tag', e.target.value)} /></div></div>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Referral Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      {renderForm()}
    </div>
  )
}
