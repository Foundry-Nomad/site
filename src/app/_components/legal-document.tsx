import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  summary: string;
  effectiveDate: string;
  sections: LegalSection[];
};

export function LegalDocument({
  eyebrow,
  title,
  summary,
  effectiveDate,
  sections,
}: LegalDocumentProps) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-brand" aria-label="Foundry Nomad home">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            unoptimized
          />
          <span>FOUNDRY NOMAD</span>
        </Link>
        <Link href="/" className="legal-home-link">
          Back to home <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <article className="legal-document">
        <div className="legal-intro">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-summary">{summary}</p>
          <p className="legal-date">Effective date · {effectiveDate}</p>
        </div>

        <div className="legal-sections">
          {sections.map((section, index) => (
            <section key={section.title}>
              <p className="legal-section-number">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </article>

      <footer className="legal-footer">
        <span>© {new Date().getFullYear()} Foundry Nomad</span>
        <nav aria-label="Legal documents">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </footer>
    </main>
  );
}
