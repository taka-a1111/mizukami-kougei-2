import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { interviews } from "@/lib/recruit";

export function generateStaticParams() {
  return interviews.map((person) => ({ id: person.id }));
}

export default function InterviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const person = interviews.find((p) => p.id === params.id);
  if (!person) notFound();

  return (
    <>
      <PageHero
        label="INTERVIEW"
        title="社員インタビュー"
        breadcrumb={[
          { label: "TOP", href: "/" },
          { label: "採用情報", href: "/recruit" },
          { label: person.name },
        ]}
      />

      <article className="py-24 bg-white">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <ScrollReveal className="max-w-3xl mx-auto">
            <div className="text-center mb-16 pb-12 border-b border-border-light">
              <p className="text-sm text-ink-mid mb-3 tracking-wider">
                {person.years}
              </p>
              <p className="text-base md:text-lg text-ink-mid mb-4">
                {person.subtitle}
              </p>
              <h1 className="text-2xl md:text-3xl font-serif leading-relaxed mb-6">
                {person.title}
              </h1>
              <p className="text-xl font-serif tracking-wider">{person.name}</p>
            </div>

            <div className="space-y-12">
              {person.sections.map((section, i) => {
                if (section.type === "photo") {
                  return (
                    <div
                      key={i}
                      className="aspect-[16/9] bg-border-gray flex items-center justify-center"
                    >
                      <span className="text-xs text-ink-mid">
                        {section.photoLabel}
                      </span>
                    </div>
                  );
                }
                if (section.type === "h2") {
                  return (
                    <div key={i} className="space-y-4">
                      <h2 className="text-xl md:text-2xl font-serif leading-relaxed border-l-4 border-ink pl-5 py-1">
                        {section.heading}
                      </h2>
                      {section.paragraphs?.map((p, j) => (
                        <p
                          key={j}
                          className="text-sm md:text-base text-ink-mid leading-loose"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  );
                }
                if (section.type === "intro") {
                  return (
                    <div key={i} className="space-y-4">
                      {section.paragraphs?.map((p, j) => (
                        <p
                          key={j}
                          className="text-sm md:text-base text-ink-mid leading-loose"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  );
                }
                if (section.type === "closing") {
                  return (
                    <div
                      key={i}
                      className="space-y-4 pt-12 mt-12 border-t border-border-light"
                    >
                      {section.paragraphs?.map((p, j) => (
                        <p
                          key={j}
                          className="text-sm md:text-base text-ink-mid leading-loose"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* SNSシェア */}
            <div className="mt-16 pt-12 border-t border-border-light text-center">
              <p className="text-xs text-ink-mid mb-4 tracking-wider">SHARE</p>
              <div className="flex justify-center gap-3">
                {["X", "f", "L"].map((s) => (
                  <span
                    key={s}
                    className="w-10 h-10 rounded-full bg-border-gray flex items-center justify-center text-sm text-ink-mid"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* 一覧へ戻る */}
            <div className="text-center mt-12">
              <Link
                href="/recruit#interview"
                className="inline-block border border-ink px-10 py-3 text-sm tracking-wider hover:bg-ink hover:text-white transition-colors"
              >
                ← 採用ページへ戻る
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
