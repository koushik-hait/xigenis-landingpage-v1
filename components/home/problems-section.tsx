"use client"

import { motion } from "framer-motion"
import { AlertTriangle, PhoneOff, TrendingDown, UserX } from "lucide-react"
import Image from "next/image"
import { XCircle } from "lucide-react"

const problems = [
  {
    number: "01",
    title: "Lead Quality",
    headline: "Spending Lakhs on Portals & Getting Fake Numbers",
    description:
      "MagicBricks, 99acres, Housing.com — 80–90% of those leads are cold or uncontactable. You're not getting leads. You're buying noise.",
    points: [
      "100 leads. 4 site visits. Zero predictability.",
      "Every month feels like starting from scratch.",
      "AI Algo-Plex delivers pre-qualified buyer intent only.",
    ],
    stat: "72%",
    statLabel: "of Indian agents say unqualified inquiries is their #1 problem.",
    icon: AlertTriangle,
    color: "from-red-500 to-orange-500",
  },
  {
    number: "02",
    title: "Follow-up Failure",
    headline: "60% of Your Leads Go Cold Because No One Followed Up",
    description:
      "Excel sheets and manual calls don't scale. Most agents lose their best leads in 48 hours — simply too busy to call back in time.",
    points: [
      "Serious buyers lose interest fast. Speed wins deals.",
      "Manual follow-up burns 20–30 hrs every single week.",
      "Our system auto-responds in under 5 minutes. Always.",
    ],
    stat: "60%",
    statLabel: "of leads are never followed up after Day 2.",
    icon: PhoneOff,
    color: "from-amber-500 to-yellow-500",
  },
  {
    number: "03",
    title: "Ad Spend Waste",
    headline: "Burning ₹30K–₹1L Monthly on Ads That Convert Nothing",
    description:
      "Running ads yourself or with a cheap freelancer? Poor targeting and zero funnel follow-up kill your ROI before a single visit happens.",
    points: [
      "Wrong audience targeting means paying to reach non-buyers.",
      "No nurture funnel means leads evaporate after the first click.",
      "AI Algo-Plex runs a complete paid acquisition system end-to-end.",
    ],
    stat: "83%",
    statLabel: "of Meta real estate campaigns fail due to poor targeting.",
    icon: TrendingDown,
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "04",
    title: "No Referral System",
    headline: "Closing Deals But Starting From Zero Every Month",
    description:
      "After closing, most agents disappear. No CRM, no structured referral process means every month is a fresh hunt — with no compounding momentum.",
    points: [
      "Happy clients forget you exist without a system to stay top-of-mind.",
      "Zero referral pipeline means 100% dependence on paid ads forever.",
      "AI Algo-Plex automates referral nurture so every deal spawns the next.",
    ],
    stat: "3x",
    statLabel: "Agents with automated referral systems close 3× more deals.",
    icon: UserX,
    color: "from-blue-500 to-cyan-500",
  },
]

