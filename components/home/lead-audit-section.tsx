"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Phone, PhoneOff, TrendingDown } from "lucide-react"

const auditData = [
  {
    label: "Total Leads This Month",
    sublabel: "112 inquiries received",
    value: "112",
    color: "text-gray-400",
    bgColor: "bg-gray-800",
    icon: Phone,
  },
  {
    label: "Actually Qualified Buyers",
    sublabel: "Only 9 leads showed real buying intent",
    value: "9",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    icon: TrendingDown,
  },
  {
    label: "Fake / Wrong Numbers",
    sublabel: "84 leads were invalid or unreachable",
    value: "84",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    icon: AlertTriangle,
  },
  {
    label: "No Response After 3 Calls",
    sublabel: "19 leads never answered follow-ups",
    value: "19",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    icon: PhoneOff,
  },
]

export function LeadAuditSection() {
  return (
    <section className="relative overflow-hidden bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-red-500/3 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left - Audit Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-white/50">Lead Quality Audit</span>
              </div>

              <div className="space-y-4">
                {auditData.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`flex items-center justify-between rounded-2xl ${item.bgColor} p-5`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className={`h-5 w-5 ${item.color}`} />
                        <div>
                          <div className="text-sm font-semibold text-white">{item.label}</div>
                          <div className="text-xs text-white/40">{item.sublabel}</div>
                        </div>
                      </div>
                      <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Site visit rate */}
              <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/50">Site Visit Rate</span>
                  <span className="text-sm font-bold text-red-400">4%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "4%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-red-500"
                  />
                </div>
                <p className="mt-2 text-xs text-white/30">4% of leads converted into site visits</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Campaign waste breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Where Your Ad Spend Actually Goes
                </h3>
                <p className="text-sm text-white/40">Typical ₹80K/month campaign breakdown</p>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Ad Spend / Month", value: "₹80K", color: "text-white" },
                  { label: "Leads Generated", value: "94", color: "text-blue-400" },
                  { label: "Site Visits Booked", value: "3–4", color: "text-amber-400" },
                  { label: "Deals Closed", value: "0–1", color: "text-red-400" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <span className="text-sm text-white/50">{item.label}</span>
                    <span className={`text-xl font-bold ${item.color}`}>{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
                <span className="text-xs font-medium text-red-400">
                  83% of Meta campaigns end here — zero ROI
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
