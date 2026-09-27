export interface DevCardItem {
  _id: string;
  key: string;
  value: string;
  valueType: 'string' | 'raw';
}

export default function DevCard({ items }: { items: DevCardItem[] }) {
  return (
    <div className='hidden lg:block flex-shrink-0 animate-float'>
      <div className='relative'>
        <div className='absolute -inset-4 bg-gradient-to-r from-accent-violet/20 to-accent-cyan/20 rounded-3xl blur-xl' />
        <div className='relative bg-surface border border-border-glass rounded-2xl p-6 font-mono text-sm leading-7 min-w-[260px] shadow-2xl'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='w-3 h-3 rounded-full bg-accent-violet/70' />
            <div className='w-3 h-3 rounded-full bg-accent-cyan/70' />
            <div className='w-3 h-3 rounded-full bg-text-primary/70' />
            <span className='text-text-muted text-xs ml-2'>developer.ts</span>
          </div>
          <div className='text-text-muted'>
            <span className='text-accent-violet'>const</span>{' '}
            <span className='text-accent-cyan'>dev</span>{' '}
            <span className='text-text-primary'>= {'{'}</span>
          </div>
          {items.map((item) => (
            <div className='ml-4' key={item._id}>
              <span className='text-accent-violet'>{item.key}</span>
              <span className='text-text-primary'>: </span>
              {item.valueType === 'string' ? (
                <span className='text-accent-cyan'>&apos;{item.value}&apos;</span>
              ) : (
                <span className='text-orange-400'>{item.value}</span>
              )}
              <span className='text-text-primary'>,</span>
            </div>
          ))}
          <div className='text-text-primary'>{'}'}</div>
        </div>
      </div>
    </div>
  );
}
