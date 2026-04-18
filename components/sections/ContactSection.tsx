'use client';
import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { socialLinks, siteConfig } from '@/utils/constants';
import { HiEnvelope, HiMapPin } from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

function extractFieldErrors(error: unknown): FieldErrors {
  if (!error || typeof error !== 'object') return {};

  const possibleFieldErrors =
    'fieldErrors' in error
      ? (error as { fieldErrors?: Record<string, string[] | undefined> })
          .fieldErrors
      : (error as Record<string, string[] | undefined>);

  if (!possibleFieldErrors) return {};

  return {
    name: possibleFieldErrors.name?.find(Boolean) || '',
    email: possibleFieldErrors.email?.find(Boolean) || '',
    message: possibleFieldErrors.message?.find(Boolean) || '',
  };
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'Failed to send';
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const clearFieldError = (field: keyof FormState) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const nextFieldErrors = extractFieldErrors(data.error);
        if (Object.values(nextFieldErrors).some(Boolean)) {
          setFieldErrors(nextFieldErrors);
          toast.error('Please fix the highlighted fields.');
          return;
        }

        throw new Error(getErrorMessage(data.error));
      }
      toast.success("Message sent successfully! I'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-border-glass rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/60 focus:bg-accent-violet/5 transition-all duration-200 text-sm';

  return (
    <section id='contact' className='py-20 sm:py-24 px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <AnimateOnScroll direction='up'>
          <SectionHeading
            number='06 / Contact'
            title="Let's Talk"
            subtitle="Have a project in mind? Let's build something amazing together."
            centered
          />
        </AnimateOnScroll>

        <div className='grid lg:grid-cols-[0.95fr,1.05fr] gap-10 lg:gap-14 max-w-5xl mx-auto items-start'>
          {/* Info */}
          <AnimateOnScroll direction='left' delay={100}>
            <div className='flex flex-col gap-7 lg:gap-8 h-full'>
              <div>
                <h3 className='text-lg sm:text-xl font-grotesk font-semibold text-text-primary mb-3'>
                  Get In Touch
                </h3>
                <p className='text-sm sm:text-base text-text-muted leading-relaxed max-w-xl'>
                  Whether you have a new project, a question about technology,
                  or just want to say hi — my inbox is always open!
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:gap-4'>
                <div className='flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-border-glass'>
                  <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center flex-shrink-0'>
                    <HiEnvelope className='text-accent-violet text-lg sm:text-xl' />
                  </div>
                  <div>
                    <p className='text-text-muted text-[11px] sm:text-xs mb-0.5'>
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className='text-text-primary font-medium text-sm sm:text-[15px] hover:text-accent-violet transition-colors break-all'
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className='flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-border-glass'>
                  <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0'>
                    <HiMapPin className='text-accent-cyan text-lg sm:text-xl' />
                  </div>
                  <div>
                    <p className='text-text-muted text-[11px] sm:text-xs mb-0.5'>
                      Location
                    </p>
                    <p className='text-text-primary font-medium text-sm sm:text-[15px]'>
                      Bangladesh 🇧🇩
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className='text-text-muted text-sm mb-4 font-medium'>
                  Find me on
                </p>
                <div className='flex flex-wrap gap-3'>
                  {socialLinks.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={label}
                      className='w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.03] border border-border-glass flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 hover:scale-110 transition-all duration-200'
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll direction='right' delay={200}>
            <form
              onSubmit={submit}
              className='flex flex-col gap-3 sm:gap-4 h-full'
            >
              <div className='grid sm:grid-cols-2 gap-3 sm:gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium text-text-muted'>
                    Name *
                  </label>
                  <input
                    className={`${inputClass} ${fieldErrors.name ? 'border-red-400/80 focus:border-red-300' : ''}`}
                    type='text'
                    name='name'
                    placeholder='John Doe'
                    value={form.name}
                    onChange={(e) => {
                      clearFieldError('name');
                      change(e);
                    }}
                    required
                  />
                  {fieldErrors.name ? (
                    <p className='text-xs text-red-300 mt-1'>
                      {fieldErrors.name}
                    </p>
                  ) : null}
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium text-text-muted'>
                    Email *
                  </label>
                  <input
                    className={`${inputClass} ${fieldErrors.email ? 'border-red-400/80 focus:border-red-300' : ''}`}
                    type='email'
                    name='email'
                    placeholder='john@example.com'
                    value={form.email}
                    onChange={(e) => {
                      clearFieldError('email');
                      change(e);
                    }}
                    required
                  />
                  {fieldErrors.email ? (
                    <p className='text-xs text-red-300 mt-1'>
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium text-text-muted'>
                  Message *
                </label>
                <textarea
                  className={`${inputClass} resize-none ${fieldErrors.message ? 'border-red-400/80 focus:border-red-300' : ''}`}
                  name='message'
                  placeholder='Tell me about your project...'
                  rows={6}
                  value={form.message}
                  onChange={(e) => {
                    clearFieldError('message');
                    change(e);
                  }}
                  required
                />
                {fieldErrors.message ? (
                  <p className='text-xs text-red-300 mt-1'>
                    {fieldErrors.message}
                  </p>
                ) : null}
              </div>

              <Button
                type='submit'
                size='lg'
                loading={loading}
                className='mt-2 w-full sm:w-auto'
              >
                {loading ? 'Sending...' : 'Send Message ✉️'}
              </Button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
