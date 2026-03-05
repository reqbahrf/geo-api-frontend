import { RiSettings2Fill, RiMapPinFill, RiSearchLine } from '@remixicon/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header className='flex items-center justify-between p-4 border-b border-primary/10 bg-background-light dark:bg-background-dark/5 sticky top-0 z-50'>
        <div className='flex items-center gap-2'>
          <div className='bg-primary/20 p-2 rounded-lg'>
            <RiMapPinFill className='material-symbols-outlined text-primary' />
          </div>
          <h1 className='text-xl font-extrabold tracking-tight dark:text-slate-100'>
            Geo<span className='text-primary'>Link</span>
          </h1>
        </div>
        <Link
          to='/login'
          className='p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-500 dark:text-slate-400'
        >
          <RiSettings2Fill />
        </Link>
      </header>
      <section className='p-4 space-y-4'>
        <div className='relative group'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <RiSearchLine className=' text-slate-400 group-focus-within:text-primary transition-colors' />
          </div>
          <input
            className='block w-full pl-10 pr-24 py-4 bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
            placeholder='Search any IP address...'
            type='text'
            value='256.0.0.1'
          />
          <div className='absolute inset-y-0 right-2 flex items-center gap-1'>
            <button className='px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors'>
              Clear
            </button>
            <button className='bg-primary hover:bg-primary/90 text-background-dark px-4 py-2 rounded-lg font-bold text-sm transition-transform active:scale-95'>
              Go
            </button>
          </div>
        </div>

        <div className='flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-pulse'>
          <span className='material-symbols-outlined text-[18px]'>error</span>
          <p className='font-medium'>
            Invalid IP address format. Please check and try again.
          </p>
        </div>
      </section>
      <section className='px-4 py-2'>
        <div className='bg-linear-to-br from-slate-100 to-white dark:from-primary/10 dark:to-background-dark border border-slate-200 dark:border-primary/20 rounded-2xl overflow-hidden shadow-xl'>
          <div className='p-6 space-y-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-xs font-bold text-primary uppercase tracking-[0.2em]'>
                  Current IP
                </p>
                <h2 className='text-3xl font-black dark:text-slate-100 mt-1'>
                  157.240.22.35
                </h2>
              </div>
              <button className='p-2 bg-slate-200 dark:bg-primary/20 rounded-lg text-primary'>
                <span className='material-symbols-outlined'>share</span>
              </button>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  City
                </p>
                <p className='font-bold text-slate-800 dark:text-slate-200'>
                  Menlo Park
                </p>
              </div>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  Region
                </p>
                <p className='font-bold text-slate-800 dark:text-slate-200'>
                  California
                </p>
              </div>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  Country
                </p>
                <div className='flex items-center gap-2'>
                  <span className='material-symbols-outlined text-[14px] text-primary'>
                    flag
                  </span>
                  <p className='font-bold text-slate-800 dark:text-slate-200'>
                    United States
                  </p>
                </div>
              </div>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  Coordinates
                </p>
                <p className='font-bold text-slate-800 dark:text-slate-200'>
                  37.45, -122.14
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='px-4 py-8'>
        <div className='flex items-center justify-between mb-4 px-2'>
          <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>
            Search History
          </h3>
          <button className='text-xs font-semibold text-primary hover:underline'>
            Clear All
          </button>
        </div>
        <div className='space-y-2'></div>
      </section>
    </>
  );
}
