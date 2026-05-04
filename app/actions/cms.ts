'use server'

import { db } from '@/lib/db'
import { cmsContent } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getCmsContent(page: string, section: string, domainOverride?: string) {
  try {
    const cookieStore = await cookies();
    const domain = domainOverride || cookieStore.get('admin_domain')?.value || 'ca.xigenis.com';
    
    const data = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, domain),
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

export async function upsertCmsContent(page: string, section: string, contentData: any, domainOverride?: string) {
  try {
    const cookieStore = await cookies();
    const domain = domainOverride || cookieStore.get('admin_domain')?.value || 'ca.xigenis.com';

    const existing = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, domain),
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
        domain,
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

export async function setAdminDomain(domain: string) {
  const cookieStore = await cookies()
  cookieStore.set('admin_domain', domain, { maxAge: 60 * 60 * 24 * 365, path: '/' })
}

// Get all available domains with content
export async function getDomainsWithContent() {
  try {
    const data = await db.select({ domain: cmsContent.domain }).from(cmsContent).groupBy(cmsContent.domain)
    return data.map(d => d.domain)
  } catch (error) {
    console.error('Failed to get domains:', error)
    return []
  }
}

// Get all sections for a domain
export async function getSectionsForDomain(domain: string) {
  try {
    const data = await db.select({ page: cmsContent.page, section: cmsContent.section })
      .from(cmsContent)
      .where(eq(cmsContent.domain, domain))
    return data
  } catch (error) {
    console.error('Failed to get sections:', error)
    return []
  }
}

// Get all available sections across all domains (unique list)
export async function getAllUniqueSections() {
  try {
    const data = await db.select({ page: cmsContent.page, section: cmsContent.section })
      .from(cmsContent)
      .groupBy(cmsContent.page, cmsContent.section)
    return data
  } catch (error) {
    console.error('Failed to get unique sections:', error)
    return []
  }
}

// Duplicate content from source domain to destination domain
export async function duplicateContent(
  sourceDomain: string,
  destinationDomain: string,
  page: string,
  section: string,
  options?: { overwrite?: boolean }
) {
  try {
    // Get source content
    const sourceData = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, sourceDomain),
        eq(cmsContent.page, page),
        eq(cmsContent.section, section)
      ))
      .limit(1)

    const [sourceRecord] = sourceData

    if (!sourceRecord) {
      return { success: false, error: 'Source content not found' }
    }

    // Check if destination already has content for this section
    const existingDest = await db.select().from(cmsContent)
      .where(and(
        eq(cmsContent.domain, destinationDomain),
        eq(cmsContent.page, page),
        eq(cmsContent.section, section)
      ))
      .limit(1)

    const [existingRecord] = existingDest

    if (existingRecord) {
      if (!options?.overwrite) {
        return { 
          success: false, 
          error: 'Content already exists at destination. Use overwrite option to replace.',
          exists: true 
        }
      }

      // Update existing record
      await db.update(cmsContent)
        .set({
          content: sourceRecord.content,
          sequence: sourceRecord.sequence,
          status: sourceRecord.status,
          updatedAt: new Date(),
        })
        .where(eq(cmsContent.id, existingRecord.id))
    } else {
      // Insert new record
      await db.insert(cmsContent).values({
        domain: destinationDomain,
        page,
        section,
        content: sourceRecord.content,
        sequence: sourceRecord.sequence,
        status: sourceRecord.status,
      })
    }

    revalidatePath('/')
    revalidatePath('/dashboard')
    
    return { 
      success: true, 
      message: `Content duplicated from ${sourceDomain} to ${destinationDomain} for ${page}/${section}`,
      action: existingRecord ? 'updated' : 'created'
    }
  } catch (error) {
    console.error('Failed to duplicate content:', error)
    return { success: false, error: 'Failed to duplicate content' }
  }
}
