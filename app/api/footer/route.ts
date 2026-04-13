import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { cmsContent } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

const FOOTER_PAGE = 'footer'

export async function GET() {
  try {
    // Fetch all footer content
    const footerData = await db
      .select()
      .from(cmsContent)
      .where(eq(cmsContent.page, FOOTER_PAGE))

    // Organize content into structured format
    const content: any = {
      description: '',
      companyInfo: {
        name: '',
        address: '',
        phone: '',
        email: ''
      },
      socialLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
      },
      quickLinks: {
        title: 'Quick Links',
        links: []
      },
      legalLinks: {
        title: 'Legal',
        links: []
      },
      newsletter: {
        title: 'Stay Updated',
        description: '',
        placeholder: 'Enter your email'
      }
    }

    // Parse and organize the content
    footerData.forEach(item => {
      try {
        const parsedContent = JSON.parse(item.content) as any
        
        switch (item.section) {
          case 'description':
            content.description = parsedContent.text || ''
            break
          case 'companyInfo':
            content.companyInfo = { ...content.companyInfo, ...parsedContent }
            break
          case 'socialLinks':
            content.socialLinks = { ...content.socialLinks, ...parsedContent }
            break
          case 'quickLinks':
            content.quickLinks = { ...content.quickLinks, ...parsedContent }
            break
          case 'legalLinks':
            content.legalLinks = { ...content.legalLinks, ...parsedContent }
            break
          case 'newsletter':
            content.newsletter = { ...content.newsletter, ...parsedContent }
            break
        }
      } catch (error) {
        console.error('Error parsing content:', error)
      }
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching footer content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch footer content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json() as any
    
    // Validate required fields
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Define the sections to save
    const sections = [
      {
        section: 'description',
        content: JSON.stringify({ text: body.description || '' })
      },
      {
        section: 'companyInfo',
        content: JSON.stringify(body.companyInfo || {})
      },
      {
        section: 'socialLinks',
        content: JSON.stringify(body.socialLinks || {})
      },
      {
        section: 'quickLinks',
        content: JSON.stringify(body.quickLinks || {})
      },
      {
        section: 'legalLinks',
        content: JSON.stringify(body.legalLinks || {})
      },
      {
        section: 'newsletter',
        content: JSON.stringify(body.newsletter || {})
      }
    ]

    // Save each section
    for (const { section, content } of sections) {
      // Check if content already exists
      const existing = await db
        .select()
        .from(cmsContent)
        .where(and(
          eq(cmsContent.page, FOOTER_PAGE),
          eq(cmsContent.section, section)
        ))

      if (existing.length > 0) {
        // Update existing content
        await db
          .update(cmsContent)
          .set({
            content,
            updatedAt: new Date()
          })
          .where(and(
            eq(cmsContent.page, FOOTER_PAGE),
            eq(cmsContent.section, section)
          ))
      } else {
        // Insert new content
        await db.insert(cmsContent).values({
          page: FOOTER_PAGE,
          section,
          content,
          status: 'published',
          sequence: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving footer content:', error)
    return NextResponse.json(
      { error: 'Failed to save footer content' },
      { status: 500 }
    )
  }
}
