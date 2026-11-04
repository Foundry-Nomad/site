import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../_components/site-header";

export const metadata: Metadata = {
  title: "Forward Deployed Engineering | Foundry Nomad",
  description:
    "Foundry Nomad embeds forward deployed engineers with your team to turn complex operational problems into working software.",
};

const inquiryEmail = "inquiry@foundry-nomad.com";

export default function FdePage() {
  return (
    <main className="fde-page">
      <SiteHeader
        action={
          <a className="fde-nav-contact" href={`mailto:${inquiryEmail}`}>
            Email us
          </a>
        }
      />

      <section className="fde-hero" aria-labelledby="fde-heading">
        <div className="fde-hero-copy">
          <p className="fde-eyebrow">FORWARD DEPLOYED ENGINEERING</p>
          <h1 id="fde-heading">Build inside the problem.</h1>
          <p className="fde-hero-summary">
            Embedded engineers turn your hardest operational problems into software that works in the real world.
          </p>
          <a className="fde-primary-cta" href={`mailto:${inquiryEmail}`}>
            Email us
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <figure className="fde-hero-visual">
          <Image
            src="/fde-engineering.png"
            alt="A bronze path connecting plans, glass, and engineered components"
            fill
            priority
            unoptimized
            sizes="(max-width: 767px) 100vw, 54vw"
          />
        </figure>
      </section>

      <section className="fde-definition" aria-labelledby="definition-heading">
        <p className="fde-index">FDE, DEFINED</p>
        <div>
          <h2 id="definition-heading">Not an outside consultant. Not another ticket queue.</h2>
          <p>
            A Forward Deployed Engineer joins your team where strategy, operations, data, and software meet. They learn the constraints firsthand, then design, build, and deploy the right system with the people who will use it.
          </p>
        </div>
      </section>

      <section className="fde-value" aria-labelledby="value-heading">
        <div className="fde-value-intro">
          <h2 id="value-heading">From ambiguity to operating leverage.</h2>
          <p>FDE compresses the distance between identifying a critical problem and putting a durable solution to work.</p>
        </div>
        <div className="fde-value-grid">
          <article className="fde-value-featured">
            <span>01</span>
            <h3>Find the real constraint</h3>
            <p>Work alongside operators to uncover the problem behind the request, including the exceptions and dependencies that specifications miss.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Ship in your environment</h3>
            <p>Build against your data, workflows, security requirements, and existing systems from day one.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Leave capability behind</h3>
            <p>Deliver maintainable software, clear decisions, and stronger internal teams, not a dependency on consultants.</p>
          </article>
        </div>
      </section>

      <section className="fde-service" aria-labelledby="service-heading">
        <div className="fde-service-copy">
          <h2 id="service-heading">Our engineers go where the work is.</h2>
          <p>
            Foundry Nomad provides FDE engagements for consequential, cross-functional problems that cannot be solved from a distance.
          </p>
        </div>
        <div className="fde-service-list" aria-label="Our engagement model">
          <div><strong>Embed</strong><span>Join the team and map the operating reality.</span></div>
          <div><strong>Build</strong><span>Prototype quickly, integrate carefully, and deploy.</span></div>
          <div><strong>Transfer</strong><span>Document, train, and hand over with confidence.</span></div>
        </div>
      </section>

      <section className="fde-contact" aria-labelledby="contact-heading">
        <p>HAVE A HARD PROBLEM?</p>
        <h2 id="contact-heading">Put an engineer next to it.</h2>
        <a href={`mailto:${inquiryEmail}`}>{inquiryEmail}<span aria-hidden="true">↗</span></a>
      </section>

      <footer className="fde-footer">
        <span>© {new Date().getFullYear()} Foundry Nomad</span>
        <nav aria-label="Legal">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </footer>
    </main>
  );
}
