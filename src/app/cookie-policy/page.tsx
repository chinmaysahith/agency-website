import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — APSLOCK",
  description:
    "Understand what cookies APSLOCK uses, why we use them, and how you can manage your preferences. Full GDPR and ePrivacy compliant cookie disclosure.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: April 14, 2026
          </p>
        </div>

        <div className="prose prose-gray max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-gray-600 [&_li]:text-[15px] [&_li]:text-gray-600 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device (computer,
            tablet, or smartphone) when you visit a website. They are widely used
            to make websites work efficiently, provide a better browsing
            experience, and supply information to site owners.
          </p>
          <p>
            Cookies can be &quot;first-party&quot; (set by the website you are visiting) or
            &quot;third-party&quot; (set by a service used by the website, such as an
            analytics provider). They can be &quot;session&quot; cookies (deleted when you
            close your browser) or &quot;persistent&quot; cookies (remain on your device for
            a set period or until you delete them).
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            APSLOCK (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies
            on our website <strong>apslock.com</strong> (the &quot;Site&quot;). We categorize
            cookies into three groups:
          </p>

          <h3>2.1 Necessary Cookies</h3>
          <p>
            These cookies are essential for the Site to function correctly. They
            enable core functionality such as page navigation, access to secure
            areas, and remembering your cookie consent preferences. These cookies
            do not collect personal information used for marketing and cannot be
            disabled.
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-[13px] text-gray-600 border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-gray-800">Cookie</th>
                  <th className="py-2 pr-4 font-semibold text-gray-800">Purpose</th>
                  <th className="py-2 pr-4 font-semibold text-gray-800">Duration</th>
                  <th className="py-2 font-semibold text-gray-800">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-mono text-[12px]">cookie-consent</td>
                  <td className="py-2 pr-4">Stores your cookie consent preferences</td>
                  <td className="py-2 pr-4">Persistent (until cleared)</td>
                  <td className="py-2">First-party (localStorage)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2.2 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our Site
            by collecting and reporting information anonymously. We use this data
            to improve the Site&apos;s structure, content, and user experience.
          </p>
          <p>
            <strong>These cookies are only placed after you give explicit
            consent via our cookie banner.</strong>
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-[13px] text-gray-600 border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-gray-800">Cookie</th>
                  <th className="py-2 pr-4 font-semibold text-gray-800">Provider</th>
                  <th className="py-2 pr-4 font-semibold text-gray-800">Purpose</th>
                  <th className="py-2 pr-4 font-semibold text-gray-800">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-mono text-[12px]">_ga</td>
                  <td className="py-2 pr-4">Google Analytics</td>
                  <td className="py-2 pr-4">Distinguishes unique users by assigning a randomly generated number</td>
                  <td className="py-2">2 years</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-mono text-[12px]">_ga_*</td>
                  <td className="py-2 pr-4">Google Analytics</td>
                  <td className="py-2 pr-4">Maintains session state</td>
                  <td className="py-2">2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Google Analytics uses IP anonymization on our Site. For more
            information, see{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3>2.3 Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites and display
            ads that are relevant and engaging for the individual user. We
            currently do not use marketing cookies, but this category is
            available in our consent system to ensure compliance if we add
            advertising or retargeting tools in the future.
          </p>
          <p>
            <strong>Marketing cookies will never be loaded without your explicit
            consent.</strong>
          </p>

          <h2>3. How to Manage Your Cookie Preferences</h2>
          <p>You can manage your cookie preferences in several ways:</p>
          <ul>
            <li>
              <strong>Cookie Banner:</strong> When you first visit our Site, a
              cookie banner will appear allowing you to accept all cookies,
              reject non-essential cookies, or customize your preferences
              category by category.
            </li>
            <li>
              <strong>Cookie Settings Link:</strong> You can change your
              preferences at any time by clicking the &quot;Cookie Settings&quot; link in
              the website footer.
            </li>
            <li>
              <strong>Browser Settings:</strong> Most web browsers allow you to
              control cookies through their settings. You can set your browser to
              block or alert you about cookies. Note that blocking all cookies
              may affect the functionality of some websites.
            </li>
          </ul>
          <p>
            For information on how to manage cookies in specific browsers:
          </p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">
                Apple Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2>4. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy periodically to reflect changes in
            the cookies we use or for operational, legal, or regulatory reasons.
            Please revisit this page regularly to stay informed. The &quot;Last
            updated&quot; date at the top indicates when the policy was last revised.
          </p>

          <h2>5. More Information</h2>
          <p>
            For more details about how we handle your personal data, please read
            our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>. If you have any
            questions about our use of cookies, contact us at{" "}
            <a href="mailto:privacy@apslock.com">privacy@apslock.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
