import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Cpu, Plane, Gauge, Music, Trophy, Gamepad2, CircleDot, Disc3,
  Activity, Zap, ArrowUpRight, CheckCircle2, Volume2, Target,
  ArrowRight, Server, Speaker, Gauge as GaugeIcon,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { IMAGES } from '@/lib/images';

function PageHeader() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="bg-mesh relative overflow-hidden pt-32 pb-12">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cobalt-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full bg-cobalt-100/50 blur-3xl" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-6 text-center transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-4 py-1.5 text-sm font-semibold text-cobalt-600">
          <Zap className="h-4 w-4" fill="currentColor" />
          My World & Passions
        </span>
        <h1 className="text-4xl font-bold text-ink-900 sm:text-5xl md:text-6xl">
          What makes me, <span className="text-gradient-cobalt">me</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          A visual tour of everything I'm passionate about—from code to cockpits, from rackets to riffs.
        </p>
      </div>
    </section>
  );
}

function ImageCard({
  title,
  subtitle,
  description,
  images,
  tags,
  icon: Icon,
  features,
  reverse,
  delay = 0,
}: {
  title: string;
  subtitle: React.ReactNode;
  description: string;
  images: { src: string; alt: string; label: string }[];
  tags: string[];
  icon: React.ElementType;
  features?: { icon: React.ElementType; text: string }[];
  reverse?: boolean;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`glass-card overflow-hidden rounded-3xl transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Images */}
        <div className="relative grid grid-cols-2 gap-1 p-1">
          {images.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl ${images.length === 1 ? 'col-span-2' : ''}`}>
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${images.length === 1 ? 'h-72 lg:h-full' : 'h-40 lg:h-48'}`}
                loading="lazy"
              />
              <span className="absolute bottom-2 left-2 rounded-lg bg-ink-950/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {img.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-7 lg:p-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cobalt shadow-lg shadow-cobalt-500/25">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h2 className="mb-1 text-2xl font-bold text-ink-900">{title}</h2>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-cobalt-600">
            {subtitle}
          </p>
          <p className="mb-5 text-sm leading-relaxed text-ink-500">{description}</p>

          {features && (
            <div className="mb-5 space-y-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink-600">
                  <f.icon className="h-4 w-4 text-cobalt-500" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-ink-100 bg-white/60 px-3 py-1.5 font-mono text-xs font-medium text-ink-600 transition-all hover:border-cobalt-200 hover:bg-cobalt-50 hover:text-cobalt-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AudioVisualizerCard() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [bars, setBars] = useState<number[]>(Array(28).fill(20));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBars((prev) => prev.map((_, i) => {
        const center = 14;
        const dist = Math.abs(i - center);
        const base = 60 - dist * 3;
        return Math.max(8, base + Math.random() * 40 - 10);
      }));
    }, 120);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`glass-card overflow-hidden rounded-3xl transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: '0.2s' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative grid grid-cols-2 gap-1 p-1">
          <div className="relative overflow-hidden rounded-2xl">
            <img src={IMAGES.guitar} alt="Live guitarist on stage" className="h-40 w-full object-cover lg:h-64" loading="lazy" />
            <span className="absolute bottom-2 left-2 rounded-lg bg-ink-950/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">Live</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img src={IMAGES.guitaristLive} alt="Guitarist performing" className="h-40 w-full object-cover lg:h-64" loading="lazy" />
            <span className="absolute bottom-2 left-2 rounded-lg bg-ink-950/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">On Stage</span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 lg:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cobalt shadow-lg shadow-cobalt-500/25">
                <Music className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink-900">Music Vibe</h2>
                <p className="flex items-center gap-1 text-sm font-medium text-ink-400">
                  <Volume2 className="h-3 w-3" /> Heavy Metal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold text-ink-400">LIVE</span>
            </div>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-ink-500">
            Heavy metal runs deep—from thrash to doom, death to power. The energy, the riffs, the raw power of a live show.
          </p>
          <div className="mb-5 flex h-24 items-end justify-center gap-1 rounded-xl bg-ink-950/90 px-4 py-3">
            {bars.map((height, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-cobalt-600 to-cobalt-300"
                style={{ height: `${height}%`, transition: 'height 0.12s ease-out' }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['Thrash', 'Doom', 'Death', 'Power', 'Prog'].map((sub) => (
              <span key={sub} className="rounded-lg border border-ink-100 bg-white/60 px-2.5 py-1 font-mono text-xs font-medium text-ink-500 transition-all hover:border-cobalt-200 hover:bg-cobalt-50 hover:text-cobalt-600">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipCard({ icon: Icon, title, img, back, delay }: { icon: React.ElementType; title: string; img: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${delay}s`, perspective: '800px' }}
    >
      <div
        className="relative h-56 cursor-pointer preserve-3d transition-transform duration-500"
        style={{ transform: flipped ? 'rotateY(180deg)' : '' }}
        onClick={() => setFlipped((v) => !v)}
      >
        {/* Front: image */}
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl shadow-md">
          <img src={img} alt={title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-4 text-white">
            <Icon className="h-5 w-5" />
            <h4 className="text-sm font-bold">{title}</h4>
          </div>
          <span className="absolute right-3 top-3 rounded-lg bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Tap to flip
          </span>
        </div>
        {/* Back: description */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-cobalt p-5 text-center text-white shadow-lg">
          <Icon className="mb-3 h-8 w-8" />
          <h4 className="mb-2 text-lg font-bold">{title}</h4>
          <p className="text-sm leading-relaxed">{back}</p>
        </div>
      </div>
    </div>
  );
}

function SportsGamingSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [tab, setTab] = useState<'all' | 'sport' | 'gaming'>('all');

  const items = [
    { icon: CircleDot, title: 'Tennis', img: IMAGES.tennis, back: 'Rally-focused with a strong baseline game.', category: 'sport' as const },
    { icon: Disc3, title: 'Table Tennis', img: IMAGES.tableTennis, back: 'Quick reflexes and spin control at the table.', category: 'sport' as const },
    { icon: Activity, title: 'Track & Field', img: IMAGES.trackField, back: 'Sprints and long jump—explosive power focus.', category: 'sport' as const },
    { icon: Target, title: 'Darts', img: IMAGES.darts, back: 'Precision and steady hand. Bullseye hunter.', category: 'sport' as const },
    { icon: Gamepad2, title: 'Counter-Strike', img: IMAGES.gaming, back: 'Competitive FPS—tactical play and sharp aim.', category: 'gaming' as const },
    { icon: Trophy, title: 'Versatility', img: IMAGES.gamingSetup, back: 'Always up for a challenge across any game.', category: 'gaming' as const },
  ];
  const filtered = items.filter((d) => tab === 'all' || d.category === tab);

  return (
    <div
      ref={ref}
      className={`glass-card rounded-3xl p-7 lg:p-8 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: '0.3s' }}
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cobalt shadow-lg shadow-cobalt-500/25">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Sports & Gaming</h2>
            <p className="text-sm font-medium text-ink-400">Tap a card to flip</p>
          </div>
        </div>
        <div className="flex gap-1 rounded-xl bg-ink-50 p-1">
          {(['all', 'sport', 'gaming'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
                tab === t ? 'bg-white text-cobalt-600 shadow-sm' : 'text-ink-400 hover:text-ink-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filtered.map((data, i) => (
          <FlipCard key={data.title} icon={data.icon} title={data.title} img={data.img} back={data.back} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

export function WorldPage() {
  return (
    <>
      <PageHeader />
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl space-y-8 px-6">
          <ImageCard
            title="Coding & Web Development"
            subtitle={<><CheckCircle2 className="h-4 w-4" /> Python Certified</>}
            description="Started coding in Python at age 14 and never looked back. Now building web apps with React and crafting Python scripts that solve real problems."
            images={[
              { src: IMAGES.coding, alt: 'Programming code on monitor', label: 'Code' },
              { src: IMAGES.codingTeen, alt: 'Teenager coding at home', label: 'Since age 14' },
            ]}
            tags={['Python', 'HTML', 'CSS', 'React']}
            icon={Code2}
            features={[
              { icon: Code2, text: 'Python development since age 14' },
              { icon: CheckCircle2, text: 'Python certification' },
              { icon: ArrowUpRight, text: 'Web apps with React, HTML, CSS' },
            ]}
            delay={0}
          />

          <ImageCard
            title="Smart Home & Audio"
            subtitle="Home Assistant & Hi-Fi Enthusiast"
            description="Running Home Assistant automations, custom smart setups, and a complex audio/home theater hardware ecosystem that I'm constantly tweaking."
            images={[
              { src: IMAGES.homeTheater, alt: 'Home theater setup', label: 'Home Theater' },
              { src: IMAGES.homeServer, alt: 'Home server rack', label: 'Home Server' },
              { src: IMAGES.smartHome, alt: 'Smart home control panel', label: 'Automation' },
              { src: IMAGES.speaker, alt: 'Surround sound speakers', label: 'Speakers' },
            ]}
            tags={['Home Assistant', 'Hi-Fi', 'Automation', 'Networking']}
            icon={Cpu}
            features={[
              { icon: Cpu, text: 'Home Assistant local automations' },
              { icon: Server, text: 'Self-hosted home server infrastructure' },
              { icon: Speaker, text: 'Multi-room audio and home theater setup' },
            ]}
            reverse
            delay={0.1}
          />

          <ImageCard
            title="Military Aviation"
            subtitle="Flight mechanics & aviation tech"
            description="Fascinated by military aircraft, flight mechanics, and the engineering behind aviation technology. From fighter jets to turbine design, I love understanding how these machines work."
            images={[
              { src: IMAGES.fighterJet, alt: 'Military fighter jet in sky', label: 'Fighter Jet' },
              { src: IMAGES.jetFormation, alt: 'Jets in formation', label: 'Formation' },
              { src: IMAGES.jetEngine, alt: 'Jet engine close-up', label: 'Engine' },
            ]}
            tags={['Fighter Jets', 'Flight Mechanics', 'Turbines', 'Aerodynamics']}
            icon={Plane}
            features={[
              { icon: Plane, text: 'Military aircraft enthusiast' },
              { icon: Activity, text: 'Flight mechanics and aerodynamics' },
              { icon: Zap, text: 'Engine and turbine technology' },
            ]}
            delay={0.15}
          />

          <ImageCard
            title="Motorsports & Engines"
            subtitle="Cars, bikes, and raw performance"
            description="From cars to bikes—captivated by motorsports, engine mechanics, and the raw precision of performance machines. The sound, the speed, the engineering."
            images={[
              { src: IMAGES.raceCar, alt: 'Race cars on track', label: 'Racing' },
              { src: IMAGES.motorcycle, alt: 'Sport bike', label: 'Bikes' },
              { src: IMAGES.carEngine, alt: 'Car engine detail', label: 'Engine' },
            ]}
            tags={['Cars', 'Motorcycles', 'Engine Mechanics', 'Racing']}
            icon={Gauge}
            features={[
              { icon: Gauge, text: 'Engine mechanics and tuning' },
              { icon: Activity, text: 'Motorsports and track performance' },
              { icon: GaugeIcon, text: 'Bikes and performance machines' },
            ]}
            reverse
            delay={0.2}
          />

          <AudioVisualizerCard />

          <SportsGamingSection />
        </div>
      </section>

      <section className="bg-mesh py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-ink-900">
            Want to see how it all <span className="text-gradient-cobalt">started?</span>
          </h2>
          <p className="mb-8 text-ink-500">Follow my journey from a curious 14-year-old to an ECE student.</p>
          <Link
            to="/journey"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-cobalt px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cobalt-500/25 transition-all hover:shadow-xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5"
          >
            Explore my journey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
