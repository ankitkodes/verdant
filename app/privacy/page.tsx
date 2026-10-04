import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy — Verdant",
  description:
    "Learn how Verdant collects, uses, and protects your personal information when you use our AI mock interview platform.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="October 4, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p className="mt-3">
          Verdant (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an AI-powered mock interview
          platform. This Privacy Policy explains how we collect, use, store, and protect your
          information when you use our website and services.
        </p>
        <p className="mt-3">
          By creating an account or using Verdant, you agree to the practices described in this
          policy. If you do not agree, please do not use our services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p className="mt-3">We may collect the following types of information:</p>
        <ul className="mt-3">
          <li>
            <strong>Account information:</strong> name, email address, and authentication details
            when you sign up or log in.
          </li>
          <li>
            <strong>Interview data:</strong> your practice responses, session history, and AI
            feedback scores generated during mock interviews.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, features used, device type, browser type,
            and approximate location derived from IP address.
          </li>
          <li>
            <strong>Communications:</strong> messages you send us for support or feedback.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p className="mt-3">We use your information to:</p>
        <ul className="mt-3">
          <li>Provide, operate, and improve the Verdant platform</li>
          <li>Generate AI interview questions and personalized feedback</li>
          <li>Track your progress and interview history</li>
          <li>Authenticate your account and keep it secure</li>
          <li>Send important service updates and respond to support requests</li>
          <li>Analyze usage patterns to improve product quality</li>
        </ul>
        <p className="mt-3">
          We do not sell your personal information or share your interview responses with
          employers or third parties for marketing purposes.
        </p>
      </section>

      <section>
        <h2>4. AI Processing</h2>
        <p className="mt-3">
          Your interview answers may be processed by AI models to generate questions, evaluate
          responses, and produce feedback. We take steps to limit unnecessary retention of
          raw content used solely for model processing and do not use your personal interview
          data to train public models without your consent.
        </p>
      </section>

      <section>
        <h2>5. Data Sharing</h2>
        <p className="mt-3">We may share information only in these limited cases:</p>
        <ul className="mt-3">
          <li>
            <strong>Service providers:</strong> trusted vendors who help us host, authenticate,
            email, or analyze the product, under confidentiality obligations.
          </li>
          <li>
            <strong>Legal requirements:</strong> when required by law, regulation, or valid legal
            process.
          </li>
          <li>
            <strong>Business transfers:</strong> if Verdant is involved in a merger, acquisition,
            or asset sale, your information may be transferred with appropriate notice.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Data Retention</h2>
        <p className="mt-3">
          We retain your account and interview data for as long as your account is active or as
          needed to provide the service. You may request deletion of your account and associated
          data at any time. Some records may be retained where required for legal, security, or
          dispute-resolution purposes.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p className="mt-3">Depending on your location, you may have the right to:</p>
        <ul className="mt-3">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your account and interview history</li>
          <li>Export a copy of your data</li>
          <li>Object to or restrict certain processing</li>
        </ul>
        <p className="mt-3">
          To exercise these rights, contact us at{" "}
          <a href="mailto:privacy@verdant.ai">privacy@verdant.ai</a>.
        </p>
      </section>

      <section>
        <h2>8. Security</h2>
        <p className="mt-3">
          We use industry-standard technical and organizational measures to protect your data,
          including encryption in transit and access controls. No method of transmission over the
          internet is 100% secure, so we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>9. Cookies</h2>
        <p className="mt-3">
          We use essential cookies and similar technologies to keep you signed in, remember
          preferences, and understand how the product is used. You can control cookies through
          your browser settings, though disabling them may affect some features.
        </p>
      </section>

      <section>
        <h2>10. Children&apos;s Privacy</h2>
        <p className="mt-3">
          Verdant is not directed to children under 13, and we do not knowingly collect personal
          information from children under 13. If you believe a child has provided us data, please
          contact us so we can delete it.
        </p>
      </section>

      <section>
        <h2>11. Changes to This Policy</h2>
        <p className="mt-3">
          We may update this Privacy Policy from time to time. When we do, we will revise the
          &quot;Last updated&quot; date at the top of this page. Continued use of Verdant after
          changes means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2>12. Contact Us</h2>
        <p className="mt-3">
          Questions about this Privacy Policy? Email us at{" "}
          <a href="mailto:privacy@verdant.ai">privacy@verdant.ai</a>.
        </p>
      </section>
    </LegalPageShell>
  );
}
