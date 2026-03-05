import { RiHistoryLine } from '@remixicon/react';

export default function HistoryCard({
  ip,
  locationAndDate,
}: {
  ip: string;
  locationAndDate: string;
}) {
  return (
    <div className='flex items-center justify-between p-4 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-xl hover:border-primary/40 transition-colors cursor-pointer group'>
      <div className='flex items-center gap-4'>
        <div className='size-10 rounded-full bg-slate-200 dark:bg-background-dark flex items-center justify-center text-slate-500 dark:text-primary'>
          <RiHistoryLine />
        </div>
        <div>
          <p className='font-bold text-slate-800 dark:text-slate-200'>{ip}</p>
          <p className='text-xs text-slate-500 dark:text-slate-400'>
            {locationAndDate}
          </p>
        </div>
      </div>
    </div>
  );
}
