export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 dark:bg-slate-950">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
        </div>
        <p className="text-slate-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
