import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tokens"
        className="w-full h-10 pl-9 pr-4 bg-surface text-sm text-gray-200 rounded-lg border border-border 
                 focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 
                 placeholder-gray-500 transition-all duration-200"
      />
    </div>
  );
}