"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TargetAudienceSectionProps {
  cmsContent?: any
}

export function TargetAudienceSection({ cmsContent }: TargetAudienceSectionProps) {
  const content = {
    headingLine1: "For Real Estate Leaders Who Want",
    headingLine2: "Predictable Deals",
    notForYouLabel: "This is not for you if",
    forYouLabel: "This is for you if",
    notForYouPoints: [
      "You are **just starting in real estate**",
      "You are looking for **cheap or random leads**",
      "You don't have a **structured sales closing process**",
      "You only work with **low-budget property deals**"
    ],
    forYouPoints: [
      "Your annual revenue is **₹50L+**",
      "You sell **₹1Cr+ ticket size properties**",
      "You are ready to **invest ₹1-3L in client acquisition**",
      "You can handle **8-12 qualified buyer leads per month**"
    ],
    bgImage: "/assets/eligibility-bg.png",
    modelImage: "/assets/eligibility-cutout.png",
    headingSize: "48",
    ...cmsContent
  }

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i} className="font-bold">{part.slice(2, -2)}</span>
      }
      return part
    })
  }

  const notForYou: React.ReactNode[] = content.notForYouPoints.map((p: string) => renderText(p))
  const forYou: React.ReactNode[] = content.forYouPoints.map((p: string) => renderText(p))

  return (
    <section className="relative overflow-hidden bg-[#F2F2F2] py-10 sm:py-10">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-[1.2] tracking-wide text-gray-900 uppercase sm:text-4xl lg:text-5xl" style={{ fontSize: `${content.headingSize}px` }}>
            {content.headingLine1}
            <br className="hidden sm:block" />
            <span className="mt-2 block">{content.headingLine2}</span>
          </h2>
        </motion.div>

        <div className="lg:hidden">
          {/* Middle Graphic for Mobile */}
          <div className="relative mb-8 flex h-[350px] w-full items-end justify-center">
            <Image
              src={content.bgImage}
              alt="Eligibility Background"
              style={{ zIndex: 10 }}
              className="absolute inset-0 h-full w-full object-contain object-bottom opacity-80"
              width={500}
              height={500}
            />
            <Image
              src={content.modelImage}
              alt="Eligibility"
              style={{ zIndex: 0 }}
              className="relative h-[320px] w-auto max-w-full object-contain object-bottom drop-shadow-2xl"
              width={500}
              height={500}
            />
          </div>

          {/* Left Column (Not For You) - Mobile */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 rounded-full bg-[#D3D3D3] px-6 py-2.5 text-center text-xs font-bold tracking-widest text-black uppercase shadow-sm"
            >
              {content.notForYouLabel}
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              {notForYou.map((item: React.ReactNode, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ margin: `${i === 1 ? '30' : '0'} auto` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full max-w-xs rounded-3xl border border-gray-100 bg-white px-6 py-4 text-gray-800 shadow-lg"
                >
                  <p className="text-center text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column (For You) - Mobile */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 rounded-full bg-[#D3D3D3] px-6 py-2.5 text-center text-xs font-bold tracking-widest text-black uppercase shadow-sm"
            >
              {content.forYouLabel}
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              {forYou.map((item: React.ReactNode, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full max-w-xs rounded-3xl bg-black px-6 py-4 text-white shadow-xl"
                >
                  <p className="text-center text-sm leading-relaxed text-white/90">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Three Columns Same Row */}
        <div className="relative mt-12 hidden grid-cols-[1fr_400px_1fr] items-stretch gap-8 lg:grid xl:grid-cols-[1fr_450px_1fr]">
          {/* Left Column (Not For You) */}
          <div className="z-20 flex flex-col items-end justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mr-10 mb-4 rounded-full bg-[#D3D3D3] px-6 py-2.5 text-center text-xs font-bold tracking-widest text-black uppercase shadow-sm"
            >
              {content.notForYouLabel}
            </motion.div>

            <div className="flex w-full max-w-[340px] flex-col items-end gap-4">
              {notForYou.map((item: React.ReactNode, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-full rounded-3xl border border-gray-100 bg-white px-6 py-5 text-gray-800 shadow-lg"
                  style={{ borderBottomRightRadius: "1.5rem", borderBottomLeftRadius: "1.5rem" }}
                >
                  <p className="text-left text-[15px] leading-relaxed">{item}</p>
                  <div className="absolute top-1/2 -right-3 z-[-1] h-0 w-0 -translate-y-1/2 border-t-[10px] border-b-[10px] border-l-[14px] border-t-transparent border-b-transparent border-l-white drop-shadow-md" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Middle Graphic */}
          <div className="relative z-10 flex items-end justify-center">
            <Image
              src={content.bgImage}
              alt="Background"
              style={{ zIndex: 10 }}
              className="absolute inset-0 h-full w-full object-contain object-bottom opacity-100"
              width={500}
              height={500}
            />

            <Image
              src={content.modelImage}
              alt="Real Estate Professionals"
              style={{ zIndex: 0 }}
              className="relative max-w-none object-contain object-bottom drop-shadow-2xl"
              width={500}
              height={500}
            />
          </div>

          {/* Right Column (For You) */}
          <div className="z-20 flex flex-col items-start justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="ml-10 mb-4 rounded-full bg-[#D3D3D3] px-6 py-2.5 text-center text-xs font-bold tracking-widest text-black uppercase shadow-sm"
            >
              {content.forYouLabel}
            </motion.div>

            <div className="flex w-full max-w-[340px] flex-col items-start gap-4">
              {forYou.map((item: React.ReactNode, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-full rounded-3xl bg-black px-6 py-5 text-white shadow-xl"
                >
                  <p className="text-left text-[15px] leading-relaxed text-white/90">
                    {item}
                  </p>
                  {/* Speech bubble tail for desktop */}
                  <div className="absolute top-1/2 -left-3 z-[-1] h-0 w-0 -translate-y-1/2 border-t-[10px] border-r-[14px] border-b-[10px] border-t-transparent border-r-black border-b-transparent drop-shadow-md" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
