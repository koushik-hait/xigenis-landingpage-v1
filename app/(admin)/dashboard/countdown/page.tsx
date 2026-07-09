'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { getCmsContent, upsertCmsContent } from '@/app/actions/cms'
import { Loader2 } from 'lucide-react'
import { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'

const defaultContent = {
  enabled: true,
  slotsCount: "3",
  countdownDuration: "300",
  btnText: "Claim My Slot",
  btnLink: "#contact",
  text: "Only {slots} strategy call slots remaining this week"
}

export default function CountdownCmsPage() {
  const [content, setContent] = useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({
    desktop: { ...defaultContent },
    mobile: { ...defaultContent }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchInitial() {
      const data = await getCmsContent('home', 'countdown')
      if (data) setContent(migrateToDeviceStructure(data, defaultContent))
      setIsLoading(false)
    }
    fetchInitial()
  }, [])

  const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => {
    setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const { success } = await upsertCmsContent('home', 'countdown', content)
    if (success) toast.success("Saved successfully")
    else toast.error("Failed to save")
    setIsSaving(false)
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const renderForm = (device: 'desktop' | 'mobile') => {
    const d = content[device]
    return (
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Countdown Bar Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-0.5">
                <Label>Enable Countdown Bar</Label>
                <p className="text-xs text-muted-foreground">Show or hide the countdown bar globally at the top of the page</p>
              </div>
              <Switch checked={d.enabled} onCheckedChange={checked => handleChange(device, 'enabled', checked)} />
            </div>
            
            <div className="space-y-2">
              <Label>Slots Count (e.g., 3)</Label>
              <Input type="number" value={d.slotsCount} onChange={e => handleChange(device, 'slotsCount', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Countdown Duration (Seconds, e.g., 300 for 5 minutes)</Label>
              <Input type="number" value={d.countdownDuration} onChange={e => handleChange(device, 'countdownDuration', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Message Text (Use {`{slots}`} as placeholder for slots count)</Label>
              <Input value={d.text} onChange={e => handleChange(device, 'text', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input value={d.btnText} onChange={e => handleChange(device, 'btnText', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Button Link (e.g., #contact or external URL)</Label>
              <Input value={d.btnLink} onChange={e => handleChange(device, 'btnLink', e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Countdown Bar CMS</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
        </Button>
      </div>
      <DeviceTabsWrapper renderForm={renderForm} />
    </div>
  )
}
