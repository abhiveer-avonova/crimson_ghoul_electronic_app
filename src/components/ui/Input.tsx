import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full py-2.5 rounded-xl bg-slate-900 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all ${
              icon ? 'pl-11 pr-4' : 'px-4'
            } ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-slate-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

