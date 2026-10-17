import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'My World', to: '/world' },
  { label: 'Journey', to: '/journey' },
  { label: 'Fast Facts', to: '/facts' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto max-w-6xl px-4 transition-all duration-300 ${
          scrolled ? 'glass-nav rounded-2xl' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-ink-900 transition-transform hover:scale-105"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-cobalt text-white shadow-lg shadow-cobalt-500/30">
              <Zap className="h-5 w-5" fill="currentColor" />
            </span>
            <span className="text-lg">mcdalakis</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-cobalt-600'
                    : 'text-ink-600 hover:text-cobalt-600'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-cobalt-500" />
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 rounded-xl bg-gradient-cobalt px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cobalt-500/25 transition-all hover:shadow-xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5"
            >
              Say Hello
            </Link>
          </div>

          <button
            className="rounded-lg p-2 text-ink-700 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="flex flex-col gap-1 px-4 pb-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-cobalt-50 text-cobalt-600'
                    : 'text-ink-600 hover:bg-cobalt-50 hover:text-cobalt-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
