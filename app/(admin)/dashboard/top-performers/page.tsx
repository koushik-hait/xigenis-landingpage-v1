"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { getCmsContent, upsertCmsContent } from "@/app/actions/cms"
import { uploadFile } from "@/app/actions/upload"
import { Loader2, Upload, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { DeviceTabsWrapper, migrateToDeviceStructure } from "@/components/admin/device-tabs-wrapper"

const defaultContent = {
  tag: "AI ALGO-PLEX - VERIFIED RESULTS",
  headingLine1: "How we change their",
  headingLine2: "business",
  headingSize: "48", // in px
  headingColor: "#000000",
  description:
    "Real success stories from agents who generated qualified buyer leads, increased site visits, and closed high-value property deals using our proven system.",
  descriptionSize: "14", // in px
  descriptionColor: "#6B7280",
  ctaText: "Apply for Strategy Call",
  ctaBgColor: "#000000",
  ctaTextColor: "#ffffff",
  ctaArrowBgColor: "#F36B2B",
  performers: [
    {
      name: "Amrita Verma",
      role: "Agent | Mumbai",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      badge: "TOP CLOSER",
      metrics: [
        { label: "qualified buyer leads in 60 days", value: "320+" },
        { label: "property deals closed", value: "₹4.2 Cr" },
        { label: "high-intent buyer inquiries generated", value: "210+" },
      ],
    },
  ],
  footerCard: {
    number: "12",
    labels: ["More", "Success", "Stories"],
    subLabels: "Agents • CPs Builders • Brokers",
  },
}

export default function TopPerformersCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({
    desktop: { ...defaultContent },
    mobile: { ...defaultContent },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent("home", "top-performers")
      if (data) {
        setContent(migrateToDeviceStructure(data, defaultContent))
      }
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (device: "desktop" | "mobile", key: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [device]: { ...prev[device], [key]: value },
    }))
  }

  const handlePerformerChange = (
    device: "desktop" | "mobile",
    index: number,
    field: "name" | "role" | "image" | "badge",
    value: string
  ) => {
    const newPerformers = [...content[device].performers]
    const performer = newPerformers[index]
    if (!performer) return

    newPerformers[index] = { ...performer, [field]: value }
    handleChange(device, "performers", newPerformers)
  }

  const handleMetricChange = (
    device: "desktop" | "mobile",
    perIdx: number,
    metIdx: number,
    field: "label" | "value",
    value: string
  ) => {
    const newPerformers = [...content[device].performers]
    const performer = newPerformers[perIdx]
    if (!performer) return

    const newMetrics = [...performer.metrics]
    const metric = newMetrics[metIdx]
    if (!metric) return

    newMetrics[metIdx] = { ...metric, [field]: value }
    newPerformers[perIdx] = { ...performer, metrics: newMetrics }
    handleChange(device, "performers", newPerformers)
  }

  const addPerformer = (device: "desktop" | "mobile") => {
    const newPerformer = {
      name: "New Performer",
      role: "Role | City",
      image: "",
      badge: "TOP CLOSER",
      metrics: [
        { label: "metric label", value: "0" },
        { label: "metric label", value: "0" },
        { label: "metric label", value: "0" },
      ],
    }
    handleChange(device, "performers", [...content[device].performers, newPerformer])
  }

  const removePerformer = (device: "desktop" | "mobile", index: number) => {
    handleChange(
      device,
      "performers",
      content[device].performers.filter((_: any, i: number) => i !== index)
    )
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    device: "desktop" | "mobile",
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingIdx(index)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handlePerformerChange(device, index, "image", finalUrl)
        toast.success("Image uploaded")
      }
    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setUploadingIdx(null)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent("home", "top-performers", content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )

  const renderForm = (device: "desktop" | "mobile") => {
    const deviceContent = content[device]
    return (
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Left Section Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Badge Tag</Label>
              <Input value={deviceContent.tag} onChange={(e) => handleChange(device, "tag", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Heading Line 1</Label>
                <Input
                  value={deviceContent.headingLine1}
                  onChange={(e) => handleChange(device, "headingLine1", e.target.value)}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Heading Line 2</Label>
                <Input
                  value={deviceContent.headingLine2}
                  onChange={(e) => handleChange(device, "headingLine2", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Heading Size (px)</Label>
                <Input
                  type="number"
                  value={deviceContent.headingSize}
                  onChange={(e) => handleChange(device, "headingSize", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Heading Color</Label>
                <Input
                  type="color"
                  value={deviceContent.headingColor}
                  onChange={(e) => handleChange(device, "headingColor", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2 border-t pt-4">
              <Label>Description</Label>
              <Textarea
                value={deviceContent.description}
                onChange={(e) => handleChange(device, "description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Description Size (px)</Label>
                <Input
                  type="number"
                  value={deviceContent.descriptionSize}
                  onChange={(e) => handleChange(device, "descriptionSize", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description Color</Label>
                <Input
                  type="color"
                  value={deviceContent.descriptionColor}
                  onChange={(e) => handleChange(device, "descriptionColor", e.target.value)}
                />
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
              <Input value={deviceContent.ctaText} onChange={(e) => handleChange(device, "ctaText", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bg Color</Label>
                <Input
                  type="color"
                  value={deviceContent.ctaBgColor}
                  onChange={(e) => handleChange(device, "ctaBgColor", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                  type="color"
                  value={deviceContent.ctaTextColor}
                  onChange={(e) => handleChange(device, "ctaTextColor", e.target.value)}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Arrow Wrapper Color</Label>
                <Input
                  type="color"
                  value={deviceContent.ctaArrowBgColor}
                  onChange={(e) => handleChange(device, "ctaArrowBgColor", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performer Cards</CardTitle>
              <CardDescription>Configure the individual success story cards</CardDescription>
            </div>
            <Button variant="default" size="sm" onClick={() => addPerformer(device)}>
              <Plus className="mr-2 h-4 w-4" /> Add Card
            </Button>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            {deviceContent.performers.map((p: any, idx: number) => (
              <div key={idx} className="bg-muted/30 relative space-y-4 rounded-lg border p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive absolute top-2 right-2"
                  onClick={() => removePerformer(device, idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex flex-col items-center gap-4">
                  <div className="group relative">
                    <div className="bg-background h-20 w-20 overflow-hidden rounded-full border">
                      {p.image ? (
                        <img src={p.image} className="h-full w-full object-cover" />
                      ) : (
                        <div className="z-20 flex h-full w-full items-center justify-center">
                          <Upload className="h-10 w-10 cursor-pointer text-white opacity-100" />
                        </div>
                      )}
                    </div>
                    {p.image && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Upload className="h-10 w-10 cursor-pointer text-white" />
                      </div>
                    )}
                    <Input
                      type="file"
                      className="absolute inset-0 z-10 cursor-pointer opacity-0"
                      onChange={(e) => handleFileUpload(e, device, idx)}
                    />
                    {uploadingIdx === idx && (
                      <div className="bg-background/50 absolute inset-0 flex items-center justify-center rounded-full">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="w-full space-y-2">
                    <Input
                      placeholder="Name"
                      value={p.name}
                      onChange={(e) => handlePerformerChange(device, idx, "name", e.target.value)}
                    />
                    <Input
                      placeholder="Role/City"
                      value={p.role}
                      onChange={(e) => handlePerformerChange(device, idx, "role", e.target.value)}
                    />
                    <Input
                      placeholder="Badge"
                      value={p.badge}
                      onChange={(e) => handlePerformerChange(device, idx, "badge", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t pt-2">
                  <Label className="text-[10px] font-bold uppercase opacity-50">Metrics</Label>
                  {p.metrics.map((m: any, mIdx: number) => (
                    <div key={mIdx} className="grid grid-cols-3 gap-2">
                      <Input
                        className="col-span-1 text-xs"
                        placeholder="Value"
                        value={m.value}
                        onChange={(e) => handleMetricChange(device, idx, mIdx, "value", e.target.value)}
                      />
                      <Input
                        className="col-span-2 text-xs"
                        placeholder="Label"
                        value={m.label}
                        onChange={(e) => handleMetricChange(device, idx, mIdx, "label", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Footer Summary Card</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Number</Label>
              <Input
                value={deviceContent.footerCard.number}
                onChange={(e) =>
                  handleChange(device, "footerCard", { ...deviceContent.footerCard, number: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Vertical Labels (One per line)</Label>
              <Textarea
                value={deviceContent.footerCard.labels.join("\n")}
                onChange={(e) =>
                  handleChange(device, "footerCard", {
                    ...deviceContent.footerCard,
                    labels: e.target.value.split("\n"),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Sub-labels</Label>
              <Input
                value={deviceContent.footerCard.subLabels}
                onChange={(e) =>
                  handleChange(device, "footerCard", { ...deviceContent.footerCard, subLabels: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Top Performers CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
