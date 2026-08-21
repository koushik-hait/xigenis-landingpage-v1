'use server'

import { db } from '@/lib/db'
import { cmsContent } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'

const DEFAULT_DOMAIN = 'default'

const getCachedPageContent = unstable_cache(
  async (page: string) => {
    const data = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, DEFAULT_DOMAIN),
        eq(cmsContent.page, page)
      ))
    return data
  },
  ['cms-content'],
  { tags: ['cms'], revalidate: 31536000 } // 1 year cache TTL as requested
)

export async function getCmsContent(page: string, section: string) {
  try {
    const data = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, DEFAULT_DOMAIN),
        eq(cmsContent.page, page), 
        eq(cmsContent.section, section)
      ))
      .limit(1)

    const [firstRecord] = data

    if (firstRecord) {
      return JSON.parse(firstRecord.content) as any
    }
    return null
  } catch (error) {
    console.error('Failed to get CMS content:', error)
    return null
  }
}

export async function getPageContent(page: string) {
  try {
    const data = await getCachedPageContent(page)

    return data.reduce((acc, record) => {
      acc[record.section] = JSON.parse(record.content)
      return acc
    }, {} as Record<string, any>)
  } catch (error) {
    console.error('Failed to get page CMS content:', error)
    return {}
  }
}

export async function upsertCmsContent(page: string, section: string, contentData: any) {
  try {
    const existing = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, DEFAULT_DOMAIN),
        eq(cmsContent.page, page), 
        eq(cmsContent.section, section)
      ))
      .limit(1)
    
    const [existingRecord] = existing
    
    if (existingRecord) {
      await db.update(cmsContent)
        .set({
          content: JSON.stringify(contentData),
          updatedAt: new Date(),
        })
        .where(eq(cmsContent.id, existingRecord.id))
    } else {
      await db.insert(cmsContent).values({
        domain: DEFAULT_DOMAIN,
        page,
        section,
        content: JSON.stringify(contentData),
        status: 'published',
      })
    }
    
    revalidatePath('/')
    revalidateTag('cms', {})
    return { success: true }
  } catch (error) {
    console.error('Failed to upsert CMS content:', error)
    return { success: false, error: 'Failed to update content' }
  }
}
