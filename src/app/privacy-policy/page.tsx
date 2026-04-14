import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — APSLOCK",
  description:
    "Learn how APSLOCK collects, uses, and protects your personal data. Read our full privacy policy covering GDPR, CCPA, and ePrivacy compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: April 14, 2026
          </p>
        </div>

        <div className="prose prose-gray max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-gray-600 [&_li]:text-[15px] [&_li]:text-gray-600 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
          <h2>1. Introduction</h2>
          <p>
            APSLOCK (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your personal information when you visit our website{" "}
            <strong>apslock.com</strong> (the &quot;Site&quot;) and use our services.
          </p>
          <p>
            We process personal data in accordance with the General Data
            Protection Regulation (GDPR), the ePrivacy Directive, the California
            Consumer Privacy Act (CCPA), and other applicable data protection
            laws. By accessing or using our Site, you acknowledge that you have
            read and understood this Privacy Policy.
          </p>

          <h2>2. Data Controller</h2>
          <p>
            The data controller responsible for your personal data is:
          </p>
          <p>
            <strong>APSLOCK</strong>
            <br />
            Email:{" "}
            <a href="mailto:privacy@apslock.com">privacy@apslock.com</a>
          </p>
          <p>
            If you have any questions about how we handle your data, please
            contact us using the details above.
          </p>

          <h2>3. Information We Collect</h2>
          <p>We may collect the following categories of personal data:</p>
          <ul>
            <li>
              <strong>Contact Information:</strong> Name, email address, phone
              number, and company name — provided voluntarily through contact
              forms or email.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type and
              version, operating system, referring URLs, pages visited, time
              spent on pages, and other diagnostic data — collected
              automatically through server logs and analytics tools (with your
              consent).
            </li>
            <li>
              <strong>Communication Data:</strong> Any information you provide
              when contacting us, including the content of messages and
              attachments.
            </li>
            <li>
              <strong>Newsletter Data:</strong> Email address — if you
              voluntarily subscribe to our newsletter.
            </li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>
              <strong>Service Delivery:</strong> To respond to inquiries,
              provide quotes, and deliver our web design, branding, and growth
              services.
            </li>
            <li>
              <strong>Website Analytics:</strong> To understand how visitors
              interact with our Site, identify trends, and improve user
              experience (only with your explicit consent via our cookie
              banner).
            </li>
            <li>
              <strong>Marketing Communications:</strong> To send newsletters and
              promotional content (only with your explicit opt-in consent).
            </li>
            <li>
              <strong>Legal Compliance:</strong> To comply with applicable laws,
              regulations, and legal processes.
            </li>
            <li>
              <strong>Security:</strong> To detect, prevent, and address
              technical issues and protect against fraudulent or illegal
              activity.
            </li>
          </ul>

          <h2>5. Legal Basis for Processing (GDPR)</h2>
          <p>
            We process your personal data based on the following legal grounds:
          </p>
          <ul>
            <li>
              <strong>Consent (Art. 6(1)(a) GDPR):</strong> For analytics
              cookies, marketing cookies, and newsletter subscriptions. You can
              withdraw consent at any time.
            </li>
            <li>
              <strong>Contractual Necessity (Art. 6(1)(b) GDPR):</strong> To
              respond to your inquiries and deliver services you have requested.
            </li>
            <li>
              <strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> For
              website security, fraud prevention, and improving our services —
              where such interests are not overridden by your rights.
            </li>
            <li>
              <strong>Legal Obligation (Art. 6(1)(c) GDPR):</strong> To comply
              with legal requirements such as tax or accounting obligations.
            </li>
          </ul>

          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies on our Site. These are
            categorized as follows:
          </p>
          <ul>
            <li>
              <strong>Necessary Cookies:</strong> Essential for the Site to
              function (e.g., session management, security). These do not
              require consent.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Used to collect anonymized
              data about Site usage via Google Analytics. These are only loaded
              after you give explicit consent.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used for targeted advertising
              and retargeting. These are only loaded after you give explicit
              consent.
            </li>
          </ul>
          <p>
            You can manage your cookie preferences at any time using the cookie
            settings link in our website footer, or by visiting our{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            We may share your data with the following categories of third-party
            service providers, strictly as needed to operate and improve our
            services:
          </p>
          <ul>
            <li>
              <strong>Google Analytics (Google LLC):</strong> Web analytics
              service. Data is anonymized (IP anonymization enabled). Google&apos;s
              privacy policy:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/privacy
              </a>
            </li>
            <li>
              <strong>Hosting Provider:</strong> Our website hosting provider
              processes data as required to serve the Site.
            </li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal data to any third
            parties.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            Some of our third-party service providers (e.g., Google) may process
            data outside the European Economic Area (EEA). In such cases, we
            ensure appropriate safeguards are in place, such as Standard
            Contractual Clauses (SCCs) or the EU-US Data Privacy Framework.
          </p>

          <h2>9. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes described in this policy:
          </p>
          <ul>
            <li>
              <strong>Contact form submissions:</strong> Retained for up to 24
              months from the date of your last communication.
            </li>
            <li>
              <strong>Analytics data:</strong> Retained for up to 14 months (as
              per Google Analytics default settings).
            </li>
            <li>
              <strong>Newsletter subscriptions:</strong> Retained until you
              unsubscribe.
            </li>
          </ul>

          <h2>10. Your Rights</h2>
          <p>
            Depending on your location, you have the following rights regarding
            your personal data:
          </p>

          <p>
            <strong>Under GDPR (EU/UK residents):</strong>
          </p>
          <ul>
            <li>Right of access — request a copy of your personal data</li>
            <li>Right to rectification — correct inaccurate data</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent at any time</li>
            <li>
              Right to lodge a complaint with your local data protection
              authority
            </li>
          </ul>

          <p>
            <strong>Under CCPA (California residents):</strong>
          </p>
          <ul>
            <li>
              Right to know what personal information we collect, use, and
              disclose
            </li>
            <li>Right to delete your personal information</li>
            <li>Right to opt-out of the sale of personal information</li>
            <li>Right to non-discrimination for exercising your rights</li>
          </ul>

          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@apslock.com">privacy@apslock.com</a>. We
            will respond within 30 days (or within the timeframe required by
            applicable law).
          </p>

          <h2>11. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            disclosure, or destruction. These measures include encrypted
            connections (HTTPS/TLS), access controls, and regular security
            reviews.
          </p>
          <p>
            However, no method of transmission over the internet or electronic
            storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2>12. Children&apos;s Privacy</h2>
          <p>
            Our Site is not directed at children under the age of 16. We do not
            knowingly collect personal data from children. If we become aware
            that we have collected data from a child under 16, we will take
            steps to delete it promptly.
          </p>

          <h2>13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or applicable laws. We will post the
            updated version on this page with a revised &quot;Last updated&quot; date. We
            encourage you to review this page periodically.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or your personal data, please contact us:
          </p>
          <p>
            <strong>APSLOCK</strong>
            <br />
            Email:{" "}
            <a href="mailto:privacy@apslock.com">privacy@apslock.com</a>
            <br />
            Website:{" "}
            <Link href="/contact">Contact Page</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
