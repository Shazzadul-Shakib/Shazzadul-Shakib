'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';

export default function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this post? This cannot be undone.',
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Post deleted');
      router.refresh();
    } catch {
      toast.error('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className='p-2 rounded-lg text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/14 transition-all disabled:opacity-50'
      title='Delete'
    >
      <HiTrash size={15} />
    </button>
  );
}
