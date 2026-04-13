import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Xigenis",
  description: "Terms and conditions for using Xigenis services.",
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="relative z-10 flex min-h-[40vh] flex-col justify-end bg-zinc-950 pt-40 pb-16">
        <div className="relative z-10 container mx-auto max-w-4xl px-6">
          <h1 className="fade-in-up mb-6 font-serif text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
            Terms of Use
          </h1>
          <p className="fade-in-up text-lg text-zinc-400" data-delay="0.1">
            Last updated: April 13, 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="prose prose-lg prose-zinc fade-in-up max-w-none space-y-6 font-light text-zinc-700">
            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Agreement between User and Xigenis</h3>
            <p>
              Welcome to xigenis.com. The xigenis.com website (the "Site") is comprised of various web pages operated by
              Xigenis LLC. The Site is offered to you conditioned on your acceptance without modification of the terms,
              conditions, and notices contained herein (the "Terms"). Your use of xigenis.com constitutes your agreement
              to all such Terms. Please read these terms carefully, and keep a copy of them for your reference.
            </p>

            <p>xigenis.com is a Services list and information site and a digital marketing platform.</p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Privacy</h3>
            <p>
              Your use of xigenis.com is subject to Xigenis's Privacy Policy. Please review our Privacy Policy, which
              also governs the Site and informs users of our data collection practices.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Electronic Communications</h3>
            <p>
              Visiting xigenis.com or sending emails to Xigenis constitutes electronic communications. You consent to
              receive electronic communications and you agree that all agreements, notices, disclosures and other
              communications that we provide to you electronically, via email and on the Site, satisfy any legal
              requirement that such communications be in writing.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Children Under Thirteen</h3>
            <p>
              Xigenis does not knowingly collect, either online or offline, personal information from persons under the
              age of thirteen. If you are under 18, you may use xigenis.com only with permission of a parent or
              guardian.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">
              Links to Third Party Sites/Third Party Services
            </h3>
            <p>
              xigenis.com may contain links to other websites ("Linked Sites"). The Linked Sites are not under the
              control of Xigenis and Xigenis is not responsible for the contents of any Linked Site, including without
              limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Xigenis is
              providing these links to you only as a convenience, and the inclusion of any link does not imply
              endorsement by Xigenis of the site or any association with its operators.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">
              No Unlawful or Prohibited Use/Intellectual Property
            </h3>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to access and use xigenis.com
              strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to
              Xigenis that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You
              may not use the Site in any manner which could damage, disable, overburden, or impair the Site or
              interfere with any other party's use and enjoyment of the Site.
            </p>

            <p>
              All content included as part of the Service, such as text, graphics, logos, images, as well as the
              compilation thereof, and any software used on the Site, is the property of Xigenis or its suppliers and
              protected by copyright and other laws that protect intellectual property and proprietary rights. You agree
              to observe and abide by all copyright and other proprietary notices, legends or other restrictions
              contained in any such content and will not make any changes thereto.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Indemnification</h3>
            <p>
              You agree to indemnify, defend and hold harmless Xigenis, its officers, directors, employees, agents and
              third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees)
              relating to or arising out of your use of or inability to use the Site or services, any user postings made
              by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or
              your violation of any applicable laws, rules or regulations.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Changes to Terms</h3>
            <p>
              Xigenis reserves the right, in its sole discretion, to change the Terms under which xigenis.com is
              offered. The most current version of the Terms will supersede all previous versions. Xigenis encourages
              you to periodically review the Terms to stay informed of our updates.
            </p>

            <h3 className="mt-10 mb-4 font-serif text-2xl text-zinc-900">Contact Us</h3>
            <p>Xigenis welcomes your questions or comments regarding the Terms:</p>
            <p>Email Address: hello@xigenis.com</p>
          </div>
        </div>
      </section>
    </>
  )
}
