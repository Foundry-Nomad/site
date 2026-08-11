import type { Metadata } from "next";
import { LegalDocument } from "../_components/legal-document";

export const metadata: Metadata = {
  title: "Terms of Service | Foundry Nomad",
  description: "Terms governing access to and use of Foundry Nomad services.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="LEGAL / TERMS"
      title="Terms of Service"
      summary="These Terms govern your access to Foundry Nomad and the tools, guidance, and operational services we provide to founders and one-person companies."
      effectiveDate="August 11, 2026"
      sections={[
        {
          title: "Acceptance of these Terms",
          content: <p>By accessing or using Foundry Nomad, you agree to these Terms and our Privacy Policy. If you use the service on behalf of a business, you confirm that you have authority to bind that business. If you do not agree, do not use the service.</p>,
        },
        {
          title: "Our services",
          content: <p>Foundry Nomad provides software, workflows, information, and operational support designed to help founders and one-person companies plan, launch, and run their businesses. Features may change as the service develops. Unless expressly stated in a separate written agreement, our content is general business information and is not legal, tax, accounting, investment, or other regulated professional advice.</p>,
        },
        {
          title: "Eligibility and accounts",
          content: <><p>You must be legally able to enter into a binding contract and use the service in compliance with applicable law. You are responsible for:</p><ul><li>providing accurate and current account information;</li><li>protecting your credentials and devices;</li><li>all activity conducted through your account; and</li><li>notifying us promptly of suspected unauthorized access.</li></ul></>,
        },
        {
          title: "Acceptable use",
          content: <><p>You may not use the service to break the law, infringe another person’s rights, mislead or defraud others, distribute malware, gain unauthorized access, interfere with the service, scrape or reverse engineer restricted parts of the service, or generate or distribute unlawful content. You remain responsible for reviewing and lawfully using any output produced with our tools.</p></>,
        },
        {
          title: "Your content and data",
          content: <p>You retain ownership of the materials and data you submit. You grant us a limited, worldwide license to host, process, reproduce, and transmit that content only as needed to provide, secure, support, and improve the service. You confirm that you have the rights and permissions needed to provide the content, including any personal data belonging to your customers or collaborators.</p>,
        },
        {
          title: "Our intellectual property",
          content: <p>The service, including its software, design, branding, documentation, and original content, belongs to Foundry Nomad or its licensors and is protected by intellectual property laws. These Terms give you a limited, non-exclusive, non-transferable, and revocable right to use the service for your internal business purposes; they do not transfer ownership to you.</p>,
        },
        {
          title: "Third-party services",
          content: <p>The service may connect to or rely on third-party products. Your use of those products may be governed by separate terms and privacy policies. We are not responsible for third-party services, their availability, or actions they take with your data.</p>,
        },
        {
          title: "Fees and subscriptions",
          content: <p>If we introduce paid plans, pricing, billing intervals, taxes, renewal terms, cancellation rights, and any refund policy will be presented before purchase. You authorize us and our payment providers to charge the payment method you choose for amounts that become due.</p>,
        },
        {
          title: "Availability and termination",
          content: <p>We may modify, suspend, or discontinue all or part of the service. You may stop using the service at any time. We may restrict or terminate access if you breach these Terms, create risk or legal exposure, or if required by law. Provisions that by their nature should survive termination will remain in effect.</p>,
        },
        {
          title: "Disclaimers and liability",
          content: <><p>To the maximum extent permitted by law, the service is provided “as is” and “as available,” without warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted operation.</p><p>To the maximum extent permitted by law, Foundry Nomad will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, data, goodwill, or business opportunities. Our total liability for claims relating to the service will not exceed the amount you paid us for the service during the 12 months before the event giving rise to the claim, or USD 100 if you paid nothing. Some jurisdictions do not allow certain exclusions, so these limits may not apply to you.</p></>,
        },
        {
          title: "Changes, disputes, and contact",
          content: <p>We may update these Terms and will post the revised version with a new effective date. Material changes will be communicated when reasonably possible. These Terms are governed by the laws applicable in the jurisdiction where the Foundry Nomad contracting entity is established, without regard to conflict-of-law rules. Before filing a formal claim, please contact us through the official contact channel published on our website so we can try to resolve the matter informally.</p>,
        },
      ]}
    />
  );
}
