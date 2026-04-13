"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
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
              LOREM IPSUM DOLOR SIT AMET CONSECTETUR. FEUGIAT ULTRICIES IN FACILISI TEMPOR PHASELLUS VIVERRA VELIT.
            </p>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-black">CONTACT US</h4>
            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-center gap-2 text-xs text-gray-800 hover:text-black">
                <Phone className="h-3 w-3" />
                +91 99999 99999
              </a>
              <a
                href="mailto:INFO@XIGENIS.COM"
                className="flex items-center gap-2 text-xs text-gray-800 hover:text-black"
              >
                <Mail className="h-3 w-3" />
                INFO@XIGENIS.COM
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
              >
                <Image src="/assets/instagram.svg" alt="Instagram" width={32} height={32} />
              </a>
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
              >
                <Image src="/assets/facebook.svg" alt="Facebook" width={32} height={32} />
              </a>
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
              >
                <Image src="/assets/linkedin.svg" alt="Linkedin" width={32} height={32} />
              </a>
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7333] text-white transition-colors hover:bg-black"
              >
                <Image src="/assets/mail.png" alt="Mail" width={32} height={32} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-300 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 text-xs text-gray-500">
          <p>
            |{" "}
            <Link href="/privacy-policy" className="transition-colors hover:text-black">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms-and-conditions" className="transition-colors hover:text-black">
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link href="/refund-policy" className="transition-colors hover:text-black">
              Refund Policy
            </Link>{" "}
          </p>
        </div>
      </div>
    </footer>
  )
}
