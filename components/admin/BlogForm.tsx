'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { slugify } from '@/lib/utils';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
});

interface BlogFormProps {
  initialData?: {
    _id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    tags?: string[];
    coverImage?: string;
    published?: boolean;
  };
  mode: 'create' | 'edit';
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    tags: initialData?.tags?.join(', ') || '',
    coverImage: initialData?.coverImage || '',
    published: initialData?.published ?? false,
  });

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (mode === 'create' && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(form.title) }));
    }
  }, [form.title, mode]);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggle = (name: string, value: boolean) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const url =
        mode === 'edit' ? `/api/blogs/${initialData?._id}` : '/api/blogs';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data.error));

      toast.success(mode === 'create' ? 'Blog created!' : 'Blog updated!');
      router.push('/admin/dashboard/blogs');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-border-glass rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/60 transition-all duration-200 text-sm';

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      {/* Title */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>Title *</label>
        <input
          className={inputClass}
          name='title'
          placeholder='My Amazing Blog Post'
          value={form.title}
          onChange={change}
          required
        />
      </div>

      {/* Slug */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>Slug *</label>
        <input
          className={inputClass}
          name='slug'
          placeholder='my-amazing-blog-post'
          value={form.slug}
          onChange={change}
          required
        />
        <p className='text-xs text-text-muted/60'>
          URL: /blog/
          <span className='text-accent-cyan'>{form.slug || 'slug'}</span>
        </p>
      </div>

      {/* Excerpt */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>Excerpt *</label>
        <textarea
          className={`${inputClass} resize-none`}
          name='excerpt'
          placeholder='A brief summary of this post...'
          value={form.excerpt}
          onChange={change}
          rows={3}
          required
        />
      </div>

      {/* Cover Image */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>
          Cover Image URL
        </label>
        <input
          className={inputClass}
          name='coverImage'
          placeholder='https://...'
          value={form.coverImage}
          onChange={change}
          type='url'
        />
      </div>

      {/* Tags */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>
          Tags * (comma separated)
        </label>
        <input
          className={inputClass}
          name='tags'
          placeholder='React, Next.js, TypeScript'
          value={form.tags}
          onChange={change}
          required
        />
      </div>

      {/* Content */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-text-muted'>Content *</label>
        <RichTextEditor
          content={form.content}
          onChange={(c) => setForm((prev) => ({ ...prev, content: c }))}
        />
      </div>

      {/* Published toggle */}
      <div className='flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-border-glass'>
        <button
          type='button'
          onClick={() => toggle('published', !form.published)}
          role='switch'
          aria-checked={form.published}
          aria-label='Toggle blog publish status'
          className={`relative h-7 w-14 rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
            form.published
              ? 'bg-accent-violet border-accent-violet/80'
              : 'bg-white/10 border-border-glass'
          }`}
        >
          <span
            className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${
              form.published ? 'left-8' : 'left-1'
            }`}
          />
        </button>
        <div>
          <p className='text-text-primary text-sm font-medium'>
            {form.published ? 'Published' : 'Draft'}
          </p>
          <p className='text-text-muted text-xs'>
            {form.published
              ? 'Post is public and visible to visitors'
              : 'Post is hidden from public view'}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-4 pt-2'>
        <Button type='submit' size='lg' loading={loading}>
          {mode === 'create'
            ? form.published
              ? 'Publish Post'
              : 'Save Draft'
            : form.published
              ? 'Update & Publish'
              : 'Save as Draft'}
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='lg'
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
