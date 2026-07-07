"use client"

import { useState, useEffect } from "react"
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

export default function Footer() {
  const [content, setContent] = useState<FooterContent>({
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
      links: []
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
  })

  useEffect(() => {
    fetchFooterContent()
  }, [])

  const fetchFooterContent = async () => {
    try {
      const response = await fetch('/api/footer')
      if (response.ok) {
        const data = await response.json()
        // Check if data is a valid object and not an error response
        if (data && typeof data === 'object' && !('error' in data)) {
          setContent(prev => ({ ...prev, ...data }))
        }
      }
    } catch (error) {
      console.error('Failed to fetch footer content:', error)
    }
  }
  return (
    <footer className="bg-[#f0f0f0] pt-16 text-sm text-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-8">
          {/* Column 1: Logo & Subscribe */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <Image src="/assets/xigenis-logo.png" alt="Logo" width={50} height={50} />
              </div>
            </div>

            <p className="mb-6 max-w-sm text-xs leading-relaxed tracking-widest text-gray-500 uppercase">
              {content.description}
            </p>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-1">
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-300 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 text-xs text-gray-500">
          <p>
            {content.legalLinks.links.map((link, index) => (
              <span key={index}>
                {index > 0 && " | "}
                <Link href={link.url} className="transition-colors hover:text-black">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
