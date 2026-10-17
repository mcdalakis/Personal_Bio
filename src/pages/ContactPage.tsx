import { useState, useEffect, type FormEvent } from 'react';
import {
  Send, CheckCircle2, AlertCircle, Mail, MapPin, MessageSquare, User, Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PROFILE_IMAGE = `${import.meta.env.BASE_URL}profile.jpg`;

type ToastState = 'idle' | 'success' | 'error';

function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  required,
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ElementType;
  required?: boolean;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-4 text-ink-300 transition-colors" style={{ zIndex: 1 }}>
        <Icon className="h-5 w-5" />
      </div>
      {textarea ? (
        <textarea
          id={id}
          required={required}
          value={value}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full resize-none rounded-2xl border border-ink-200 bg-white/60 px-12 py-4 pt-5 text-sm text-ink-900 backdrop-blur-md transition-all focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-200 focus:outline-none"
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-2xl border border-ink-200 bg-white/60 px-12 py-4 pt-5 text-sm text-ink-900 backdrop-blur-md transition-all focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-200 focus:outline-none"
          placeholder=" "
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-12 transition-all duration-200 ${
          isFloating
            ? 'top-2.5 text-xs font-medium text-cobalt-500'
            : 'top-4 text-sm text-ink-400'
        }`}
      >
        {label}{required && <span className="text-cobalt-400"> *</span>}
      </label>
    </div>
  );
}

function PageHeader() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="bg-mesh relative overflow-hidden pt-32 pb-12">
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-cobalt-200/30 blur-3xl" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-4 py-1.5 text-sm font-semibold text-cobalt-600">
          <Mail className="h-4 w-4" />
          Say Hello
        </span>
        <h1 className="text-4xl font-bold text-ink-900 sm:text-5xl md:text-6xl">
          Let's <span className="text-gradient-cobalt">connect</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          Whether it's about tech, music, or just to say hi—drop me a message.
        </p>
      </div>
    </section>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState<ToastState>('idle');
  const [submitting, setSubmitting] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.1);

  useEffect(() => {
    if (toast === 'idle') return;
    const timer = setTimeout(() => setToast('idle'), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name,
        email,
        message,
      });

      if (error) throw error;

      setToast('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setToast('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader />
      <section className="bg-white py-12 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div
            ref={ref}
            className={`grid grid-cols-1 gap-8 transition-all duration-700 lg:grid-cols-5 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Image side */}
            <div className="lg:col-span-2">
              <div className="relative h-full min-h-80 overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={PROFILE_IMAGE}
                  alt="Contact communication"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">Reach out anytime</h3>
                  <p className="mt-2 text-sm text-white/80">
                    I'm always happy to talk about tech, music, aviation, or whatever crosses your mind.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                    <MapPin className="h-4 w-4" />
                    <span>Patras, Greece</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8">
                <div className="space-y-4">
                  <FloatingInput
                    id="name"
                    label="Your Name"
                    value={name}
                    onChange={setName}
                    icon={User}
                    required
                  />
                  <FloatingInput
                    id="email"
                    label="Your Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    icon={Mail}
                    required
                  />
                  <FloatingInput
                    id="message"
                    label="Your Message"
                    value={message}
                    onChange={setMessage}
                    icon={MessageSquare}
                    required
                    textarea
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cobalt px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cobalt-500/25 transition-all hover:shadow-xl hover:shadow-cobalt-500/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Toast notification */}
      {toast !== 'idle' && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce-in">
          <div
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl ${
              toast === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {toast === 'success' ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-semibold">Message sent! I'll get back to you soon.</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">Something went wrong. Please try again.</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
