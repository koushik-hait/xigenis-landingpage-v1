import 'dotenv/config'
import { db } from '../lib/db'
import { cmsContent } from '../lib/db/schema'
import { eq, ne } from 'drizzle-orm'

async function migrateDomainData() {
  console.log('Starting CMS domain data migration to "default"...')

  try {
    // Select all records from cmsContent
    const allRecords = await db.select().from(cmsContent)
    console.log(`Found ${allRecords.length} total CMS content records.`)

    // Records with ca.xigenis.com or non-default domains
    const targetDomainRecords = allRecords.filter(r => r.domain === 'ca.xigenis.com')
    console.log(`Found ${targetDomainRecords.length} records with domain = "ca.xigenis.com".`)

    let updatedCount = 0

    // Update ca.xigenis.com domain records to default
    for (const record of targetDomainRecords) {
      await db.update(cmsContent)
        .set({ domain: 'default', updatedAt: new Date() })
        .where(eq(cmsContent.id, record.id))
      updatedCount++
    }

    // Also update any remaining non-default records if any exist
    const remainingNonDefault = await db.select().from(cmsContent).where(ne(cmsContent.domain, 'default'))
    for (const record of remainingNonDefault) {
      await db.update(cmsContent)
        .set({ domain: 'default', updatedAt: new Date() })
        .where(eq(cmsContent.id, record.id))
      updatedCount++
    }

    console.log(`Migration complete! Successfully migrated ${updatedCount} records to domain = "default".`)
  } catch (error) {
    console.error('Error during domain migration:', error)
    process.exit(1)
  }
}

migrateDomainData()
