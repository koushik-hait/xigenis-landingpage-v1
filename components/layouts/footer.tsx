import { db } from "@/lib/db"
import { cmsContent } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FooterContent {
  description: string
  companyInfo: {
    name: string
    address: string
    phone: string
    email: string
  }
  socialLinks: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
  }
  quickLinks: {
    title: string
    links: Array<{ label: string; url: string }>
  }
  legalLinks: {
    title: string
    links: Array<{ label: string; url: string }>
  }
  newsletter: {
    title: string
    description: string
    placeholder: string
  }
}

export default async function Footer() {
  const content: FooterContent = {
    description: 'At Xigenis, we help real estate professionals build a predictable pipeline of qualified property buyers. Our system combines AI-driven lead generation, targeted campaigns, and smart follow-up automation to attract serious buyers and close more deals consistently.',
    companyInfo: {
      name: 'Xigenis',
      address: '',
      phone: '+91 99999 99999',
      email: 'INFO@XIGENIS.COM'
    },
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#'
    },
    quickLinks: {
      title: 'Quick Links',
      links: [
        { label: 'Home', url: '/' },
        { label: 'About Us', url: '#why-us' },
        { label: 'Services', url: '#process' },
        { label: 'Contact', url: '#contact' }
      ]
    },
    legalLinks: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms & Conditions', url: '/terms-and-conditions' },
        { label: 'Refund Policy', url: '/refund-policy' }
      ]
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to our newsletter for the latest updates',
      placeholder: 'Enter your email'
    }
  }

  try {
    const footerData = await db
      .select()
      .from(cmsContent)
      .where(eq(cmsContent.page, 'footer'))

    footerData.forEach(item => {
      try {
        const parsedContent = JSON.parse(item.content) as any
        
        switch (item.section) {
          case 'description':
            content.description = parsedContent.text || content.description
            break
          case 'companyInfo':
            content.companyInfo = { ...content.companyInfo, ...parsedContent }
            break
          case 'socialLinks':
            content.socialLinks = { ...content.socialLinks, ...parsedContent }
            break
          case 'quickLinks':
            if (parsedContent.links && parsedContent.links.length > 0) {
              content.quickLinks = { ...content.quickLinks, ...parsedContent }
            }
            break
          case 'legalLinks':
            if (parsedContent.links && parsedContent.links.length > 0) {
              content.legalLinks = { ...content.legalLinks, ...parsedContent }
            }
            break
          case 'newsletter':
            content.newsletter = { ...content.newsletter, ...parsedContent }
            break
        }
      } catch (error) {
        console.error('Error parsing content:', error)
      }
    })
  } catch (error) {
    console.error('Failed to fetch footer content:', error)
  }

  // Ensure default legal links exist if missing
  if (!content.legalLinks.links || content.legalLinks.links.length === 0) {
    content.legalLinks.links = [
      { label: 'Privacy Policy', url: '/privacy-policy' },
      { label: 'Terms & Conditions', url: '/terms-and-conditions' },
      { label: 'Refund Policy', url: '/refund-policy' }
    ]
  }

  // Ensure default quick links exist if missing
  if (!content.quickLinks.links || content.quickLinks.links.length === 0) {
    content.quickLinks.links = [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '#why-us' },
      { label: 'Services', url: '#process' },
      { label: 'Contact', url: '#contact' }
    ]
  }

  return (
    <footer className="bg-[#f0f0f0] pt-16 text-sm text-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <Image src="/assets/xigenis-logo.png" alt="Logo" width={50} height={50} />
              </div>
            </div>

            <p className="mb-6 max-w-sm text-xs text-gray-500">
              {content.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">
              {content.quickLinks.title ? content.quickLinks.title.toUpperCase() : 'QUICK LINKS'}
            </h4>
            <ul className="space-y-3 text-xs">
              {content.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="text-gray-600 transition-colors hover:text-black">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">
              {content.legalLinks.title ? content.legalLinks.title.toUpperCase() : 'LEGAL'}
            </h4>
            <ul className="space-y-3 text-xs">
              {content.legalLinks.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="text-gray-600 transition-colors hover:text-black">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">CONTACT US</h4>
            <div className="space-y-4">
              {content.companyInfo.phone && (
                <a href={`tel:${content.companyInfo.phone}`} className="flex items-center gap-2 text-xs text-gray-800 hover:text-black">
                  <Phone className="h-3 w-3" />
                  {content.companyInfo.phone}
                </a>
              )}
              {content.companyInfo.email && (
                <a
                  href={`mailto:${content.companyInfo.email}`}
                  className="flex items-center gap-2 text-xs text-gray-800 hover:text-black"
                >
                  <Mail className="h-3 w-3" />
                  {content.companyInfo.email}
                </a>
              )}
              {content.companyInfo.address && (
                <p className="flex items-center gap-2 text-xs text-gray-800">
                  <Mail className="h-3 w-3" />
                  {content.companyInfo.address}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {content.socialLinks.instagram && (
                <a
                  href={content.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
                >
                  <Image src="/assets/instagram.svg" alt="Instagram" width={32} height={32} />
                </a>
              )}
              {content.socialLinks.facebook && (
                <a
                  href={content.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
                >
                  <Image src="/assets/facebook.svg" alt="Facebook" width={32} height={32} />
                </a>
              )}
              {content.socialLinks.linkedin && (
                <a
                  href={content.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
                >
                  <Image src="/assets/linkedin.svg" alt="Linkedin" width={32} height={32} />
                </a>
              )}
              {content.socialLinks.twitter && (
                <a
                  href={content.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
                >
                  <Twitter className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="mt-4 max-w-3xl text-[10px] leading-relaxed text-gray-400">
              This site is not part of the Facebook or Instagram website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook or Instagram in any way. Facebook is a trademark of FACEBOOK, Inc.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-300 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Xigenis. All rights reserved.</p>
          <div className="flex gap-4">
            {content.legalLinks.links.map((link, index) => (
              <span key={index}>
                {index > 0 && <span className="mr-4 text-gray-300">|</span>}
                <Link href={link.url} className="transition-colors hover:text-black">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
