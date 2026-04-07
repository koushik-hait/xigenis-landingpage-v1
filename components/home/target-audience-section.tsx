"use client"

import { motion } from "framer-motion"

export function TargetAudienceSection() {
  const notForYou = [
    <>
      You are <span className="font-bold">just starting in real estate</span>
    </>,
    <>
      You are looking for <span className="font-bold">cheap or random leads</span>
    </>,
    <>
      You don&apos;t have a <span className="font-bold">structured sales closing process</span>
    </>,
    <>
      You only work with <span className="font-bold">low-budget property deals</span>
    </>,
  ]

  const forYou = [
    <>
      Your annual revenue is <span className="font-bold">₹50L+</span>
    </>,
    <>
      You sell <span className="font-bold">₹1Cr+ ticket size properties</span>
    </>,
    <>
      You are ready to <span className="font-bold">invest ₹1-3L in client acquisition</span>
    </>,
    <>
      You can handle <span className="font-bold">8-12 qualified buyer leads per month</span>
    </>,
  ]

  return (
    <section className="relative overflow-hidden bg-[#F2F2F2] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-[1.2] tracking-wide text-gray-900 uppercase sm:text-4xl lg:text-5xl">
            For Real Estate Leaders Who Want
            <br className="hidden sm:block" />
            <span className="mt-2 block">Predictable Deals</span>
          </h2>
        </motion.div>

        {/* Content Area */}
        <div className="relative mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-8">
          {/* Middle Graphic for Mobile (Hidden on Desktop) */}
          <div className="relative mb-8 flex h-[350px] w-full items-end justify-center lg:hidden">
            <img
              src="/assets/eligibility-bg.png"
              alt="Eligibility Background"
              // style={{ zIndex: 10 }}
              className="absolute inset-0 z-10 h-full w-full object-contain object-bottom opacity-80"
            />
            <img
              src="/assets/eligibility-cutout.png"
              alt="Eligibility"
              // style={{ zIndex: 0 }}
              className="relative z-0 h-[320px] w-auto max-w-full object-contain object-bottom drop-shadow-2xl"
            />
          </div>

          {/* Left Column (Not For You) */}
          <div className="z-20 flex w-full flex-col items-center space-y-6 sm:space-y-8 lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mr-0 mb-4 rounded-full bg-[#D3D3D3] px-6 py-2.5 text-center text-xs font-bold tracking-widest text-black uppercase shadow-sm sm:text-sm lg:mr-10"
            >
              This is not for you if
            </motion.div>

            <div className="flex w-full max-w-xs flex-col items-center gap-4 sm:gap-6 lg:max-w-[340px] lg:items-end">
              {notForYou.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-full rounded-3xl border border-gray-100 bg-white px-6 py-4 text-gray-800 shadow-lg lg:rounded-3xl lg:py-5"
                  style={{ borderBottomRightRadius: "1.5rem", borderBottomLeftRadius: "1.5rem" }}
                >
                  <p className="text-center text-sm leading-relaxed lg:text-left lg:text-[15px]">{item}</p>
                  <div className="absolute top-1/2 -right-3 z-[-1] hidden h-0 w-0 -translate-y-1/2 border-t-[10px] border-b-[10px] border-l-[14px] border-t-transparent border-b-transparent border-l-white drop-shadow-md lg:block" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Middle Graphic for Desktop */}
          <div className="relative z-10 mx-auto hidden min-h-[600px] w-[400px] shrink-0 items-end justify-center lg:flex xl:w-[450px]">
            <img
              src="/assets/eligibility-bg.png"
              alt="Background"
              style={{ zIndex: 10 }}
              className="absolute inset-0 h-full w-full object-contain object-bottom opacity-80"
            />

            <img
              src="/assets/eligibility-cutout.png"
              alt="Real Estate Professionals"
              style={{ zIndex: 0 }}
              className="relative ml-4 max-h-[110%] w-[125%] max-w-none object-contain object-bottom drop-shadow-2xl"
            />
          </div>

          {/* Right Column (For You) */}
          <div className="z-20 flex w-full flex-col items-center space-y-6 sm:space-y-8 lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 ml-0 rounded-full bg-[#D3D3D3] px-6 py-2.5 text-center text-xs font-bold tracking-widest text-black uppercase shadow-sm sm:text-sm lg:ml-10"
            >
              This is for you if
            </motion.div>

            <div className="flex w-full max-w-xs flex-col items-center gap-4 sm:gap-6 lg:max-w-[340px] lg:items-start">
              {forYou.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-full rounded-3xl bg-black px-6 py-4 text-white shadow-xl lg:py-5"
                >
                  <p className="text-center text-sm leading-relaxed text-white/90 lg:text-left lg:text-[15px]">
                    {item}
                  </p>
                  {/* Speech bubble tail for desktop */}
                  <div className="absolute top-1/2 -left-3 z-[-1] hidden h-0 w-0 -translate-y-1/2 border-t-[10px] border-r-[14px] border-b-[10px] border-t-transparent border-r-black border-b-transparent drop-shadow-md lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
