import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    id: "1",
    question: "What does a brand marketing agency do?",
    answer:
      "A brand marketing agency establishes and maintains a relationship between your brand and your consumers. Rather than promoting individual aspects of your brand, a brand marketing agency promotes the entirety of your brand, from its products and services to its brand identities, values, and promises to your various points of contact. In essence, brand marketing agencies generate brand value in a way that builds company value.",
  },
  {
    id: "2",
    question: "What is a brand strategy?",
    answer:
      "A brand strategy is a long-term plan that outlines how your brand will be perceived by your target audience. It includes your brand positioning, messaging, visual identity, and the experiences you create for your customers. A strong brand strategy aligns your business goals with customer needs and differentiates you from competitors.",
  },
  {
    id: "3",
    question: "What is brand identity?",
    answer:
      "Brand identity is the collection of visual and verbal elements that represent your brand. This includes your logo, color palette, typography, imagery, tone of voice, and messaging. It's how your brand looks, sounds, and feels across all touchpoints. A strong brand identity creates recognition and builds trust with your audience.",
  },
  {
    id: "4",
    question: "What do branding services include?",
    answer:
      "Branding services typically include brand strategy development, brand identity design (logo, colors, typography), messaging and positioning, brand guidelines, marketing collateral design, website design, social media presence, and ongoing brand management. These services work together to create a cohesive and memorable brand experience.",
  },
]

export default function FAQ() {
  return (
    <section className="bg-background px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <h2 className="text-foreground text-center text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-muted/30 rounded-lg border-none px-6">
              <AccordionTrigger className="text-foreground py-6 text-lg font-medium hover:no-underline md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
