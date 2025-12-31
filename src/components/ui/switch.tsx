'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onCheckedChange, label, disabled, className = '' }: SwitchProps) {
  return (
    <div className={`flex items-center gap-3 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`
          relative w-11 h-6 shrink-0 cursor-pointer
          transition-colors duration-200 ease-in-out
          border border-transparent rounded-none
          ${checked ? 'bg-primary' : 'bg-secondary/10 hover:bg-secondary/15'}
        `}
      >
        <span className="sr-only">Use setting</span>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          animate={{ x: checked ? 18 : 0 }}
          className={`
            pointer-events-none absolute top-1 left-1 block h-4 w-4 
            bg-white shadow-none ring-0 rounded-none
          `}
        />
      </button>
      
      {label && (
        <span 
          onClick={() => !disabled && onCheckedChange(!checked)}
          className="text-sm font-medium text-neutral-900 cursor-pointer select-none"
        >
          {label}
        </span>
      )}
    </div>
  );
}