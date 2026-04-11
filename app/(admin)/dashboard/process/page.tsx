"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { getCmsContent, upsertCmsContent } from "@/app/actions/cms"
import { Loader2 } from "lucide-react"
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  pillText: "OUR PROCESS",
  heading: "How We Build Your Revenue System in 15 Days",
  description: "Six phases. Three zones. Four senior experts. One outcome: deals closing on autopilot.",
  zones: [
    { id: 1, title: "Intelligence & Design", subtitle: "Where most agencies don't even start", owner: "Business Analyst", steps: [
        { id: 1, days: "Day 5-7", title: "Growth & Market Intelligence", desc: "Business audit, project reality check, demand analysis, competitive landscape mapping.", tag: "We diagnose before we deploy." },
        { id: 2, days: "Day 3-4", title: "Funnel & Intent Architecture", desc: "Buyer journey design, intent signal mapping, lead scoring logic, CRM pipeline planning.", tag: "We diagnose before we deploy." },
    ]},
    { id: 2, title: "Demand & Acquisition", subtitle: "Where attention becomes intent", owner: "Performance Marketer", steps: [
        { id: 3, days: "Day 5-7", title: "Demand Creation Engine", desc: "Authority content, trust-building, education and belief shifting across digital channels.", tag: "We create demand before we capture it." },
        { id: 4, days: "Day 8-10", title: "Intent Lead Capture", desc: "Paid acquisition, high-intent audiences, qualification-driven landing pages and smart forms.", tag: "Not traffic. Not clicks. Real intent." },
    ]},
    { id: 3, title: "Intelligence & Automation", subtitle: "Where money is actually made", owner: "GTM Engineer", steps: [
        { id: 5, days: "Day 11-13", title: "Lead Intelligence & Follow-Up", desc: "AI scoring, WhatsApp automation, email sequencing, intelligent sales routing.", tag: "No lead left unattended." },
    ]},
    { id: 4, title: "Revenue Outcomes", subtitle: "Where deals get closed", owner: "Client Success Manager", steps: [
        { id: 6, days: "Day 14-15", title: "Sales Enablement & Site Visits", desc: "Context-rich handoff, visit confirmations, objection handling and conversion optimisation.", tag: "From enquiry to site visit — systematically." },
    ]},
  ],
  footerHighlights: [
    { label: "6 STEPS", sub: "END-TO-END" },
    { label: "4 DEDICATED SPECIALISTS", sub: "PER ACCOUNT" },
    { label: "SYSTEM FULLY", sub: "LIVE IN 15 DAYS" },
    { label: "4 DEALS GUARANTEED", sub: "IN 90 DAYS" },
  ],
  footerBtnText: "START YOUR 15 DAYS BUILD",
}

