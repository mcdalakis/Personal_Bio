import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowRight, Sparkles, MapPin, ArrowDown } from 'lucide-react';
import { useTypingText } from '@/hooks/useTypingText';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { IMAGES } from '@/lib/images';

const CYCLING_PHRASES = [
  'ECE Student @ Uni of Patras',
  'Python Developer',
  'Smart Home & Audio Enthusiast',
  'Aviation & Motorsports Fan',
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/mcdalakis', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/michael-dalakis-878463368', label: 'LinkedIn' },
  { icon: Mail, href: `${import.meta.env.BASE_URL}contact`, label: 'Email' },
];

const PREVIEW_CARDS = [
  {
    title: 'Coding & Web Dev',
    desc: 'Python since age 14, React web apps, and automation scripts.',
    img: IMAGES.coding,
    to: '/world',
    icon: '💻',
  },
  {
    title: 'Smart Home & Audio',
    desc: 'Home Assistant automations, Hi-Fi setups, and home servers.',
    img: IMAGES.homeTheater,
    to: '/world',
    icon: '🏠',
  },
  {
    title: 'Military Aviation',
    desc: 'Fighter jets, flight mechanics, and aviation engineering.',
    img: IMAGES.fighterJet,
    to: '/world',
    icon: '✈',
  },
  {
    title: 'Motorsports',
    desc: 'Cars, bikes, engines, and the thrill of the track.',
    img: IMAGES.raceCar,
    to: '/world',
    icon: '🏎',
  },
];

function Hero() {
  const { text, isDeleting } = useTypingText(CYCLING_PHRASES);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMove);
    return () => el?.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="bg-mesh relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-cobalt-200/30 blur-3xl"
        style={{
          top: '8%',
          left: '6%',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full bg-cobalt-100/50 blur-3xl"
        style={{
          bottom: '6%',
          right: '8%',
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cobalt-300/20 blur-3xl animate-pulse-glow" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#1f2535 1px, transparent 1px), linear-gradient(90deg, #1f2535 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cobalt-200/60 bg-white/60 px-4 py-2 text-sm font-medium text-ink-600 backdrop-blur-md animate-fade-up">
          <Sparkles className="h-4 w-4 text-cobalt-500" />
          <span>Welcome to my world</span>
        </div>

        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-ink-900 sm:text-6xl md:text-7xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Hi, I'm{' '}
          <span className="text-gradient-cobalt">Michael Dalakis</span>
        </h1>

        <div className="mb-6 flex h-10 items-center justify-center text-xl font-semibold text-ink-700 sm:text-2xl md:text-3xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <span className="font-mono">
            {text}
            <span className={`ml-1 inline-block w-0.5 bg-cobalt-500 ${isDeleting ? '' : 'animate-pulse'}`} style={{ height: '1em' }} />
          </span>
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Passionate about technology, coding, building home automation setups and exploring complex systems.
        </p>

        <div className="mb-10 flex items-center justify-center gap-1.5 text-sm text-ink-400 animate-fade-up" style={{ animationDelay: '0.35s' }}>
          <MapPin className="h-4 w-4" />
          <span>Patras, Greece</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/world"
            className="group relative overflow-hidden rounded-2xl bg-gradient-cobalt px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cobalt-500/25 transition-all hover:shadow-2xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My World
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
          <Link
            to="/contact"
            className="rounded-2xl border border-ink-200 bg-white/60 px-8 py-4 text-base font-semibold text-ink-700 backdrop-blur-md transition-all hover:border-cobalt-300 hover:text-cobalt-600 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: '0.6s' }}>
        <div className="glass-card flex items-center gap-2 rounded-2xl px-3 py-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-ink-500 transition-all hover:bg-cobalt-50 hover:text-cobalt-600 hover:scale-110"
            >
              <Icon className="h-5 w-5" />
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ card, delay }: { card: typeof PREVIEW_CARDS[number]; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();
  return (
    <Link
      to={card.to}
      ref={ref}
      className={`group relative block overflow-hidden rounded-2xl transition-all duration-700 hover:-translate-y-1 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative h-60 overflow-hidden rounded-2xl">
        <img
          src={card.img}
          alt={card.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <span className="mb-2 inline-block text-2xl">{card.icon}</span>
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p className="mt-1 text-sm text-white/80">{card.desc}</p>
        </div>
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all group-hover:bg-cobalt-500">
          <ArrowRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </Link>
  );
}

function PreviewSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-4 py-1.5 text-sm font-semibold text-cobalt-600">
            <Sparkles className="h-4 w-4" fill="currentColor" />
            A Glimpse
          </span>
          <h2 className="text-4xl font-bold text-ink-900 sm:text-5xl">
            My passions at a <span className="text-gradient-cobalt">glance</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500">
            A quick preview of what I'm into. Dive deeper into each on the full page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEW_CARDS.map((card, i) => (
            <PreviewCard key={card.title} card={card} delay={i * 0.1} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/world"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-cobalt px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cobalt-500/25 transition-all hover:shadow-xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5"
          >
            Explore everything
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <PreviewSection />
    </>
  );
}
