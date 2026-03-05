import {
  RiMapPinFill,
  RiMailLine,
  RiLockLine,
  RiEye2Line,
  RiEyeOffLine,
} from '@remixicon/react';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer } from '../components/ui/Toast';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: 'success' | 'error' }>
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    clearError();

    try {
      await login(data.email, data.password);
      addToast('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch {
      addToast('Invalid email or password', 'error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
      />
      <div className='flex-1 flex flex-col max-w-md mx-auto w-full px-6 pt-12 pb-8'>
        <div className='flex flex-col items-center mb-10'>
          <div className='w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-4 border border-primary/30'>
            <RiMapPinFill className='text-primary text-4xl' />
          </div>
          <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100'>
            {' '}
            Geo<span className='text-primary'>Link</span>
          </h1>
          <p className='text-slate-500 dark:text-slate-400 mt-2 text-center text-sm'>
            Discover your geolocation thought you IP
          </p>
        </div>

        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-white leading-tight tracking-tight'>
            Welcome Back
          </h2>
          <p className='text-slate-500 dark:text-slate-400 mt-1'>
            Please enter your credentials to continue
          </p>
        </div>

        <form
          className='space-y-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-white tracking-wide ml-1'>
              Email Address
            </label>
            <div className='relative'>
              <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl'>
                <RiMailLine />
              </span>
              <input
                className='w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-slate-100'
                placeholder='name@company.com'
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className='text-red-400 text-xs mt-1 ml-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between items-center ml-1'>
              <label className='text-sm text-white font-semibold tracking-wide'>
                Password
              </label>
            </div>
            <div className='relative'>
              <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl'>
                <RiLockLine />
              </span>
              <input
                className='w-full pl-12 pr-12 py-4 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-slate-100'
                placeholder='••••••••'
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors'
                type='button'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <RiEyeOffLine className='text-xl' />
                ) : (
                  <RiEye2Line className='text-xl' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-400 text-xs mt-1 ml-1'>
                {errors.password.message}
              </p>
            )}
            <div className='flex justify-end'>
              <a
                className='text-xs font-bold text-primary hover:underline mt-1'
                href='#'
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div className='pt-4'>
            <button
              className='w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Log In'}
            </button>
          </div>
        </form>

        <p className='mt-auto text-center text-sm text-slate-500 dark:text-slate-400 pt-8'>
          Don't have an account?
          <a
            className='text-primary font-bold hover:underline ml-1 cursor-pointer'
            onClick={() => navigate('/home')}
          >
            Go to Home
          </a>
        </p>
      </div>
    </>
  );
}
