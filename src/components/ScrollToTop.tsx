import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'instant' overrides the global `html { scroll-behavior: smooth }` rule.
    // A smooth scroll gets interrupted by mount animations on mobile, leaving
    // the page mid-scroll; instant guarantees we land at the top.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
