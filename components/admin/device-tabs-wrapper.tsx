'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Monitor, Smartphone } from 'lucide-react'

interface DeviceTabsWrapperProps {
  renderForm: (device: 'desktop' | 'mobile') => React.ReactNode
}

export function DeviceTabsWrapper({ renderForm }: DeviceTabsWrapperProps) {
  return (
    <Tabs defaultValue="desktop" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
        <TabsTrigger value="desktop" className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          Desktop Edition
        </TabsTrigger>
        <TabsTrigger value="mobile" className="flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          Mobile Edition
        </TabsTrigger>
      </TabsList>
      <TabsContent value="desktop">
        {renderForm('desktop')}
      </TabsContent>
      <TabsContent value="mobile">
        {renderForm('mobile')}
      </TabsContent>
    </Tabs>
  )
}

/**
 * Helper to migrate flat CMS data to nested { desktop, mobile } structure.
 * If data already has desktop/mobile keys, returns it as-is.
 * Otherwise wraps the flat data under both keys.
 */
export function migrateToDeviceStructure<T extends Record<string, any>>(
  data: any,
  defaultContent: T
): { desktop: T; mobile: T } {
  if (data && data.desktop && data.mobile) {
    return {
      desktop: { ...defaultContent, ...data.desktop },
      mobile: { ...defaultContent, ...data.mobile },
    }
  }
  // Flat data -> wrap under both devices
  const merged = data ? { ...defaultContent, ...data } : defaultContent
  return {
    desktop: { ...merged },
    mobile: { ...merged },
  }
}
