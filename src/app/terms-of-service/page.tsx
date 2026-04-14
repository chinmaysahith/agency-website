import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — APSLOCK",
  description:
    "Read the terms and conditions governing your use of the APSLOCK website and services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: April 14, 2026
          </p>
        </div>

        <div className="prose prose-gray max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-gray-600 [&_li]:text-[15px] [&_li]:text-gray-600 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the website <strong>apslock.com</strong> (the
            &quot;Site&quot;), operated by APSLOCK (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to
            be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to
            these Terms, you must not access or use the Site.
          </p>
          <p>
            These Terms apply to all visitors, users, and anyone who accesses
            the Site. We reserve the right to update or modify these Terms at
            any time. Continued use of the Site following any changes
            constitutes acceptance of the revised Terms.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            APSLOCK is a digital agency providing web design, branding, UI/UX
            design, development, and growth marketing services. The Site serves
            as a portfolio and informational platform. Specific services
            rendered to clients are governed by separate agreements, proposals,
            or contracts.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this Site — including but not limited to text,
            graphics, logos, images, animations, code, designs, and overall
            layout — is the property of APSLOCK or its content suppliers and is
            protected by international copyright, trademark, and intellectual
            property laws.
          </p>
          <p>You may not:</p>
          <ul>
            <li>
              Reproduce, distribute, modify, or create derivative works of any
              content on the Site without prior written permission.
            </li>
            <li>
              Use any APSLOCK trademarks, logos, or branding without explicit
              authorization.
            </li>
            <li>
              Scrape, mine, or otherwise extract data from the Site for
              commercial purposes.
            </li>
          </ul>

          <h2>4. User Conduct</h2>
          <p>When using the Site, you agree not to:</p>
          <ul>
            <li>
              Use the Site in any way that violates applicable laws or
              regulations.
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Site,
              servers, or networks connected to the Site.
            </li>
            <li>
              Introduce viruses, trojans, worms, or any other malicious code.
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Site.
            </li>
            <li>
              Use automated tools (bots, crawlers, scrapers) to access the Site
              without our express written consent.
            </li>
            <li>
              Impersonate any person or entity, or misrepresent your affiliation.
            </li>
          </ul>

          <h2>5. Contact Forms and Communications</h2>
          <p>
            When you submit information through our contact forms or by email,
            you consent to us using that information to respond to your inquiry.
            We will handle your personal data in accordance with our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
          <p>
            You are responsible for ensuring that any information you provide is
            accurate, complete, and up to date.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or services that
            are not owned or controlled by APSLOCK. We have no control over and
            assume no responsibility for the content, privacy policies, or
            practices of any third-party websites.
          </p>
          <p>
            We encourage you to review the terms and privacy policies of any
            third-party site you visit. Inclusion of any link does not imply
            endorsement by APSLOCK.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
            warranties of any kind, either express or implied, including but not
            limited to:
          </p>
          <ul>
            <li>Implied warranties of merchantability or fitness for a particular purpose.</li>
            <li>Warranties that the Site will be uninterrupted, secure, or error-free.</li>
            <li>Warranties regarding the accuracy or reliability of any content on the Site.</li>
          </ul>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, APSLOCK and its
            directors, employees, partners, and affiliates shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising out of or in connection with:
          </p>
          <ul>
            <li>Your use of, or inability to use, the Site.</li>
            <li>Any errors, inaccuracies, or omissions in the content.</li>
            <li>Unauthorized access to or alteration of your data.</li>
            <li>Any third-party conduct on the Site.</li>
          </ul>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless APSLOCK and its
            officers, directors, employees, and agents from any claims, damages,
            losses, liabilities, or expenses (including reasonable legal fees)
            arising out of or in connection with your use of the Site, your
            violation of these Terms, or your violation of any rights of a
            third party.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to conflict of law principles. Any
            disputes arising under these Terms shall be subject to the exclusive
            jurisdiction of the courts located in India.
          </p>

          <h2>11. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or
            unenforceable by a court of competent jurisdiction, the remaining
            provisions shall remain in full force and effect. The invalid or
            unenforceable provision will be modified to the minimum extent
            necessary to make it valid and enforceable.
          </p>

          <h2>12. Entire Agreement</h2>
          <p>
            These Terms, together with our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>, constitute the
            entire agreement between you and APSLOCK regarding your use of the
            Site and supersede any prior agreements or understandings.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <p>
            <strong>APSLOCK</strong>
            <br />
            Email:{" "}
            <a href="mailto:hello@apslock.com">hello@apslock.com</a>
            <br />
            Website:{" "}
            <Link href="/contact">Contact Page</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
