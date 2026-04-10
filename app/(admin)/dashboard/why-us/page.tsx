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
  pillText: "WHY LEADERS CHOOSE US",
  heading: "Built for Those Who Close, Not Chase.",
  description: "We work exclusively with real estate professionals who want qualified pipeline — not vanity metrics.",
  features: [
    {
      title: "100% Real Estate DNA — No Generic Marketers",
      desc: "Every strategist, every campaign, every creative — built exclusively for real estate. We don't dabble in FMCG on Monday and run your ads on Friday.",
      tag: "Sector Specialists",
    },
    {
      title: "Real-Time Dashboard — Know Where Every Rupee Goes",
      desc: "Live spend tracking, cost-per-lead, and funnel data — 24/7. No monthly PDF surprises. Full transparency, always.",
      tag: "Full Transparency",
    },
    {
      title: "Bank-Level Data Security — Your Client Intel Stays Confidential",
      desc: "256-bit encryption, NDA-backed operations, and zero third-party data sharing. Your buyer lists never leave your vault.",
      tag: "Enterprise-Grade",
    },
    {
      title: "Dedicated Success Manager — One Point. Full Ownership.",
      desc: "A senior strategist owns your account end-to-end. No ticket queues, no rotating junior teams — one expert accountable for your growth.",
      tag: "Senior-Only Teams",
    },
    {
      title: "Quarterly Strategy Sessions — Growth Mapped, Not Guessed",
      desc: "Sit with senior leadership every quarter. Audit campaigns, revise targeting, and co-build a 90-day roadmap aligned to your sales calendar.",
      tag: "Executive Access",
    },
    {
      title: "Performance-Only Philosophy",
      desc: "We don't get comfortable on retainers. Every rupee is tied to a metric. If the numbers don't move, we don't sleep.",
      tag: "ROI Obsessed",
    },
  ],
  footerStats: [
    { value: "₹47Cr+", label: "Property Pipeline Created" },
    { value: "2.4L+", label: "Verified Leads Delivered" },
    { value: "98%", label: "Client Retention Rate" },
  ]
}

export default function WhyChooseUsCmsPage() {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'why-us')
      if (data) setContent({ ...defaultContent, ...data })
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleFeatureChange = (index: number, key: string, value: string) => {
    setContent(prev => {
      const newFeatures = [...prev.features]
      newFeatures[index] = { ...newFeatures[index], [key]: value } as any
      return { ...prev, features: newFeatures }
    })
  }

  const handleStatChange = (index: number, key: string, value: string) => {
    setContent(prev => {
      const newStats = [...prev.footerStats]
      newStats[index] = { ...newStats[index], [key]: value } as any
      return { ...prev, footerStats: newStats }
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'why-us', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Why Choose Us CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={content.pillText} onChange={e => handleChange('pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Input value={content.heading} onChange={e => handleChange('heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={content.description} onChange={e => handleChange('description', e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Feature Cards Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.features.map((feature, i) => (
                        <div key={i} className="border p-4 bg-muted/20 space-y-3 rounded">
                            <Label className="text-orange-600 font-bold block pb-2 border-b">Feature {i+1}</Label>
                            <div><Label className="text-xs">Title</Label><Textarea rows={2} className="text-xs" value={feature.title} onChange={e => handleFeatureChange(i, 'title', e.target.value)} /></div>
                            <div><Label className="text-xs">Description</Label><Textarea rows={4} className="text-xs" value={feature.desc} onChange={e => handleFeatureChange(i, 'desc', e.target.value)} /></div>
                            <div><Label className="text-xs">Tag</Label><Input className="text-xs" value={feature.tag} onChange={e => handleFeatureChange(i, 'tag', e.target.value)} /></div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Footer Statistics Grid</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {content.footerStats.map((stat, i) => (
                        <div key={i} className="space-y-2">
                           <Label className="font-bold">Stat {i+1} Value</Label>
                           <Input value={stat.value} onChange={e => handleStatChange(i, 'value', e.target.value)} />
                           <Label className="font-bold">Stat {i+1} Label Text</Label>
                           <Input value={stat.label} onChange={e => handleStatChange(i, 'label', e.target.value)} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
