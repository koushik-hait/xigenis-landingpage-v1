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
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: "WHY LEADERS CHOOSE US", heading: "Built for Those Who Close, Not Chase.",
  headingSize: "48",
  description: "We work exclusively with real estate professionals who want qualified pipeline — not vanity metrics.",
  descriptionSize: "16",
  features: [
    { title: "100% Real Estate DNA — No Generic Marketers", desc: "Every strategist, every campaign, every creative — built exclusively for real estate.", tag: "Sector Specialists" },
    { title: "Real-Time Dashboard — Know Where Every Rupee Goes", desc: "Live spend tracking, cost-per-lead, and funnel data — 24/7.", tag: "Full Transparency" },
    { title: "Bank-Level Data Security — Your Client Intel Stays Confidential", desc: "256-bit encryption, NDA-backed operations, and zero third-party data sharing.", tag: "Enterprise-Grade" },
    { title: "Dedicated Success Manager — One Point. Full Ownership.", desc: "A senior strategist owns your account end-to-end.", tag: "Senior-Only Teams" },
    { title: "Quarterly Strategy Sessions — Growth Mapped, Not Guessed", desc: "Sit with senior leadership every quarter.", tag: "Executive Access" },
    { title: "Performance-Only Philosophy", desc: "We don't get comfortable on retainers. Every rupee is tied to a metric.", tag: "ROI Obsessed" },
  ],
  footerStats: [
    { value: "₹47Cr+", label: "Property Pipeline Created" },
    { value: "2.4L+", label: "Verified Leads Delivered" },
    { value: "98%", label: "Client Retention Rate" },
  ]
}

export default function WhyChooseUsCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent('home', 'why-us'); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleFeatureChange = (device: 'desktop' | 'mobile', index: number, key: string, value: string) => {
    const newFeatures = [...content[device].features]; newFeatures[index] = { ...newFeatures[index], [key]: value } as any; handleChange(device, 'features', newFeatures)
  }
  const handleStatChange = (device: 'desktop' | 'mobile', index: number, key: string, value: string) => {
    const newStats = [...content[device].footerStats]; newStats[index] = { ...newStats[index], [key]: value } as any; handleChange(device, 'footerStats', newStats)
  }

  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent('home', 'why-us', content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 mt-4">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={e => handleChange(device, 'pillText', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading</Label><Input value={d.heading} onChange={e => handleChange(device, 'heading', e.target.value)} /></div>
            <div className="space-y-2"><Label>Heading Font Size (px)</Label><Input type="number" value={d.headingSize} onChange={e => handleChange(device, 'headingSize', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={d.description} onChange={e => handleChange(device, 'description', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description Font Size (px)</Label><Input type="number" value={d.descriptionSize} onChange={e => handleChange(device, 'descriptionSize', e.target.value)} /></div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Feature Cards Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {d.features.map((feature, i) => (
                        <div key={i} className="border p-4 bg-muted/20 space-y-3 rounded">
                            <Label className="text-orange-600 font-bold block pb-2 border-b">Feature {i+1}</Label>
                            <div><Label className="text-xs">Title</Label><Textarea rows={2} className="text-xs" value={feature.title} onChange={e => handleFeatureChange(device, i, 'title', e.target.value)} /></div>
                            <div><Label className="text-xs">Description</Label><Textarea rows={4} className="text-xs" value={feature.desc} onChange={e => handleFeatureChange(device, i, 'desc', e.target.value)} /></div>
                            <div><Label className="text-xs">Tag</Label><Input className="text-xs" value={feature.tag} onChange={e => handleFeatureChange(device, i, 'tag', e.target.value)} /></div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Footer Statistics Grid</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {d.footerStats.map((stat, i) => (
                        <div key={i} className="space-y-2">
                           <Label className="font-bold">Stat {i+1} Value</Label><Input value={stat.value} onChange={e => handleStatChange(device, i, 'value', e.target.value)} />
                           <Label className="font-bold">Stat {i+1} Label Text</Label><Input value={stat.label} onChange={e => handleStatChange(device, i, 'label', e.target.value)} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Why Choose Us CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
