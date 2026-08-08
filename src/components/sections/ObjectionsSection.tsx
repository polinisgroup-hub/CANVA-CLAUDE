import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Accordion, type AccordionItemData } from '../ui/Accordion'
import { objections } from '../../config/content'

export function ObjectionsSection() {
  const items: AccordionItemData[] = objections.map((o) => ({
    title: o.claim,
    content: o.answer,
  }))

  return (
    <Section id="objeciones" tone="lavender" spacing="xl">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            index="17"
            eyebrow="Lo que quizás estás pensando"
            title="¿Y si esto no es para mí?"
            className="max-w-2xl"
          />
          <div className="mt-10">
            <Accordion items={items} defaultOpen={0} />
          </div>
        </div>
      </div>
    </Section>
  )
}
