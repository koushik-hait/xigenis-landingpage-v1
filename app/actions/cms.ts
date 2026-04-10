'use server'

import { db } from '@/lib/db'
import { cmsContent } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getCmsContent(page: string, section: string) {
  try {
    const data = await db.select().from(cmsContent)
      .where(and(eq(cmsContent.page, page), eq(cmsContent.section, section)))
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

export async function upsertCmsContent(page: string, section: string, contentData: any) {
  try {
    const existing = await db.select().from(cmsContent)
      .where(and(eq(cmsContent.page, page), eq(cmsContent.section, section)))
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
        page,
        section,
        content: JSON.stringify(contentData),
        status: 'published',
      })
    }
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to upsert CMS content:', error)
    return { success: false, error: 'Failed to update content' }
  }
}
