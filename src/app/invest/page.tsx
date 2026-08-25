import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkline, TrendChart } from "./charts";
import {
  availableShares,
  compositeAnnualized,
  compositeNav,
  compositeSleeves,
  featuredProduct,
  formatPercent,
  formatShares,
  formatSigned,
  otherProducts,
  products,
  sessionCount,
  totalComponents,
  totalShares,
  windowLabel,
  type Product,
} from "./lineup-data";

export const metadata: Metadata = {
  title: "Invest | Foundry Nomad",
  description:
    "Subscribable share classes built from Foundry Nomad quantitative trading strategies and funding instruments.",
};

const inquiryEmail = "inquiry@foundry-nomad.com";

function accessLink(product?: Product): string {
  const subject = product
    ? `Access request: ${product.name} (${product.code})`
    : "Access request: Foundry Nomad products";
  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(subject)}`;
}

/** Calendar labels for the plot axis, resolved when the site is built. */
function sessionLabel(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
}

function trendLabel(product: Product): string {
  return `${product.name} net asset value across the last ${sessionCount} sessions, ending ${formatSigned(
    product.monthReturn,
    2,
  )} against the start of the window.`;
}

function ProductCard({ product, order }: { product: Product; order: number }) {
  const direction = product.monthReturn >= 0 ? "up" : "down";

  return (
    <article className="qv-card" style={{ "--qv-order": order } as React.CSSProperties}>
      <header className="qv-card-head">
        <div>
          <h3>{product.name}</h3>
          <p className="qv-card-strategy">
            {product.strategy} <span aria-hidden="true">·</span> {product.components} components
          </p>
        </div>
        <div className="qv-card-meta">
          <p className="qv-card-code">{product.code}</p>
          <p className="qv-card-status" data-open={product.isOpen ? "true" : "false"}>
            {product.isOpen ? "Open" : "Fully subscribed"}
          </p>
        </div>
      </header>

      <div className="qv-card-metrics">
        <div className="qv-metric-lead">
          <span>{sessionCount}D annualized</span>
          <strong data-direction={direction}>{formatSigned(product.annualized)}</strong>
        </div>
        <div>
          <span>{sessionCount}D max drawdown</span>
          <strong>{formatSigned(product.maxDrawdown, 2)}</strong>
        </div>
        <div>
          <span>Vol target</span>
          <strong>{formatPercent(product.volTarget, 0)}</strong>
        </div>
      </div>

      <Sparkline
        series={product.nav}
        direction={direction}
        label={trendLabel(product)}
        order={order}
      />

      <div className="qv-card-shares">
        <div>
          <span>Total shares</span>
          <strong>{formatShares(product.totalShares)}</strong>
        </div>
        <div>
          <span>Available to subscribe</span>
          <strong data-empty={product.availableShares === 0 ? "true" : undefined}>
            {formatShares(product.availableShares)}
          </strong>
        </div>
      </div>

      <div className="qv-meter" aria-hidden="true">
        <span style={{ width: `${(product.subscribed * 100).toFixed(1)}%` }} />
      </div>

      <footer className="qv-card-foot">
        <p className="qv-meter-note">{formatPercent(product.subscribed)} subscribed</p>
        {product.isOpen ? (
          <a className="qv-card-cta" href={accessLink(product)}>
            Request access<span aria-hidden="true">↗</span>
          </a>
        ) : (
          <a className="qv-card-cta" data-state="waitlist" href={accessLink(product)}>
            Join waitlist<span aria-hidden="true">↗</span>
          </a>
        )}
      </footer>
    </article>
  );
}

export default function InvestPage() {
  const featuredDirection = featuredProduct.monthReturn >= 0 ? "up" : "down";
  const compositeDirection = compositeAnnualized >= 0 ? "up" : "down";
  const asOf = windowLabel();

  return (
    <main className="qv-page">
      <header className="qv-nav">
        <Link className="qv-brand" href="/" aria-label="Foundry Nomad home">
          <Image src="/logo.png" alt="" width={42} height={42} priority unoptimized />
          <span>FOUNDRY NOMAD</span>
        </Link>
        <a className="qv-nav-cta" href={accessLink()}>
          Request access
        </a>
      </header>

      <section className="qv-hero" aria-labelledby="qv-hero-heading">
        <div className="qv-hero-copy">
          <p className="qv-eyebrow">QUANTITATIVE PRODUCT DESK</p>
          <h1 id="qv-hero-heading">Quant strategies, by the share.</h1>
          <p className="qv-hero-summary">
            Each product bundles live trading strategies and funding instruments into one
            subscribable share class.
          </p>
          <div className="qv-hero-actions">
            <a className="qv-cta" href={accessLink()}>
              Request access<span aria-hidden="true">↗</span>
            </a>
            <a className="qv-cta-ghost" href="#lineup">
              See the lineup
            </a>
          </div>
        </div>

        <figure className="qv-panel">
          <figcaption className="qv-panel-head">
            <div>
              <span>Composite index</span>
              <strong>{compositeNav[compositeNav.length - 1].toFixed(4)}</strong>
            </div>
            <div className="qv-panel-figure">
              <span>{sessionCount}D annualized</span>
              <strong data-direction={compositeDirection}>
                {formatSigned(compositeAnnualized)}
              </strong>
            </div>
          </figcaption>

          <TrendChart
            series={compositeNav}
            label={`Foundry Nomad composite index across the last ${sessionCount} sessions, share weighted across ${products.length} products.`}
            xLabels={[sessionLabel(30), sessionLabel(20), sessionLabel(10), sessionLabel(0)]}
          />

          <p className="qv-panel-foot">
            Share weighted across {products.length} products, rebased to 1.0000 at the start of
            the window.
          </p>
        </figure>
      </section>

      <section className="qv-rail" aria-label="Lineup at a glance">
        <div>
          <span>Products live</span>
          <strong>{products.length}</strong>
        </div>
        <div>
          <span>Strategies inside them</span>
          <strong>{totalComponents}</strong>
        </div>
        <div>
          <span>Shares issued</span>
          <strong>{formatShares(totalShares)}</strong>
        </div>
        <div>
          <span>Shares available now</span>
          <strong>{formatShares(availableShares)}</strong>
        </div>
      </section>

      <section className="qv-lineup" id="lineup" aria-labelledby="qv-lineup-heading">
        <div className="qv-lineup-head">
          <h2 id="qv-lineup-heading">The lineup.</h2>
          <p>
            Five sleeves, each taking risk a different way. Figures cover the {sessionCount}{" "}
            sessions to {asOf}.
          </p>
        </div>

        <div className="qv-grid">
          <article className="qv-card qv-card-featured" style={{ "--qv-order": 0 } as React.CSSProperties}>
            <div className="qv-featured-copy">
              <header className="qv-card-head">
                <div>
                  <h3>{featuredProduct.name}</h3>
                  <p className="qv-card-strategy">
                    {featuredProduct.strategy} <span aria-hidden="true">·</span>{" "}
                    {featuredProduct.components} components
                  </p>
                </div>
                <div className="qv-card-meta">
                  <p className="qv-card-code">{featuredProduct.code}</p>
                  <p className="qv-card-status" data-open="true">
                    Open
                  </p>
                </div>
              </header>

              <div className="qv-card-metrics">
                <div className="qv-metric-lead">
                  <span>{sessionCount}D annualized</span>
                  <strong data-direction={featuredDirection}>
                    {formatSigned(featuredProduct.annualized)}
                  </strong>
                </div>
                <div>
                  <span>{sessionCount}D max drawdown</span>
                  <strong>{formatSigned(featuredProduct.maxDrawdown, 2)}</strong>
                </div>
                <div>
                  <span>Vol target</span>
                  <strong>{formatPercent(featuredProduct.volTarget, 0)}</strong>
                </div>
              </div>

              <div className="qv-card-shares">
                <div>
                  <span>Total shares</span>
                  <strong>{formatShares(featuredProduct.totalShares)}</strong>
                </div>
                <div>
                  <span>Available to subscribe</span>
                  <strong>{formatShares(featuredProduct.availableShares)}</strong>
                </div>
              </div>

              <div className="qv-meter" aria-hidden="true">
                <span style={{ width: `${(featuredProduct.subscribed * 100).toFixed(1)}%` }} />
              </div>

              <footer className="qv-card-foot">
                <p className="qv-meter-note">
                  {formatPercent(featuredProduct.subscribed)} subscribed
                </p>
                <a className="qv-card-cta" href={accessLink(featuredProduct)}>
                  Request access<span aria-hidden="true">↗</span>
                </a>
              </footer>
            </div>

            <div className="qv-featured-chart">
              <Sparkline
                series={featuredProduct.nav}
                direction={featuredDirection}
                label={trendLabel(featuredProduct)}
                order={0}
              />
            </div>

          </article>

          {otherProducts.map((product, index) => (
            <ProductCard key={product.code} product={product} order={index + 1} />
          ))}
        </div>
      </section>

      <section className="qv-build" aria-labelledby="qv-build-heading">
        <div className="qv-build-copy">
          <p className="qv-eyebrow">HOW A PRODUCT IS BUILT</p>
          <h2 id="qv-build-heading">A product is a portfolio of strategies.</h2>
          <p>
            Signals are researched separately, sized against a volatility budget, then combined so
            no single model decides the outcome. Bellwether spans nine of them.
          </p>
        </div>

        <div className="qv-sleeves" aria-label="Bellwether composition by weight">
          <div className="qv-alloc" aria-hidden="true">
            {compositeSleeves.map((sleeve, index) => (
              <span
                key={sleeve.label}
                style={{ "--qv-weight": sleeve.weight, "--qv-order": index } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="qv-sleeve-list">
            {compositeSleeves.map((sleeve, index) => (
              <div
                className="qv-sleeve"
                key={sleeve.label}
                style={{ "--qv-order": index } as React.CSSProperties}
              >
                <span className="qv-sleeve-swatch" aria-hidden="true" />
                <span className="qv-sleeve-label">{sleeve.label}</span>
                <span className="qv-sleeve-weight">{sleeve.weight}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="qv-terms" aria-labelledby="qv-terms-heading">
        <h2 id="qv-terms-heading">Subscription and risk terms.</h2>
        <div className="qv-clusters">
          <div>
            <h3>Subscription</h3>
            <p>Minimum 50,000 shares.</p>
            <p>Weekly window, Thursday cut-off.</p>
            <p>Allocation confirmed the next business day.</p>
          </div>
          <div>
            <h3>Redemption</h3>
            <p>Monthly window.</p>
            <p>Settlement within five business days.</p>
            <p>No lock-up after the third month.</p>
          </div>
          <div>
            <h3>Risk controls</h3>
            <p>Per-product volatility budget.</p>
            <p>Hard stop at the stated drawdown limit.</p>
            <p>Assets held with an independent custodian.</p>
          </div>
        </div>
      </section>

      <section className="qv-access" aria-labelledby="qv-access-heading">
        <h2 id="qv-access-heading">Subscriptions open by request.</h2>
        <a href={accessLink()}>
          {inquiryEmail}
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="qv-disclosure" aria-labelledby="qv-disclosure-heading">
        <h2 id="qv-disclosure-heading">Important information</h2>
        <p>
          Every figure on this page is illustrative sample data generated for interface
          demonstration. It does not describe a live product, a real track record, or a real
          subscription book.
        </p>
        <p>
          Nothing here is an offer to sell or a solicitation to buy any security, and nothing here
          is investment advice. Past performance does not predict future results. A {sessionCount}
          -day return extrapolated to a full year is an unstable estimate and will overstate both
          gains and losses.
        </p>
      </section>

      <footer className="qv-footer">
        <span>© {new Date().getFullYear()} Foundry Nomad</span>
        <nav aria-label="Legal">
          <Link href="/">Home</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </footer>
    </main>
  );
}
