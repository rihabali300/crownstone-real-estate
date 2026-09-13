import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";

export function legalHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        description="This page is a placeholder. Final wording should be reviewed and approved by Crownstone before publication."
      />
      <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <div className="space-y-12">
          {sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-display text-2xl">{section.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