export function ProblemsSection() {
  return (
    <section
      id="problems"
      className="relative overflow-hidden border-b border-gray-100 bg-[#FAFAFA] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-5 inline-block rounded-full bg-[#FFF0E6] px-3.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-[#FF5A1F] uppercase">
            The Real Problem
          </span>
          <h2 className="mb-5 font-serif text-[32px] leading-[1.1] font-normal tracking-[-0.02em] text-[#111] sm:text-[40px] md:text-[46px]">
            You're not failing. Your pipeline has a leak.
          </h2>
          <p className="mx-auto max-w-[460px] text-[15px] leading-[1.6] font-normal text-[#666] sm:text-[16px]">
            Agents closing 4–5 deals every 90 days aren't smarter. They <br className="hidden sm:block" /> just fixed
            these 3 things.
          </p>
        </motion.div>

        {/* lead problem  */}
        <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-gradient-to-r from-white to-orange-50 pt-20 pb-16">
          {/* Background Image (Optional: Replace with your actual background property image) */}
          <div className="absolute inset-0 z-0 opacity-20">
            {/* Placeholder for the blurred house background */}
            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center blur-sm" />
          </div>

          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">
              {/* Left Column: Text Content */}
              <div className="w-full space-y-8 lg:w-1/2">
                <div className="inline-block rounded-full bg-gray-800 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                  Sound Familiar?
                </div>

                <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Your Lead Problem Is <br className="hidden sm:block" /> Not What You Think
                </h1>

                <ul className="space-y-5">
                  {[
                    "Do you spend ₹30K to ₹1L on ads and still get 80% fake numbers?",
                    "Are you chasing 100 leads a month but can't get 4 site visits a week?",
                    "Have you tried portals, freelancers, and cold calls and NOTHING worked consistently?",
                  ].map((text, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                      <span className="text-lg leading-snug font-medium text-gray-700">{text}</span>
                    </li>
                  ))}
                </ul>

                <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                  You're not bad at sales. You're using a broken system in a market that rewards speed, follow-up, and
                  qualified traffic — not volume.
                </p>
              </div>

              {/* Right Column: Image and Floating Cards */}
              <div className="relative mt-12 flex min-h-[600px] w-full items-end justify-center lg:mt-0 lg:min-h-[700px] lg:w-1/2">
                {/* Main Subject Image */}
                {/* Replace src with your actual cut-out image of the person */}
                <div className="relative z-10 h-[500px] w-[300px] sm:h-[600px] sm:w-[400px] lg:w-[450px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                    alt="Smiling Professional"
                    fill
                    className="rounded-t-full object-cover object-top shadow-2xl"
                    // Note: The original image has a transparent background cut-out.
                    // For best results, use a PNG with a transparent background.
                  />
                </div>

                {/* Floating Cards Container */}
                <div className="pointer-events-none absolute inset-0 z-20">
                  {/* Orange Card (Left Middle) */}
                  <div className="pointer-events-auto absolute top-[30%] -left-4 max-w-[220px] transform rounded-3xl bg-[#F97316] p-6 text-white shadow-xl transition hover:scale-105 sm:left-0 lg:top-[40%] lg:-left-12">
                    <h3 className="mb-2 font-serif text-4xl">900%</h3>
                    <p className="text-sm leading-tight font-medium opacity-90">
                      Higher conversion when you respond within 5 minutes
                    </p>
                  </div>

                  {/* Black Card (Right Middle) */}
                  <div className="pointer-events-auto absolute top-[20%] -right-4 max-w-[200px] transform rounded-3xl bg-black p-6 text-white shadow-xl transition hover:scale-105 sm:right-0 lg:top-[30%] lg:-right-8">
                    <h3 className="mb-2 font-serif text-4xl">72%</h3>
                    <p className="text-xs leading-tight font-medium opacity-80">
                      Agents say unqualified leads are their #1 problem
                    </p>
                  </div>

                  {/* White Card 1 (Bottom Left) */}
                  <div className="pointer-events-auto absolute bottom-12 left-0 max-w-[180px] transform rounded-3xl border border-gray-100 bg-white p-5 text-center text-gray-900 shadow-lg transition hover:scale-105 sm:left-8 lg:bottom-24 lg:left-0">
                    <h3 className="mb-2 font-serif text-3xl text-[#D97706]">3-5%</h3>
                    <p className="text-[11px] leading-tight font-semibold tracking-wide text-gray-500 uppercase">
                      Average lead-to-site-visit conversion in India
                    </p>
                  </div>

                  {/* White Card 2 (Bottom Right) */}
                  <div className="pointer-events-auto absolute -right-4 bottom-4 max-w-[180px] transform rounded-3xl border border-gray-100 bg-white p-5 text-center text-gray-900 shadow-lg transition hover:scale-105 sm:right-8 lg:-right-4 lg:bottom-12">
                    <h3 className="mb-2 font-serif text-3xl text-[#D97706]">60%</h3>
                    <p className="text-[11px] leading-tight font-semibold tracking-wide text-gray-500 uppercase">
                      Of leads die because no one follows up after Day 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
