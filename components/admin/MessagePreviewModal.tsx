'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface MessagePreviewModalProps {
  id: string;
  sender: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAtLabel: string;
}

export default function MessagePreviewModal({
  id,
  sender,
  email,
  message,
  isRead,
  createdAtLabel,
}: MessagePreviewModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [markingRead, setMarkingRead] = useState(false);

  const preview = useMemo(() => {
    if (message.length <= 90) return message;
    return `${message.slice(0, 90)}...`;
  }, [message]);

  const openModal = async () => {
    setOpen(true);

    // Mark as read only when the full message is opened.
    if (isRead) return;

    setMarkingRead(true);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (!res.ok) throw new Error('Failed to mark as read');
      router.refresh();
    } catch {
      toast.error('Failed to update read status');
    } finally {
      setMarkingRead(false);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='w-full text-left rounded-lg border border-border-glass/70 bg-white/[0.02] px-3 py-2 hover:border-accent-violet/35 hover:bg-white/[0.03] transition-colors'
      >
        <p className='text-text-muted text-xs leading-relaxed line-clamp-2'>
          {preview}
        </p>
        <span className='inline-block mt-1.5 text-[11px] text-accent-cyan font-medium'>
          Read full message
        </span>
      </button>

      {open ? (
        <div className='fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-2 sm:p-4'>
          <div
            className='absolute inset-0 bg-black/65 backdrop-blur-sm'
            onClick={() => (markingRead ? null : setOpen(false))}
          />
          <div className='relative w-full max-w-2xl max-h-[88vh] sm:max-h-[85vh] rounded-2xl border border-border-glass bg-[#0b1f38] p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col'>
            <div className='flex flex-wrap items-start justify-between gap-3 shrink-0'>
              <div className='min-w-0'>
                <h3 className='text-lg sm:text-xl font-grotesk font-semibold text-text-primary'>
                  Message from {sender}
                </h3>
                <p className='text-text-muted text-sm mt-1 break-all'>
                  {email}
                </p>
                <p className='text-text-muted text-xs mt-1'>{createdAtLabel}</p>
              </div>
              {!isRead ? (
                <span className='inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full border bg-accent-cyan/14 text-accent-cyan border-accent-cyan/35'>
                  {markingRead ? 'Marking as read...' : 'Unread'}
                </span>
              ) : (
                <span className='inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full border bg-accent-violet/12 text-text-primary border-accent-violet/35'>
                  Read
                </span>
              )}
            </div>

            <div className='mt-4 sm:mt-5 rounded-xl border border-border-glass bg-white/[0.02] p-3 sm:p-4 overflow-y-auto overflow-x-hidden min-h-0'>
              <p className='text-sm leading-relaxed text-text-primary whitespace-pre-wrap [overflow-wrap:anywhere]'>
                {message}
              </p>
            </div>

            <div className='mt-4 sm:mt-5 flex justify-end shrink-0'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='w-full sm:w-auto px-4 py-2 rounded-lg text-sm border border-border-glass text-text-muted hover:text-text-primary'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
