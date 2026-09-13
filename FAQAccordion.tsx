import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/content";

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border">
          <AccordionTrigger className="py-6 text-left font-display text-lg hover:no-underline sm:text-xl [&[data-state=open]]:text-gold">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
