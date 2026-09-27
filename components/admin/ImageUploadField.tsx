'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaSpinner, FaUpload } from 'react-icons/fa';
import { uploadImageToCloudinary, ImageUploadError } from '@/lib/uploadImage';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  error,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const inputClass = `w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/60 transition-all duration-200 text-sm ${
    error ? 'border-red-400/80 focus:border-red-300' : 'border-border-glass'
  }`;

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
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

  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-text-muted'>{label}</label>

      <div className='flex items-center gap-3'>
        {value ? (
          <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border-glass bg-white/[0.03]'>
            <Image
              src={value}
              alt='Preview'
              fill
              sizes='64px'
              className='object-cover'
            />
          </div>
        ) : null}

        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className='flex items-center gap-2 px-4 py-3 rounded-xl border border-border-glass bg-white/[0.03] text-sm text-text-muted hover:text-text-primary hover:border-accent-violet/60 transition-all duration-200 disabled:opacity-60'
        >
          {uploading ? (
            <FaSpinner className='animate-spin' />
          ) : (
            <FaUpload />
          )}
          {uploading ? 'Uploading...' : value ? 'Replace image' : 'Upload image'}
        </button>

        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          hidden
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>

      <input
        className={inputClass}
        placeholder='Or paste an image URL'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type='url'
      />
      {error ? <p className='text-xs text-red-300'>{error}</p> : null}
    </div>
  );
}
