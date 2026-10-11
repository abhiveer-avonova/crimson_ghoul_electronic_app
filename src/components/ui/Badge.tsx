import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'stock' | 'inStock' | 'lowStock' | 'outOfStock' | 'discount' | 'spec' | 'neutral' | 'featured';
  pulse?: boolean;
}

export function Badge({
  children,
  variant = 'neutral',
  pulse = false,
  className = '',
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5 select-none transition-colors';

  const variants = {
    stock:
      'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60',
    inStock:
      'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60',
    lowStock:
      'bg-amber-950/60 text-amber-400 border border-amber-800/60',
    outOfStock:
      'bg-red-950/60 text-red-400 border border-red-800/60',
    discount:
      'bg-rose-600 text-white font-bold rounded-md px-2 py-0.5 shadow-sm',
    featured:
      'bg-rose-950/60 text-rose-400 border border-rose-800/60 font-semibold',
    spec:
      'font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 rounded-lg px-2 py-0.5',
    neutral:
      'bg-slate-800/80 text-slate-300 border border-slate-700/60',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {(variant === 'stock' || pulse) && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
      )}
      {variant === 'lowStock' && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5" />
      )}
      {children}
    </span>
  );
}

