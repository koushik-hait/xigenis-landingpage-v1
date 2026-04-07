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
    <section id="problems" className="relative overflow-hidden bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-red-500/5 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-amber-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
            The Real Problem
          </span>
          <h2 className="font-heading mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            You're not failing. Your pipeline has a{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              leak.
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/50">
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
                className="group"
              >
                <div className="grid items-start gap-8 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] lg:grid-cols-12">
                  {/* Left - Problem Info */}
                  <div className="lg:col-span-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${problem.color}`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm font-medium tracking-wider text-white/40 uppercase">
                        Problem {problem.number} · {problem.title}
                      </span>
                    </div>

                    <h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">{problem.headline}</h3>
                    <p className="mb-6 text-base leading-relaxed text-white/50">{problem.description}</p>

                    {/* Points */}
                    <div className="space-y-3">
                      {problem.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${problem.color}`}
                          />
                          <span className="text-sm text-white/60">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right - Stat */}
                  <div className="flex items-center justify-center lg:col-span-5">
                    <div className="w-full rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
                      <div
                        className={`mb-3 bg-gradient-to-r ${problem.color} bg-clip-text text-6xl font-black text-transparent`}
                      >
                        {problem.stat}
                      </div>
                      <p className="text-sm leading-relaxed text-white/40">{problem.statLabel}</p>
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
