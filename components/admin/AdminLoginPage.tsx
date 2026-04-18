'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
      return;
    }

    router.push('/admin/dashboard');
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/60 focus:bg-accent-violet/5 transition-all duration-200 text-sm';

  return (
    <div className='min-h-screen flex items-center justify-center px-6 bg-deep relative overflow-hidden'>
      <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-accent-violet blob animate-float-blob opacity-10 pointer-events-none' />
      <div
        className='absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-cyan blob animate-float-blob opacity-10 pointer-events-none'
        style={{ animationDelay: '-6s' }}
      />

      <div className='relative w-full max-w-md'>
        <div className='bg-surface border border-border-glass rounded-3xl p-8 shadow-2xl shadow-black/40'>
          <div className='flex flex-col items-center gap-4 mb-8'>
            <div className='relative w-12 h-12'>
              <Image
                src='/logoW.png'
                fill
                alt='Logo'
                className='object-contain'
              />
            </div>
            <div className='text-center'>
              <h1 className='text-2xl font-grotesk font-bold text-text-primary'>
                Admin Portal
              </h1>
              <p className='text-text-muted text-sm mt-1'>
                Sign in to manage your portfolio
              </p>
            </div>
          </div>

          <form onSubmit={submit} className='flex flex-col gap-4'>
            {error && (
              <div className='px-4 py-3 rounded-xl bg-accent-cyan/12 border border-accent-cyan/30 text-accent-cyan text-sm text-center'>
                {error}
              </div>
            )}

            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-text-muted'>
                Email
              </label>
              <input
                className={inputClass}
                type='email'
                name='email'
                placeholder='admin@example.com'
                value={form.email}
                onChange={change}
                required
                autoComplete='email'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-text-muted'>
                Password
              </label>
              <div className='relative'>
                <input
                  className={`${inputClass} pr-12`}
                  type={showPw ? 'text' : 'password'}
                  name='password'
                  placeholder='********'
                  value={form.password}
                  onChange={change}
                  required
                  autoComplete='current-password'
                />
                <button
                  type='button'
                  onClick={() => setShowPw(!showPw)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1'
                >
                  {showPw ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type='submit'
              size='lg'
              loading={loading}
              className='mt-2 w-full justify-center'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className='text-center text-text-muted text-xs mt-6'>
          Restricted access for portfolio admin only.
        </p>
      </div>
    </div>
  );
}
