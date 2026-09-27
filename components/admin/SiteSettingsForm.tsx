'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { FaSpinner, FaUpload, FaFilePdf } from 'react-icons/fa';
import { uploadResumeToCloudinary, ImageUploadError } from '@/lib/uploadImage';

export default function SiteSettingsForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setResumeUrl(data.settings?.resumeUrl || '');
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadResumeToCloudinary(file);
      setResumeUrl(url);
      toast.success('Resume uploaded. Click Save to publish it.');
    } catch (err) {
      toast.error(
        err instanceof ImageUploadError
          ? err.message
          : 'Upload failed. Please try again.',
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeUrl: resumeUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        const message =
          data?.error?.fieldErrors?.resumeUrl?.[0] ||
          data?.error?.formErrors?.[0] ||
          'Failed to save';
        setError(message);
        toast.error(message);
        return;
      }
      toast.success('Resume link updated');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = `w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/60 transition-all duration-200 text-sm ${
    error ? 'border-red-400/80 focus:border-red-300' : 'border-border-glass'
  }`;

  if (loading) {
    return (
      <div className='rounded-2xl border border-border-glass bg-white/[0.02] p-6 animate-pulse'>
        <div className='h-4 w-1/3 rounded bg-white/10' />
        <div className='h-11 w-full rounded-xl bg-white/5 mt-4' />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white/[0.02] border border-border-glass rounded-2xl p-6 space-y-4 max-w-xl'
    >
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>
          Resume Link
        </label>
        <p className='text-xs text-text-muted/70'>
          Used by the &quot;View Resume&quot; and &quot;Hire Me&quot; buttons
          across the site.
        </p>

        <div className='flex items-center gap-3 mt-1'>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 h-16 w-16 shrink-0 justify-center rounded-xl border border-border-glass bg-white/[0.03] text-accent-cyan hover:border-accent-cyan/50'
              title='Open current resume'
            >
              <FaFilePdf size={22} />
            </a>
          ) : null}

          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className='flex items-center gap-2 px-4 py-3 rounded-xl border border-border-glass bg-white/[0.03] text-sm text-text-muted hover:text-text-primary hover:border-accent-violet/60 transition-all duration-200 disabled:opacity-60'
          >
            {uploading ? <FaSpinner className='animate-spin' /> : <FaUpload />}
            {uploading
              ? 'Uploading...'
              : resumeUrl
                ? 'Replace PDF'
                : 'Upload PDF'}
          </button>

          <input
            ref={fileInputRef}
            type='file'
            accept='application/pdf'
            hidden
            onChange={(e) => {
              void handleFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>

        <input
          className={`${inputClass} mt-2`}
          placeholder='Or paste a link (Google Drive, Cloudinary, etc.)'
          value={resumeUrl}
          onChange={(e) => {
            setError('');
            setResumeUrl(e.target.value);
          }}
          type='url'
        />
        {error ? <p className='text-xs text-red-300'>{error}</p> : null}
      </div>

      <Button type='submit' size='md' loading={saving}>
        Save
      </Button>
    </form>
  );
}
