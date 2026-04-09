import React from "react"
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react"

const ReferralSection = () => {
  return (
    <section className="flex min-h-screen w-full items-center overflow-hidden bg-[#F9FAFB] py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* Left Column: Text & CTA */}
          <div className="w-full space-y-6 lg:w-1/2">
            <div className="inline-block rounded-full bg-[#333] px-4 py-1 text-xs font-bold tracking-widest text-white uppercase">
              Problem 04 • No Referral System
            </div>

            <h2 className="font-serif text-4xl leading-tight text-gray-900 lg:text-5xl">
              Closing Deals But <br /> Starting From Zero Every Month
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              After closing, most agents disappear. No CRM, no structured referral process means every month is a fresh
              hunt — with no compounding momentum.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3">
                <XCircle className="mt-1 h-5 w-5 flex-shrink-0 fill-red-100 text-red-500" />
                <span className="font-medium text-gray-700">
                  Happy clients forget you exist without a system to stay top-of-mind.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="mt-1 h-5 w-5 flex-shrink-0 fill-red-100 text-red-500" />
                <span className="font-medium text-gray-700">
                  Zero referral pipeline means 100% dependence on paid ads forever.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 fill-emerald-100 text-emerald-500" />
                <span className="font-medium text-gray-700">
                  AI Algo-Plex automates referral nurture so every deal spawns the next.
                </span>
              </li>
            </ul>

            {/* 3x Stats Box */}
            <div className="mt-8 max-w-md rounded-2xl bg-[#CCCCCC] p-6">
              <h3 className="mb-2 font-serif text-4xl text-gray-900">3x</h3>
              <p className="text-sm leading-snug font-medium text-gray-800">
                Agents with automated referral systems close 3× more deals than those relying on portals alone.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4 pt-6">
              <button className="rounded-full bg-black px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-gray-800">
                Build My Own Pipeline
              </button>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component */}
          <div className="relative flex w-full justify-center py-12 lg:w-1/2">
            {/* Main White Card Base */}
            <div className="relative min-h-[450px] w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="bg-black px-8 py-5 text-white">
                <h3 className="text-center text-sm font-bold tracking-widest uppercase">Monthly Revenue Source</h3>
              </div>

              <div className="flex flex-col items-center space-y-6 p-8">
                {/* 0 Referrals Red Box */}
                <div className="w-full max-w-[240px] rounded-xl bg-[#EF4444] p-4 text-center text-white shadow-lg shadow-red-100">
                  <span className="block text-4xl font-bold">0</span>
                  <span className="text-xs font-bold tracking-wide uppercase">Referrals this month</span>
                </div>

                {/* Staggered Floating Cards */}
                <div className="relative w-full space-y-4 pt-4">
                  {/* Card 1: Missing CRM */}
                  <div className="relative z-30 -ml-12 flex w-[110%] items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-8 w-8 fill-red-100 text-red-500" />
                      <p className="text-[13px] leading-tight font-bold text-gray-700">
                        No post-sale CRM or <br /> follow-up system
                      </p>
                    </div>
                    <span className="text-xs font-black text-red-500 uppercase">Missing</span>
                  </div>

                  {/* Card 2: Past Clients */}
                  <div className="relative z-20 ml-6 flex w-[100%] items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-8 w-8 fill-red-100 text-red-500" />
                      <p className="text-[13px] leading-tight font-bold text-gray-700">
                        Past clients never <br /> re-contacted
                      </p>
                    </div>
                    <span className="text-xs font-black text-red-500 uppercase">0 Leads</span>
                  </div>

                  {/* Card 3: Success Uplift */}
                  <div className="relative z-10 ml-20 flex w-[100%] items-center justify-between rounded-2xl border border-emerald-50 border-gray-100 bg-emerald-50/20 bg-white p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-8 w-8 fill-emerald-100 text-emerald-500" />
                      <p className="text-[13px] leading-tight font-bold text-gray-700">
                        With referral system <br /> avg. revenue uplift
                      </p>
                    </div>
                    <span className="text-sm font-black text-emerald-600">+30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ReferralSection }
