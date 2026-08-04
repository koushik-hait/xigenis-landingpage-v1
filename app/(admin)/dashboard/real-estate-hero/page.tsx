"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Save, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Image from "next/image"
import { getCmsContent, upsertCmsContent } from "@/app/actions/cms"
import { uploadFile } from "@/app/actions/upload"

const defaultContent = {
  badgeText: "Trusted by 100+ B2B Organization",
  heading: "Generate Qualified Property Buyer Leads Without Wasting Money On Low-Quality Inquiries",
  headingSize: "48",
  buttonText: "Speak With A Strategy Expert Today",
  buttonLink: "#",
  backgroundImage: "/hero-family-pool.jpg",
  valueProps: [
    "High-Intent Property Buyers",
    "Qualified Buyer Inquiries Fast",
    "Full Campaign Transparency",
    "Real Estate Marketing Experts",
    "More Site Visits & Deals",
  ],
}

export default function RealEstateHeroAdmin() {
  const [content, setContent] = useState<typeof defaultContent>({ ...defaultContent })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCmsContent("home", "real-estate-hero")
        if (data && Object.keys(data).length > 0) {
          const flatData = data.desktop || data
          setContent({ ...defaultContent, ...flatData })
        }
      } catch (error) {
        console.error("Failed to load:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleChange = (key: string, value: any) => {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await upsertCmsContent("home", "real-estate-hero", content)
      toast.success("Hero updated successfully")
    } catch (error) {
      console.error("Failed to save:", error)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const handleValuePropChange = (index: number, value: string) => {
    const newProps = [...content.valueProps]
    newProps[index] = value
    handleChange("valueProps", newProps)
  }

  const addValueProp = () => {
    handleChange("valueProps", [...content.valueProps, ""])
  }

  const removeValueProp = (index: number) => {
    handleChange(
      "valueProps",
      content.valueProps.filter((_: any, i: number) => i !== index)
    )
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const { success, finalUrl } = await uploadFile(formData)
      if (success && finalUrl) {
        handleChange("backgroundImage", finalUrl)
        toast.success("Image uploaded successfully")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bottom Hero Section</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Trust Badge Text</Label>
                <Input value={content.badgeText} onChange={(e) => handleChange("badgeText", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Main Heading</Label>
                <Textarea
                  value={content.heading}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Heading Font Size (px)</Label>
                <Input
                  type="number"
                  value={content.headingSize}
                  onChange={(e) => handleChange("headingSize", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={content.buttonText} onChange={(e) => handleChange("buttonText", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Button Link (URL)</Label>
                <Input value={content.buttonLink || ""} onChange={(e) => handleChange("buttonLink", e.target.value)} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Background Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.backgroundImage && (
                <div className="relative aspect-video overflow-hidden rounded-lg border bg-gray-100">
                  <Image fill src={content.backgroundImage} alt="Hero background" className="object-cover" />
                </div>
              )}
              <div>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex h-12 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-4 transition-colors hover:border-gray-400">
                    {uploadingImage ? (
                      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                    ) : (
                      <span className="flex items-center text-sm text-gray-600">
                        <ImageIcon className="mr-2 h-4 w-4" /> Upload Image
                      </span>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Value Propositions</CardTitle>
              <Button onClick={addValueProp} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.valueProps.map((prop: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={prop} onChange={(e) => handleValuePropChange(index, e.target.value)} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-red-500"
                    onClick={() => removeValueProp(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
