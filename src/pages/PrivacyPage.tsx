const CONTACT_PATH = `${import.meta.env.BASE_URL}contact`;

export function PrivacyPage() {
  return (
    <section className="bg-mesh min-h-screen pt-32 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        <div className="glass-card rounded-3xl p-6 sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cobalt-600">
            Privacy
          </p>
          <h1 className="mb-4 text-4xl font-bold text-ink-900">Privacy Notice</h1>
          <p className="mb-8 text-sm text-ink-400">Last updated: 24 October 2026</p>

          <div className="space-y-7 text-sm leading-relaxed text-ink-600">
            <section>
              <h2 className="mb-2 text-lg font-bold text-ink-900">Who is responsible</h2>
              <p>
                Michael Dalakis is responsible for personal information submitted through this
                personal website. For privacy questions or requests, use the{' '}
                <a className="underline hover:text-cobalt-600" href={CONTACT_PATH}>
                  contact form
                </a>{' '}
                and start your message with “Privacy request”.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-ink-900">Information and purpose</h2>
              <p>
                If you use the contact form, it collects your name, email address, and message.
                I use these details only to read and respond to your message. The form is not
                for sensitive or confidential information.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-ink-900">Legal basis and retention</h2>
              <p>
                Where data-protection law applies, contact details are processed on the basis
                of the legitimate interest in responding to messages. Messages in my inbox are
                kept only while the conversation is active and should be deleted once it is
                complete. EmailJS and email providers may retain copies under their own
                retention and backup practices.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-ink-900">Services used by this site</h2>
              <p>
                GitHub Pages hosts the website. The site loads fonts from Google Fonts and
                photographs directly from Pexels. Visiting pages that use those resources
                causes your browser to request them from those providers. Contact form details
                are sent through EmailJS to the email service configured for this site. These
                providers may process technical information such as your IP address and
                browser details, and their processing or data locations may be outside the
                European Economic Area.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li><a className="underline hover:text-cobalt-600" href="https://docs.github.com/en/pages" target="_blank" rel="noreferrer">GitHub Pages information</a></li>
                <li><a className="underline hover:text-cobalt-600" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a></li>
                <li><a className="underline hover:text-cobalt-600" href="https://www.pexels.com/privacy-policy/" target="_blank" rel="noreferrer">Pexels Privacy Policy</a></li>
                <li><a className="underline hover:text-cobalt-600" href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noreferrer">EmailJS Privacy Policy</a></li>
              </ul>
              <p className="mt-3">
                This site does not currently use analytics or advertising trackers. Check the
                providers’ notices for their own cookies, logs, and international-transfer
                safeguards.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-ink-900">Your rights</h2>
              <p>
                Depending on the law that applies, you may have the right to request access,
                correction, deletion, restriction, or portability of your personal data, or
                object to its processing. Use the contact method above to make a request. You
                may also complain to the{' '}
                <a
                  className="underline hover:text-cobalt-600"
                  href="https://www.dpa.gr/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hellenic Data Protection Authority
                </a>.
              </p>
            </section>
          </div>
        </div>
      </article>
    </section>
  );
}
