"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] pt-16 text-sm text-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-8">
          {/* Column 1: Logo & Subscribe */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 20L20 4M4 4L20 20"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-medium tracking-wide text-black">XIGENIS</span>
            </div>

            <p className="mb-6 max-w-sm text-xs leading-relaxed text-gray-500 uppercase tracking-widest">
              LOREM IPSUM DOLOR SIT AMET CONSECTETUR. FEUGIAT ULTRICIES IN FACILISI TEMPOR PHASELLUS
              VIVERRA VELIT.
            </p>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-900 block">Subscribe Now</label>
              <div className="flex flex-col gap-3 sm:max-w-xs">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="pl-9 bg-white/50 border-gray-300"
                  />
                </div>
                <Button className="w-full sm:w-1/2 bg-[#ff7333] text-white hover:bg-[#ff7333]/90 rounded-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="lg:col-span-1 border-gray-300 pl-0 lg:pl-4">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">
              INFORMATION
            </h4>
            <ul className="space-y-3">
              {[
                "ABOUT US",
                "OUR PROCESS",
                "CASE STUDIES",
                "TESTIMONIALS",
                "BLOG",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                  <Link href="#" className="text-xs text-gray-600 hover:text-black">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Helpful Links */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">
              HELPFUL LINKS
            </h4>
            <ul className="space-y-3">
              {[
                "SERVICES",
                "SUPPORT",
                "TERMS & CONDITIONS",
                "PRIVACY POLICY",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                  <Link href="#" className="text-xs text-gray-600 hover:text-black">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Our Services */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">
              OUR SERVICES
            </h4>
            <ul className="space-y-3">
              {[
                "LEAD GENERATION CAMPAIGNS",
                "AI LEAD QUALIFICATION",
                "REAL ESTATE MARKETING STRATEGY",
                "CAMPAIGN OPTIMIZATION",
                "PROPERTY SALES FUNNELS",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400"></div>
                  <Link href="#" className="text-xs leading-relaxed text-gray-600 hover:text-black">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">
              CONTACT US
            </h4>
            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-center gap-2 text-xs text-gray-800 hover:text-black">
                <Phone className="h-3 w-3" />
                +91 99999 99999
              </a>
              <a href="mailto:INFO@XIGENIS.COM" className="flex items-center gap-2 text-xs text-gray-800 hover:text-black">
                <Mail className="h-3 w-3" />
                INFO@XIGENIS.COM
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white hover:bg-black transition-colors">
                <Facebook className="h-3 w-3" />
              </a>
              <a href="#" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white hover:bg-black transition-colors">
                <Linkedin className="h-3 w-3" />
              </a>
              <a href="#" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white hover:bg-black transition-colors">
                <Twitter className="h-3 w-3" fill="currentColor" />
              </a>
              <a href="#" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white hover:bg-black transition-colors">
                <Instagram className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-300 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 text-xs text-gray-500">
          <p>
            <Link href="#" className="hover:text-black transition-colors">FAQ</Link> |{" "}
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link> |{" "}
            <Link href="#" className="hover:text-black transition-colors">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