export default function ProcessCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({ desktop: { ...defaultContent }, mobile: { ...defaultContent } })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { async function fetchInitial() { const data = await getCmsContent("home", "process"); if (data) setContent(migrateToDeviceStructure(data, defaultContent)); setIsLoading(false) } fetchInitial() }, [])
  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => { setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } })) }

  const handleZoneChange = (device: 'desktop' | 'mobile', zIndex: number, key: string, value: any) => {
    const newZones = [...content[device].zones]; newZones[zIndex] = { ...newZones[zIndex], [key]: value } as any; handleChange(device, 'zones', newZones)
  }
  const handleStepChange = (device: 'desktop' | 'mobile', zIndex: number, sIndex: number, key: string, value: any) => {
    const newZones = [...content[device].zones]; const newSteps = [...(newZones[zIndex]?.steps || [])]; newSteps[sIndex] = { ...newSteps[sIndex], [key]: value } as any; newZones[zIndex]!.steps = newSteps; handleChange(device, 'zones', newZones)
  }
  const handleHighlightChange = (device: 'desktop' | 'mobile', index: number, key: string, value: any) => {
    const newHighlights = [...content[device].footerHighlights]; newHighlights[index] = { ...newHighlights[index], [key]: value } as any; handleChange(device, 'footerHighlights', newHighlights)
  }

  const handleSave = async () => { setIsSaving(true); const { success } = await upsertCmsContent("home", "process", content); if (success) toast.success("Saved successfully"); else toast.error("Failed to save"); setIsSaving(false) }
  if (isLoading) return (<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>)

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 mt-4">
        <Card>
          <CardHeader><CardTitle>Header Content</CardTitle></CardHeader>
          <CardContent className="max-w-3xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Pill Label</Label><Input value={d.pillText} onChange={(e) => handleChange(device, "pillText", e.target.value)} /></div>
              <div className="space-y-2"><Label>Heading</Label><Input value={d.heading} onChange={(e) => handleChange(device, "heading", e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={d.description} onChange={(e) => handleChange(device, "description", e.target.value)} /></div>
          </CardContent>
        </Card>

        <div className="space-y-6 rounded-md border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold">Timeline Zones & Steps</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {d.zones.map((zone, zIndex) => (
              <div key={zIndex} className="bg-muted/20 space-y-4 border p-4">
                <Label className="mb-2 block border-b pb-2 font-bold text-orange-600">Zone {zone.id}</Label>
                <div className="space-y-2"><Label className="text-xs">Title</Label><Input value={zone.title} onChange={(e) => handleZoneChange(device, zIndex, "title", e.target.value)} /></div>
                <div className="space-y-2"><Label className="text-xs">Subtitle</Label><Input value={zone.subtitle} onChange={(e) => handleZoneChange(device, zIndex, "subtitle", e.target.value)} /></div>
                <div className="space-y-2"><Label className="text-xs">Owner Role</Label><Input value={zone.owner} onChange={(e) => handleZoneChange(device, zIndex, "owner", e.target.value)} /></div>
                <div className="mt-4 space-y-4 border-t pt-4">
                  <Label className="mb-2 block text-sm font-bold">Steps in this Zone</Label>
                  {zone.steps.map((step, sIndex) => (
                    <div key={sIndex} className="space-y-2 rounded border bg-white p-3 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-[10px]">Step Tag</Label><Input value={step.id} onChange={(e) => handleStepChange(device, zIndex, sIndex, "id", e.target.value)} /></div>
                        <div><Label className="text-[10px]">Days</Label><Input value={step.days} onChange={(e) => handleStepChange(device, zIndex, sIndex, "days", e.target.value)} /></div>
                      </div>
                      <div><Label className="text-[10px]">Title</Label><Input value={step.title} onChange={(e) => handleStepChange(device, zIndex, sIndex, "title", e.target.value)} /></div>
                      <div><Label className="text-[10px]">Description</Label><Textarea rows={2} className="text-xs" value={step.desc} onChange={(e) => handleStepChange(device, zIndex, sIndex, "desc", e.target.value)} /></div>
                      <div><Label className="text-[10px]">Small Tagline</Label><Input value={step.tag} onChange={(e) => handleStepChange(device, zIndex, sIndex, "tag", e.target.value)} /></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Bottom Footer Area</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Footer Button Text</Label><Input value={d.footerBtnText} className="mt-2 max-w-xs" onChange={(e) => handleChange(device, "footerBtnText", e.target.value)} /></div>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {d.footerHighlights.map((hl, hlIdx) => (
                <div key={hlIdx} className="bg-muted/20 space-y-2 rounded border p-3">
                  <Label className="text-xs">Highlight {hlIdx + 1} Top</Label><Input value={hl.label} onChange={(e) => handleHighlightChange(device, hlIdx, "label", e.target.value)} />
                  <Label className="mt-2 inline-block text-xs">Highlight {hlIdx + 1} Bottom</Label><Input value={hl.sub} onChange={(e) => handleHighlightChange(device, hlIdx, "sub", e.target.value)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Process Section CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes</Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
