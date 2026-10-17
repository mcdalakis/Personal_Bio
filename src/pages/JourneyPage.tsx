import { useState, useRef, useEffect } from 'react';
import { Code2, Globe, GraduationCap, ArrowRight, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { IMAGES } from '@/lib/images';

interface JourneyStage {
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

const STAGES: JourneyStage[] = [
  {
    icon: Code2,
    label: 'Early Days',
    title: 'Started coding at age 14',
    description:
      'Discovered Python and a deep passion for tech hardware and systems. What started as curiosity quickly became a core part of who I am. I spent hours experimenting, building small scripts, and taking apart hardware just to understand how it worked.',
    tags: ['Python', 'First Steps', 'Hardware'],
    image: IMAGES.codingTeen,
    imageAlt: 'Teenager coding at a computer desk',
  },
  {
    icon: Globe,
    label: 'Web & Projects',
    title: 'Building custom web apps',
    description:
      'Expanded into web development with HTML, CSS, and React while building Python scripts that automate and solve real-world problems. This is where I learned to combine creativity with engineering—turning ideas into functional, polished projects.',
    tags: ['HTML', 'CSS', 'React', 'Python Scripts'],
    image: IMAGES.coding,
    imageAlt: 'Programming code on a monitor screen',
  },
  {
    icon: GraduationCap,
    label: 'Present Day',
    title: '1st-year ECE Student @ University of Patras',
    description:
      'Diving deeper into engineering, complex systems, and automation. Studying Electrical & Computer Engineering at the University of Patras while continuing to build, explore, and push my technical boundaries every day.',
    tags: ['ECE', 'Uni of Patras', 'Engineering', 'Automation'],
    image: IMAGES.campus,
    imageAlt: 'University library with students studying',
  },
];

function JourneyHero() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="bg-mesh relative overflow-hidden pt-32 pb-16">
      <div className="pointer-events-none absolute right-10 top-20 h-72 w-72 rounded-full bg-cobalt-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-10 bottom-0 h-64 w-64 rounded-full bg-cobalt-100/50 blur-3xl" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-4 py-1.5 text-sm font-semibold text-cobalt-600">
          <Rocket className="h-4 w-4" />
          My Journey
        </span>
        <h1 className="text-4xl font-bold text-ink-900 sm:text-5xl md:text-6xl">
          The road so <span className="text-gradient-cobalt">far</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          Key milestones that shaped my passion for technology and engineering. Scroll to follow the path.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="flex h-12 w-7 justify-center rounded-full border-2 border-ink-200">
            <div className="mt-2 h-2 w-1 rounded-full bg-cobalt-400 animate-scroll-hint" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StageBlock({ stage, index }: { stage: JourneyStage; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 gap-8 transition-all duration-1000 md:grid-cols-2 md:gap-16 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      } ${isLeft ? '' : 'md:[&>*:first-child]:order-2'}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <img
          src={stage.image}
          alt={stage.imageAlt}
          className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-xl bg-ink-950/70 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
          {stage.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <div className="glass-card rounded-2xl p-6 lg:p-7">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative">
              <div className="absolute h-12 w-12 rounded-full bg-cobalt-100/60 blur-md animate-pulse-glow" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-cobalt shadow-lg shadow-cobalt-500/30">
                <stage.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="rounded-full bg-cobalt-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cobalt-600">
              {stage.label}
            </span>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-ink-900">{stage.title}</h2>
          <p className="mb-5 text-sm leading-relaxed text-ink-500">{stage.description}</p>
          <div className="flex flex-wrap gap-2">
            {stage.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-ink-100 bg-white/60 px-2.5 py-1 font-mono text-xs font-medium text-ink-500"
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

function ProgressRail() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      setScrollProgress((scrolled / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl px-6 py-8">
      {/* Vertical rail */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink-100" />
      <div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-cobalt transition-all duration-300"
        style={{ height: `${scrollProgress}%` }}
      />

      {/* Stage markers */}
      <div className="relative space-y-24 py-8">
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="relative">
            {/* Center dot on rail */}
            <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="h-5 w-5 rounded-full border-4 border-white bg-cobalt-500 shadow-lg shadow-cobalt-500/30" />
            </div>
            <div className="pt-6">
              <StageBlock stage={stage} index={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JourneyPage() {
  return (
    <>
      <JourneyHero />
      <section className="bg-white py-12">
        <ProgressRail />
      </section>
      <section className="bg-mesh py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Zap className="mx-auto mb-4 h-10 w-10 text-cobalt-500" />
          <h2 className="mb-4 text-3xl font-bold text-ink-900">
            The journey is just <span className="text-gradient-cobalt">beginning</span>
          </h2>
          <p className="mb-8 text-ink-500">Curious about what I'm into right now? Check out my world.</p>
          <Link
            to="/world"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-cobalt px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cobalt-500/25 transition-all hover:shadow-xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5"
          >
            Explore my world
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
