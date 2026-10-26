import type { Metadata } from "next";
import {
  Callout,
  LEGAL,
  LegalLayout,
  LegalSection,
} from "../components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | MailMind",
  description:
    "How MailMind collects, uses and protects your Google account and Gmail data.",
};

const scopes = [
  [
    "openid, email, profile",
    "Sign you in and show your name, email address and profile picture.",
    "Account creation and sign-in.",
  ],
  [
    "https://www.googleapis.com/auth/gmail.readonly",
    "Read your messages, threads, labels and settings.",
    "Generate insights and summaries from your emails.",
  ],
  [
    "https://www.googleapis.com/auth/gmail.modify",
    "Edit message state: apply labels, archive, mark read or unread, move to trash. It cannot permanently delete mail.",
    "Organize your inbox when you ask us to.",
  ],
  [
    "https://www.googleapis.com/auth/gmail.compose",
    "Create, edit and send drafts and messages.",
    "Write, save and send AI-assisted emails when you approve them.",
  ],
];

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <>
        <p>
          {LEGAL.app} (“we”, “us”) is an app that lets you sign in with your
          Google account so our AI can read your emails, show you insights about
          your inbox, and help you compose and edit emails. This policy explains
          what we collect, how we use it, and the choices you have. By using{" "}
          {LEGAL.app} you agree to this policy.
        </p>
        <p>
          {LEGAL.app} is operated by {LEGAL.company}, {LEGAL.address}.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <ul>
          <li>
            <strong>Google account information:</strong> your name, email
            address, profile picture and Google account ID.
          </li>
          <li>
            <strong>Email data, only after you grant permission:</strong>{" "}
            message content, subject lines, senders and recipients, dates,
            labels, drafts and attachment details.
          </li>
          <li>
            <strong>Content you give us:</strong> prompts, instructions, drafts
            and edits you enter in the AI composer, and any feedback you send.
          </li>
          <li>
            <strong>Technical data:</strong> device and browser type, IP
            address, log data and cookies (see section 10).
          </li>
        </ul>
        <p>
          We never see your Google password. We do not request access to Google
          Drive, Contacts, Calendar or any Google service other than those
          listed below.
        </p>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Google permissions we request",
    body: (
      <>
        <p>
          When you sign in, Google asks you to approve the permissions below. We
          request only what each feature needs.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse">
            <thead>
              <tr>
                <th>Permission</th>
                <th>What it allows</th>
                <th>Why we need it</th>
              </tr>
            </thead>
            <tbody>
              {scopes.map(([scope, allows, why]) => (
                <tr key={scope}>
                  <td>
                    <code>{scope}</code>
                  </td>
                  <td>{allows}</td>
                  <td>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          We send an email only when you review and approve it. You can withdraw
          these permissions at any time (see section 9).
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use your information",
    body: (
      <ul>
        <li>Sign you in and keep your account secure.</li>
        <li>
          Analyze your emails to show you summaries, priorities and trends.
          These insights are visible only to you.
        </li>
        <li>
          Help you write, reply to and edit emails, and organize your inbox at
          your direction.
        </li>
        <li>Provide support, fix errors and keep the service running.</li>
        <li>Prevent abuse and fraud, and comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "ai",
    title: "How our AI uses your emails",
    body: (
      <>
        <p>
          When you ask for an insight or a draft, we send the relevant email
          text to an AI model provider ([Your AI provider]) over an encrypted
          connection. The provider processes it only to return your result and
          is contractually prohibited from using it to train its models.
        </p>
        <p>
          <strong>
            We do not use your email data to train generalized AI or machine
            learning models.
          </strong>{" "}
          Any personalization applies only to your own experience in {LEGAL.app}
          .
        </p>
        <p>
          Our staff do not read your emails unless you ask us to for support and
          give consent, it is necessary for security or abuse investigation, or
          the law requires it. AI can make mistakes, so please check its output.
        </p>
      </>
    ),
  },
  {
    id: "limited-use",
    title: "Google API Services Limited Use disclosure",
    body: (
      <Callout title="Our commitment">
        <p>
          {LEGAL.app}’s use and transfer to any other app of information
          received from Google APIs will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
        <ul>
          <li>
            We use Google user data only to provide and improve user-facing
            features you request.
          </li>
          <li>We do not sell Google user data or use it for advertising.</li>
          <li>
            We do not use it to create, train or improve generalized AI or ML
            models.
          </li>
          <li>
            We do not transfer it to others except to provide the features
            above, comply with law, or as part of a merger or sale with notice
            to you.
          </li>
        </ul>
      </Callout>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: (
      <>
        <p>We do not sell your personal information. We share it only with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that host our app, store data or
            run AI processing for us, under contracts that limit them to our
            instructions.
          </li>
          <li>
            <strong>Authorities</strong> when required by law or to protect
            rights, safety or security.
          </li>
          <li>
            <strong>A successor</strong> if we are involved in a merger or
            acquisition. We will tell you first and your data stays under this
            policy.
          </li>
          <li>
            <strong>Recipients you choose</strong>, when you send an email
            through {LEGAL.app}.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Security and retention",
    body: (
      <>
        <p>
          Data is encrypted in transit (TLS) and at rest. Google access tokens
          are stored encrypted, and access to production systems is restricted
          and logged. No system is perfectly secure, but we work to protect your
          data and will notify you of a breach as the law requires.
        </p>
        <p>
          We process email content to produce your results and keep it no longer
          than needed. We keep your account details, settings, drafts and
          generated insights until you delete them or close your account. After
          you delete your account we remove your data within 30 days, except
          what the law requires us to keep.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: (
      <>
        <ul>
          <li>
            <strong>Disconnect Google:</strong> remove {LEGAL.app}’s access at{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              myaccount.google.com/permissions
            </a>
            . We stop accessing your Gmail immediately.
          </li>
          <li>
            <strong>Delete your data:</strong> delete your account in Settings
            or email{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>.
          </li>
          <li>
            <strong>Access, correct or export</strong> the personal data we hold
            about you.
          </li>
        </ul>
        <p>
          Depending on where you live, you may have further rights under laws
          such as the GDPR and UK GDPR, the California CCPA/CPRA, or India’s
          Digital Personal Data Protection Act, 2023, including the right to
          object, restrict processing and complain to a regulator. Write to us
          to exercise them.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        We use essential cookies to keep you signed in and secure. We do not use
        advertising cookies or sell data to advertisers. If we add analytics, it
        will never include the contents of your emails.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        {LEGAL.app} is not intended for anyone under 18. We do not knowingly
        collect data from children, and will delete it if we learn we have.
      </p>
    ),
  },
  {
    id: "changes",
    title: "International transfers and changes",
    body: (
      <>
        <p>
          Your data may be processed in countries other than your own. Where
          required, we use safeguards such as standard contractual clauses.
        </p>
        <p>
          We may update this policy. For material changes we will email you or
          notify you in the app before they take effect, and we will update the
          date above.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about privacy? Email{" "}
        <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a> or
        write to {LEGAL.company}, {LEGAL.address}.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="What MailMind collects from your Google account, how our AI uses it, and how you stay in control."
      sections={sections}
    />
  );
}
