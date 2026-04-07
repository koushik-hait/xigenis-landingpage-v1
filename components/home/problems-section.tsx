"use client"

import { motion } from "framer-motion"
import { AlertTriangle, PhoneOff, TrendingDown, UserX } from "lucide-react"

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
    <section id="problems" className="relative overflow-hidden bg-[#FAFAFA] px-4 py-24 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-20 text-center"
        >
          <span className="mb-6 inline-block rounded-full bg-[#FFEAE1] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#F36B2B]">
            The Real Problem
          </span>
          <h2 className="font-serif mb-6 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-[44px] leading-tight">
            You're not failing. Your pipeline has a leak.
          </h2>
          <p className="mx-auto max-w-[480px] text-[15px] leading-relaxed font-medium text-gray-600">
            Agents closing 4–5 deals every 90 days aren't smarter. They just fixed these 3 things.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="mt-16 space-y-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="grid items-start gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 lg:grid-cols-12">
                  {/* Left - Problem Info */}
                  <div className="lg:col-span-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${problem.color} shadow-sm`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                        Problem {problem.number} · {problem.title}
                      </span>
                    </div>

                    <h3 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl tracking-tight">{problem.headline}</h3>
                    <p className="mb-6 text-[15px] font-medium leading-relaxed text-gray-600">{problem.description}</p>

                    {/* Points */}
                    <div className="space-y-3">
                      {problem.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${problem.color}`}
                          />
                          <span className="text-[14px] font-medium text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right - Stat */}
                  <div className="flex h-full items-center justify-center lg:col-span-5">
                    <div className="w-full h-full flex flex-col justify-center rounded-2xl bg-[#F9F9F9] border border-gray-100 p-8 text-center transition-colors group-hover:bg-[#F2F2F2]">
                      <div
                        className={`mb-3 bg-gradient-to-br ${problem.color} bg-clip-text text-6xl font-black text-transparent drop-shadow-sm`}
                      >
                        {problem.stat}
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-gray-500">{problem.statLabel}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
