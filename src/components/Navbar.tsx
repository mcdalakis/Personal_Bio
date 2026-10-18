import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROFILE_IMAGE = `${import.meta.env.BASE_URL}profile.jpg`;

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'My World', to: '/world' },
  { label: 'Journey', to: '/journey' },
  { label: 'Projects', to: '/projects' },
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
        className={`mx-3 max-w-6xl transition-all duration-300 md:mx-auto md:px-4 ${
          scrolled || mobileOpen ? 'glass-nav rounded-2xl' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-3 py-3 md:px-4">
          <Link
            to="/"
            onClick={() => {
              setMobileOpen(false);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
            }}
            className="flex items-center gap-2 font-bold text-ink-900 transition-transform hover:scale-105"
          >
            <img
              src={PROFILE_IMAGE}
              alt=""
              className="h-9 w-9 rounded-full object-cover shadow-lg shadow-cobalt-500/30"
            />
            <span className="text-lg">mcdalakis</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  link.to === '/contact'
                    ? 'rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/30 hover:bg-orange-600'
                    : location.pathname === link.to
                      ? 'text-cobalt-600'
                      : 'text-ink-600 hover:text-cobalt-600'
                }`}
              >
                {link.label}
                {location.pathname === link.to && link.to !== '/contact' && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-cobalt-500" />
                )}
              </Link>
            ))}
          </div>

          <button
            className="rounded-lg p-2 text-ink-700 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden md:hidden"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                  exit: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                }}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div
                    key={link.to}
                    variants={{
                      hidden: { y: 16, opacity: 0 },
                      show: { y: 0, opacity: 1 },
                      exit: { y: 16, opacity: 0 },
                    }}
                  >
                    <Link
                      to={link.to}
                      className={`block rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                        location.pathname === link.to
                          ? 'bg-cobalt-50 text-cobalt-600'
                          : 'text-ink-600 hover:bg-cobalt-50 hover:text-cobalt-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
