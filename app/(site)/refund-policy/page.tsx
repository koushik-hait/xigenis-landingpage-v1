import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Xigenis",
  description: "Refund and cancellation policy for Xigenis Consultancy Services.",
}

export default function RefundPolicyPage() {
  return (
    <>
      <section className="min-h-[40vh] bg-zinc-950 flex flex-col justify-end pb-16 pt-40 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tight fade-in-up">Refund & Cancellation Policy</h1>
          <p className="text-zinc-400 text-lg fade-in-up" data-delay="0.1">Services Only • Last updated: April 13, 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg prose-zinc max-w-none font-light fade-in-up space-y-6 text-zinc-700">
            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Advance Payment Clause</h3>
            <p>If any client makes an advance payment for our services and later decides not to proceed, they may request a refund within 3 days of payment. After 3 days, the advance payment becomes non-refundable.</p>
            <p>In exceptional situations, we may review the case and issue up to 5% of the advance amount, purely at our discretion.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Nature of Services</h3>
            <p>Xigenis Consultancy Services provides digital marketing, lead generation, automation, and consulting services. Due to the time, resources, strategy deployment, and execution involved, all services are considered partially or fully consumed once initiated.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">No Guaranteed Refunds (Effort-Based Model)</h3>
            <p>We do not offer unconditional refunds. However, we are committed to delivering results. If you are not satisfied:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>You must communicate your concerns with our team</li>
                <li>You must cooperate in implementation (ads approvals, CRM usage, follow-ups, etc.)</li>
                <li>You must provide necessary access and timely responses</li>
            </ul>
            <p>We will audit the campaign, optimize strategy, and work closely with you to improve outcomes.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Results Commitment Clause</h3>
            <p>If results are not achieved, we will continue working with you until performance improves. Refunds are not guaranteed, as outcomes depend on multiple external factors such as:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Market conditions</li>
                <li>Pricing of your property/project</li>
                <li>Sales process & closing ability</li>
                <li>Lead response time</li>
            </ul>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Monthly Retainer & Payment Terms</h3>
            <p>Our services operate on a monthly retainer model. Once a billing cycle starts, it is non-refundable. No partial refunds are provided for unused days within the billing cycle.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Cancellation Policy</h3>
            <p>Clients must inform us of cancellation at least 7 days before the next billing cycle. Failure to notify will result in the next cycle being billed.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Client Responsibility Clause</h3>
            <p>Refunds or performance disputes will not be considered if:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>The client delays approvals or communication</li>
                <li>The client fails to follow up with leads</li>
                <li>The client does not implement advised strategies</li>
                <li>The client provides incomplete or inaccurate information</li>
            </ul>
            <p>We act as a growth partner, but execution is a shared responsibility.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Ad Spend & Third-Party Costs</h3>
            <p>Any ad spend (Facebook, Google, etc.) is paid directly by the client. These costs are non-refundable under any circumstances. We are not responsible for platform-level issues or policy restrictions.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Exceptional Situations</h3>
            <p>In rare and genuine cases, we may review refund requests. Any refund (if approved) will be:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Partial only</li>
                <li>Based on work completed, time invested, and resources used</li>
                <li>Processed within 10 working days</li>
            </ul>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Dispute Resolution</h3>
            <p>We strongly encourage clients to contact us directly before raising disputes or chargebacks. We are committed to resolving issues in a fair and professional manner.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Agreement to Terms</h3>
            <p>By working with Xigenis Consultancy Services, you agree to this Refund & Cancellation Policy.</p>

            <h3 className="text-2xl font-serif text-zinc-900 mt-10 mb-4">Contact</h3>
            <p>For any concerns or support, visit <a href="https://xigenis.com" className="text-zinc-950 font-medium underline underline-offset-4">Xigenis.com</a> or contact our team.</p>
          </div>
        </div>
      </section>
    </>
  )
}
