import type { ReactNode } from "react";
import Link from "next/link";
import { Instrument_Sans, Source_Serif_4 } from "next/font/google";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

// TODO: replace every value below with your real details.
export const LEGAL = {
  app: "MailMind",
  company: "MailMind",
  address: "",
  supportEmail: "support.mailmind@gmail.com",
  privacyEmail: "privacy.mailmind@gmail.com",
  jurisdiction: "India",
  updated: "October 27, 2026",
};

export type LegalSection = { id: string; title: string; body: ReactNode };

export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-md border-l-4 border-[#2f5bea] bg-[#eaf0ff] px-5 py-4 text-[0.97rem] [&>p:last-child]:mb-0">
      <p className="!mb-2 font-[family-name:var(--font-sans)] font-semibold">
        {title}
      </p>
      {children}
    </div>
  );
}

export function LegalLayout({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  const link =
    "rounded-sm hover:text-[#172033] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5bea]";

  return (
    <div
      className={`${sans.variable} ${serif.variable} min-h-screen bg-[#f6f7f9] text-[#172033]`}
    >
      <header className="border-b border-[#e3e7ee] bg-white font-[family-name:var(--font-sans)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className={`text-lg font-semibold tracking-tight ${link}`}
          >
            {LEGAL.app}
          </Link>
          <nav className="flex gap-5 text-sm text-[#5b6678]">
            <Link href="/privacy" className={link}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={link}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-12 px-6 py-14 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav
            aria-label="On this page"
            className="sticky top-8 font-[family-name:var(--font-sans)] text-sm"
          >
            <ol className="space-y-2 text-[#5b6678]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={link}>
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article>
          <h1 className="font-[family-name:var(--font-sans)] text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-serif)] text-lg text-[#5b6678]">
            {intro}
          </p>
          <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[#5b6678]">
            Last updated {LEGAL.updated}
          </p>

          <div className="mt-12 max-w-[44rem] space-y-12 font-[family-name:var(--font-serif)] text-[1.0625rem] leading-[1.75]">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-8">
                <h2 className="mb-4 font-[family-name:var(--font-sans)] text-2xl font-semibold tracking-tight">
                  {i + 1}. {s.title}
                </h2>
                <div className="[&_a]:text-[#2f5bea] [&_a]:underline [&_code]:break-all [&_code]:rounded [&_code]:bg-[#e3e8f0] [&_code]:px-1 [&_code]:text-sm [&_li]:mb-2 [&_p]:mb-4 [&_strong]:font-semibold [&_td]:border-t [&_td]:border-[#d9dfe8] [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_td]:text-[0.95rem] [&_th]:pb-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-[family-name:var(--font-sans)] [&_th]:text-sm [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <footer className="border-t border-[#e3e7ee] bg-white py-6 text-center font-[family-name:var(--font-sans)] text-sm text-[#5b6678]">
        © {new Date().getFullYear()} {LEGAL.company}. All rights reserved.
      </footer>
    </div>
  );
}
