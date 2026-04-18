'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';

export default function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Post deleted');
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        className='p-2 rounded-lg text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/14 transition-all disabled:opacity-50'
        title='Delete'
      >
        <HiTrash size={15} />
      </button>

      {open ? (
        <div className='fixed inset-0 z-[90] flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={() => (loading ? null : setOpen(false))}
          />
          <div className='relative w-full max-w-md rounded-2xl border border-border-glass bg-[#0b1f38] p-6 shadow-2xl'>
            <h3 className='text-lg font-grotesk font-semibold text-text-primary'>
              Confirm Delete
            </h3>
            <p className='mt-2 text-sm text-text-muted leading-relaxed'>
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </p>
            <div className='mt-6 flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                disabled={loading}
                className='px-4 py-2 rounded-lg text-sm border border-border-glass text-text-muted hover:text-text-primary disabled:opacity-60'
              >
                Cancel
              </button>
              <Button
                type='button'
                size='sm'
                loading={loading}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
