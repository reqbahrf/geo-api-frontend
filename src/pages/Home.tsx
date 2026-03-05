import {
  RiSettings2Fill,
  RiMapPinFill,
  RiSearchLine,
  RiFlagFill,
} from '@remixicon/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { GeoData, SearchHistoryItem } from '../types/geo';
import validator from 'validator';

export default function Home() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [searchInput, setSearchInput] = useState('256.0.0.1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Fetch current IP geo data on component mount
  useEffect(() => {
    fetchCurrentGeo();
  }, []);

  const fetchCurrentGeo = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getCurrentGeo();
      setGeoData(response.data);
    } catch (err: unknown) {
      setError('Failed to fetch current location data');
      console.error('Error fetching current geo:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!validator.isIP(searchInput)) {
      setError('Invalid IP address format. Please check and try again.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getGeoByIP(searchInput);
      const newGeoData = response.data;
      setGeoData(newGeoData);

      // Add to search history
      const historyItem: SearchHistoryItem = {
        id: Date.now().toString(),
        ip: searchInput,
        data: newGeoData,
        timestamp: new Date(),
      };
      setSearchHistory((prev) => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
    } catch (err: unknown) {
      setError('Failed to fetch location data for this IP address');
      console.error('Error searching by IP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setError(null);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const formatCoordinates = (loc?: string) => {
    if (!loc) return 'Unknown';
    return loc;
  };
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isLoading}
          />
          <div className='absolute inset-y-0 right-2 flex items-center gap-1'>
            <button
              className='px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors disabled:opacity-50'
              onClick={handleClearSearch}
              disabled={isLoading}
            >
              Clear
            </button>
            <button
              className='bg-primary hover:bg-primary/90 text-background-dark px-4 py-2 rounded-lg font-bold text-sm transition-transform active:scale-95 disabled:opacity-50'
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Go'}
            </button>
          </div>
        </div>

        {error && (
          <div className='flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm'>
            <span className='material-symbols-outlined text-[18px]'>error</span>
            <p className='font-medium'>{error}</p>
          </div>
        )}
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
                  {isLoading ? 'Loading...' : geoData?.ip || 'Unknown'}
                </h2>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  City
                </p>
                <p className='font-bold text-slate-800 dark:text-slate-200'>
                  {isLoading ? 'Loading...' : geoData?.city || 'Unknown'}
                </p>
              </div>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  Region
                </p>
                <p className='font-bold text-slate-800 dark:text-slate-200'>
                  {isLoading ? 'Loading...' : geoData?.region || 'Unknown'}
                </p>
              </div>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  Country
                </p>
                <div className='flex items-center gap-2'>
                  <RiFlagFill className='text-[14px] text-primary' />
                  <p className='font-bold text-slate-800 dark:text-slate-200'>
                    {isLoading ? 'Loading...' : geoData?.country || 'Unknown'}
                  </p>
                </div>
              </div>
              <div className='space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10'>
                <p className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                  Coordinates
                </p>
                <p className='font-bold text-slate-800 dark:text-slate-200'>
                  {isLoading ? 'Loading...' : formatCoordinates(geoData?.loc)}
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
          <button
            className='text-xs font-semibold text-primary hover:underline'
            onClick={clearHistory}
            disabled={searchHistory.length === 0}
          >
            Clear All
          </button>
        </div>
        <div className='space-y-2'>
          {searchHistory.length === 0 ? (
            <div className='text-center py-8 text-slate-400 dark:text-slate-500 text-sm'>
              No search history yet. Try searching for an IP address!
            </div>
          ) : (
            searchHistory.map((item) => (
              <div
                key={item.id}
                className='bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors cursor-pointer'
                onClick={() => {
                  setSearchInput(item.ip);
                  setGeoData(item.data);
                }}
              >
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='font-mono text-sm font-bold text-slate-800 dark:text-slate-200'>
                      {item.ip}
                    </p>
                    <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                      {item.data.city}, {item.data.region}, {item.data.country}
                    </p>
                  </div>
                  <div className='text-xs text-slate-400 dark:text-slate-500'>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
