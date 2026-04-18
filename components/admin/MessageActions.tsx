'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { HiTrash } from 'react-icons/hi2';

interface MessageActionsProps {
  id: string;
  sender: string;
}

export default function MessageActions({ id, sender }: MessageActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Message deleted');
      setConfirmOpen(false);
      router.refresh();
    } catch {
      toast.error('Failed to delete message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          disabled={loading}
          onClick={() => setConfirmOpen(true)}
          className='p-2 rounded-lg text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/12 transition-all disabled:opacity-50'
          title='Delete message'
        >
          <HiTrash size={16} />
        </button>
      </div>

      {confirmOpen ? (
        <div className='fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-2 sm:p-4'>
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={() => (loading ? null : setConfirmOpen(false))}
          />
          <div className='relative w-full max-w-md rounded-2xl border border-border-glass bg-[#0b1f38] p-4 sm:p-6 shadow-2xl'>
            <h3 className='text-base sm:text-lg font-grotesk font-semibold text-text-primary'>
              Delete Message
            </h3>
            <p className='mt-2 text-sm text-text-muted leading-relaxed'>
              Are you sure you want to delete the message from{' '}
              <span className='text-text-primary font-medium'>{sender}</span>?
              This action cannot be undone.
            </p>
            <div className='mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3'>
              <button
                type='button'
                onClick={() => setConfirmOpen(false)}
                disabled={loading}
                className='w-full sm:w-auto px-4 py-2 rounded-lg text-sm border border-border-glass text-text-muted hover:text-text-primary disabled:opacity-60'
              >
                Cancel
              </button>
              <Button
                type='button'
                size='sm'
                loading={loading}
                onClick={deleteMessage}
                className='w-full sm:w-auto'
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
