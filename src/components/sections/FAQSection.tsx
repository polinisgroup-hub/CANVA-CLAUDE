import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Accordion, type AccordionItemData } from '../ui/Accordion'
import { faqs } from '../../config/content'

export function FAQSection() {
  const items: AccordionItemData[] = faqs.map((f) => ({
    title: f.q,
    content: f.a,
  }))

  return (
    <Section id="faq" tone="white" spacing="xl">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            index="18"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas."
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="mt-10">
            <Accordion items={items} />
          </div>
        </div>
      </div>
    </Section>
  )
}
