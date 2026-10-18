import { useState } from 'react';
import { Lightbulb, RefreshCw, Shuffle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { IMAGES } from '@/lib/images';

interface FastFact {
  category: string;
  icon: string;
  title: string;
  detail: string;
  image: string;
}

const FACTS: FastFact[] = [
  { category: 'Aviation', icon: '✈', title: 'F-16 Fighting Falcon', detail: 'Top speed: Mach 2.0 (2,120 km/h). Powered by a single F100-PW-220 turbofan producing ~28,000 lbs of thrust with afterburner.', image: IMAGES.fighterJet },
  { category: 'Metal', icon: '🎸', title: 'Doom Metal', detail: 'Characterized by slow tempos, thick guitar tones, and a massive, crushing atmosphere. Pioneered by Black Sabbath and Candlemass.', image: IMAGES.guitar },
  { category: 'Gaming', icon: '🎯', title: 'CS Headshot Accuracy', detail: 'In competitive Counter-Strike, pro players maintain headshot rates of 60-70% with rifles like the AK-47 and M4.', image: IMAGES.gaming },
  { category: 'Smart Home', icon: '🏠', title: 'Home Assistant', detail: 'An open-source home automation platform running locally. Supports 2,000+ integrations and works entirely offline without cloud dependency.', image: IMAGES.smartHome },
  { category: 'Coding', icon: '🐍', title: 'Python Origins', detail: 'Python was created by Guido van Rossum in 1991 and named after Monty Python\'s Flying Circus, not the snake!', image: IMAGES.coding },
  { category: 'Sports', icon: '🎾', title: 'Tennis Serve Speed', detail: 'The fastest recorded tennis serve is 263 km/h (163.7 mph) by Sam Groth in 2012. Even recreational players can exceed 150 km/h.', image: IMAGES.tennis },
  { category: 'Aviation', icon: '🚀', title: 'Thrust-to-Weight Ratio', detail: 'Fighter jets like the F-15 have a thrust-to-weight ratio greater than 1, meaning they can accelerate straight up!', image: IMAGES.jetFormation },
  { category: 'Metal', icon: '⚡', title: 'Thrash Metal Big Four', detail: 'Metallica, Slayer, Megadeth, and Anthrax—the "Big Four" of thrash metal that defined the genre in the 1980s.', image: IMAGES.guitaristLive },
  { category: 'Motorsports', icon: '🏎', title: 'F1 Engine Redline', detail: 'Modern F1 V6 turbo hybrid engines rev up to 15,000 RPM, producing over 1,000 horsepower from just 1.6 liters of displacement.', image: IMAGES.raceCar },
  { category: 'Audio', icon: '🔊', title: 'Hi-Fi Frequency Range', detail: 'Human hearing spans 20Hz to 20,000Hz. High-end audio gear aims to reproduce this entire range with minimal distortion.', image: IMAGES.homeTheater },
  { category: 'Gaming', icon: '🕹', title: 'CS Map Pool Classic', detail: 'Dust2 is one of the most played maps in FPS history—originally released in 2001 for CS 1.1 and still iconic today.', image: IMAGES.gamingSetup },
  { category: 'Sports', icon: '🥇', title: 'Long Jump World Record', detail: 'Mike Powell\'s 8.95m long jump record from 1991 still stands today—over 30 years unbeaten. That\'s nearly 30 feet!', image: IMAGES.trackField },
];

function PageHeader() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="bg-mesh relative overflow-hidden pt-32 pb-12">
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-cobalt-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cobalt-100/50 blur-3xl" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-4 py-1.5 text-sm font-semibold text-cobalt-600">
          <Lightbulb className="h-4 w-4" fill="currentColor" />
          Fast Facts
        </span>
        <h1 className="text-4xl font-bold text-ink-900 sm:text-5xl md:text-6xl">
          Fun facts <span className="text-gradient-cobalt">generator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          Click to discover random facts about my hobbies—from aviation specs to metal subgenres.
        </p>
      </div>
    </section>
  );
}

export function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.1);

  const showNext = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FACTS.length);
      setIsFlipping(false);
    }, 200);
  };

  const showRandom = () => {
    setIsFlipping(true);
    setTimeout(() => {
      let next = Math.floor(Math.random() * FACTS.length);
      while (next === currentIndex && FACTS.length > 1) {
        next = Math.floor(Math.random() * FACTS.length);
      }
      setCurrentIndex(next);
      setIsFlipping(false);
    }, 200);
  };

  const fact = FACTS[currentIndex];

  return (
    <>
      <PageHeader />
      <section className="bg-white py-12 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div
            ref={ref}
            className={`relative transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ perspective: '1000px' }}
          >
            <div
              className={`glass-card relative overflow-hidden rounded-3xl transition-all duration-200 ${
                isFlipping ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              {/* Image header */}
              <div className="relative h-56 overflow-hidden sm:h-64">
                <img
                  src={fact.image}
                  alt={fact.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  key={fact.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-500/90 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                    <span className="text-lg">{fact.icon}</span>
                    {fact.category}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{fact.title}</h2>
                </div>
                <span className="absolute right-4 top-4 font-mono text-xs font-medium text-white/70">
                  {currentIndex + 1} / {FACTS.length}
                </span>
              </div>

              {/* Detail */}
              <div className="p-6 sm:p-8">
                <p className="text-base leading-relaxed text-ink-600">{fact.detail}</p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-6 flex justify-center gap-1.5">
              {FACTS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-6 bg-cobalt-500' : 'w-1.5 bg-ink-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={showNext}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-cobalt px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cobalt-500/25 transition-all hover:shadow-xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5"
            >
              <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
              Next Fact
            </button>
            <button
              onClick={showRandom}
              className="group flex items-center gap-2 rounded-2xl border border-ink-200 bg-white/60 px-7 py-3.5 text-sm font-semibold text-ink-700 backdrop-blur-md transition-all hover:border-cobalt-300 hover:text-cobalt-600 hover:-translate-y-0.5"
            >
              <Shuffle className="h-4 w-4 transition-transform group-hover:scale-110" />
              Surprise Me
            </button>
          </div>
        </div>
      </section>

      <section className="bg-mesh py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-ink-900">
            Want to see these <span className="text-gradient-cobalt">in action?</span>
          </h2>
          <p className="mb-8 text-ink-500">Dive into my world and explore the things behind these facts.</p>
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
