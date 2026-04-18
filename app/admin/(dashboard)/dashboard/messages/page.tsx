import type { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import { formatDate } from '@/lib/utils';
import MessageActions from '@/components/admin/MessageActions';
import MessagePreviewModal from '@/components/admin/MessagePreviewModal';

export const metadata: Metadata = { title: 'Messages' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type MessageDoc = {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

async function getMessages(): Promise<MessageDoc[]> {
  try {
    await connectDB();
    const messages = await Message.find({})
      .sort({ isRead: 1, createdAt: -1 })
      .select('name email message isRead createdAt')
      .lean();
    return JSON.parse(JSON.stringify(messages));
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.isRead).length;
  const read = messages.length - unread;

  return (
    <div className='p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-grotesk font-bold text-text-primary'>
            Messages Inbox
          </h1>
          <p className='text-text-muted text-sm mt-1'>
            Read and manage contact messages from your portfolio.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 mb-8'>
        {[
          {
            label: 'Total',
            value: messages.length,
            color: 'text-text-primary',
          },
          { label: 'Unread', value: unread, color: 'text-accent-cyan' },
          { label: 'Read', value: read, color: 'text-accent-violet' },
        ].map((stat) => (
          <div
            key={stat.label}
            className='bg-white/[0.03] border border-border-glass rounded-2xl p-5 text-center'
          >
            <p className={`text-3xl font-grotesk font-black ${stat.color}`}>
              {stat.value}
            </p>
            <p className='text-text-muted text-xs mt-1'>{stat.label}</p>
          </div>
        ))}
      </div>

      {messages.length === 0 ? (
        <div className='text-center py-24 bg-white/[0.02] border border-border-glass rounded-2xl'>
          <div className='text-6xl mb-4'>📭</div>
          <p className='text-text-muted mb-2'>No messages yet.</p>
          <p className='text-text-muted text-sm'>
            New contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className='bg-white/[0.02] border border-border-glass rounded-2xl overflow-hidden'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border-glass'>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4'>
                  Sender
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4 hidden lg:table-cell'>
                  Message
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4 hidden sm:table-cell'>
                  Date
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4'>
                  Status
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((item) => (
                <tr
                  key={item._id}
                  className={`border-b border-border-glass last:border-0 transition-colors ${
                    item.isRead
                      ? 'hover:bg-white/[0.01]'
                      : 'bg-accent-cyan/[0.03] hover:bg-accent-cyan/[0.05]'
                  }`}
                >
                  <td className='px-5 py-4'>
                    <p className='text-text-primary font-medium text-sm line-clamp-1'>
                      {item.name}
                    </p>
                    <p className='text-text-muted text-xs mt-0.5 break-all'>
                      {item.email}
                    </p>
                    <div className='mt-2 lg:hidden'>
                      <MessagePreviewModal
                        id={item._id}
                        sender={item.name}
                        email={item.email}
                        message={item.message}
                        isRead={item.isRead}
                        createdAtLabel={formatDate(item.createdAt)}
                      />
                    </div>
                  </td>
                  <td className='px-5 py-4 hidden lg:table-cell'>
                    <MessagePreviewModal
                      id={item._id}
                      sender={item.name}
                      email={item.email}
                      message={item.message}
                      isRead={item.isRead}
                      createdAtLabel={formatDate(item.createdAt)}
                    />
                  </td>
                  <td className='px-5 py-4 hidden sm:table-cell'>
                    <span className='text-text-muted text-xs'>
                      {formatDate(item.createdAt)}
                    </span>
                  </td>
                  <td className='px-5 py-4'>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                        item.isRead
                          ? 'bg-accent-violet/12 text-text-primary border-accent-violet/35'
                          : 'bg-accent-cyan/14 text-accent-cyan border-accent-cyan/35'
                      }`}
                    >
                      {item.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className='px-5 py-4'>
                    <MessageActions id={item._id} sender={item.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
