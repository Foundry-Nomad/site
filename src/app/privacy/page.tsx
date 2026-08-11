import type { Metadata } from "next";
import { LegalDocument } from "../_components/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy | Foundry Nomad",
  description: "How Foundry Nomad collects, uses, shares, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="LEGAL / PRIVACY"
      title="Privacy Policy"
      summary="This Policy explains how Foundry Nomad handles personal information when founders and one-person companies visit our website or use our services."
      effectiveDate="August 11, 2026"
      sections={[
        {
          title: "Information we collect",
          content: <><p>Depending on how you interact with us, we may collect:</p><ul><li><strong>Account and contact data,</strong> such as your name, email address, company details, and login information;</li><li><strong>Business and service data,</strong> including content, instructions, files, and records you submit while using our tools;</li><li><strong>Transaction data,</strong> such as plan and payment status. Payment card details are generally processed by our payment provider rather than stored by us;</li><li><strong>Device and usage data,</strong> including IP address, browser, device type, pages viewed, referring pages, interactions, and diagnostic logs; and</li><li><strong>Communications,</strong> including support requests, feedback, and survey responses.</li></ul></>,
        },
        {
          title: "How we use information",
          content: <><p>We use personal information to provide and personalize the service, authenticate users, process transactions, respond to requests, maintain security, prevent abuse, analyze performance, improve features, communicate service updates, comply with law, and establish or defend legal claims.</p><p>Where applicable law requires a legal basis, we rely on performance of a contract, our legitimate interests, compliance with legal obligations, or your consent.</p></>,
        },
        {
          title: "Cookies and analytics",
          content: <p>We and our service providers may use cookies and similar technologies to keep the site functioning, remember preferences, understand usage, measure campaigns, and improve performance. Our site uses Google Tag Manager to manage website tags; the tags configured through it may collect usage data or set cookies. Where required, we will request consent before using non-essential cookies. You can also control cookies through your browser, although disabling them may affect some features.</p>,
        },
        {
          title: "How we share information",
          content: <><p>We may share information with hosting, cloud, analytics, communications, customer-support, security, and payment providers that process data for us; with professional advisers; during a financing, merger, acquisition, or asset transfer; when you direct us to connect a third-party service; or when disclosure is reasonably necessary to comply with law, protect rights, and prevent harm.</p><p>We do not sell personal information for money. If our practices are considered “selling,” “sharing,” or targeted advertising under applicable privacy law, we will provide any required notice and opt-out mechanism.</p></>,
        },
        {
          title: "Customer-controlled data",
          content: <p>When a business customer submits personal information about its own customers, contractors, or contacts, that business generally controls why and how the information is used, and Foundry Nomad processes it to provide the service. The customer is responsible for providing required notices, obtaining permissions, and responding to individual requests. Individuals should first direct requests about customer-controlled data to the relevant customer.</p>,
        },
        {
          title: "Retention and security",
          content: <p>We retain personal information only as long as reasonably necessary for the purposes described in this Policy, including providing the service, meeting legal and accounting obligations, resolving disputes, and enforcing agreements. Retention periods depend on the type of data and applicable requirements. We use reasonable administrative, technical, and organizational safeguards, but no system can guarantee absolute security.</p>,
        },
        {
          title: "International data transfers",
          content: <p>We and our providers may process information in countries other than your own. Where required, we use recognized safeguards for international transfers, such as adequacy decisions or contractual protections. Laws in those countries may differ from those where you live.</p>,
        },
        {
          title: "Your privacy choices and rights",
          content: <><p>Depending on where you live, you may have rights to access, correct, delete, or receive a copy of your personal information; restrict or object to certain processing; withdraw consent; opt out of certain sharing or targeted advertising; and appeal a decision about your request. You may also unsubscribe from promotional email using the link in the message.</p><p>Submit a request through the official contact channel published on our website. We may need to verify your identity. Authorized agents may submit requests where permitted by law, and you may complain to your local data-protection authority.</p></>,
        },
        {
          title: "Children",
          content: <p>The service is intended for business users and is not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided personal information, please contact us so we can take appropriate action.</p>,
        },
        {
          title: "Updates and contact",
          content: <p>We may update this Policy as our service or legal obligations change. We will post the updated version with a revised effective date and provide additional notice when required. Questions, requests, and complaints may be submitted through the official contact channel published on the Foundry Nomad website.</p>,
        },
      ]}
    />
  );
}
