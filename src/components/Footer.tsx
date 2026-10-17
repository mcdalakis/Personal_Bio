import { Link } from 'react-router-dom';
import { Zap, Heart } from 'lucide-react';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', to: '/contact' },
];

const PAGE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'My World', to: '/world' },
  { label: 'Journey', to: '/journey' },
  { label: 'Fast Facts', to: '/facts' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link to="/" className="flex items-center gap-2 font-bold text-ink-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-cobalt text-white shadow-lg shadow-cobalt-500/20">
              <Zap className="h-5 w-5" fill="currentColor" />
            </span>
            <span>Michael Dalakis</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-4">
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-ink-500 transition-colors hover:text-cobalt-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink-500 transition-colors hover:text-cobalt-600"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to!}
                  className="text-sm font-medium text-ink-500 transition-colors hover:text-cobalt-600"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-sm text-ink-400">
          <span>© 2026 Michael Dalakis.</span>
        </div>
      </div>
    </footer>
  );
}
