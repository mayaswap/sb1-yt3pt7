import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { SortField, SortDirection } from '../../types/sorting';
import { cn } from '../../lib/utils';

interface PoolListHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function PoolListHeader({ sortField, sortDirection, onSort }: PoolListHeaderProps) {
  const headers = [
    { field: 'name' as SortField, label: 'Token Pair', width: 'w-[300px]', align: 'text-left' },
    { field: 'tvl' as SortField, label: 'TVL', width: '', align: 'text-center' },
    { field: 'volume24h' as SortField, label: '24H VOL', width: '', align: 'text-center' },
    { field: 'fees24h' as SortField, label: '24H FEES', width: '', align: 'text-center' },
    { field: 'feeToTVL' as SortField, label: '24H FEE/TVL', width: '', align: 'text-center' },
  ];

  return (
    <div className="flex items-center h-10 px-6 border-b border-border">
      {headers.map(({ field, label, width, align }) => (
        <div
          key={field}
          className={cn(
            "flex items-center cursor-pointer group",
            field === 'name' ? width : 'flex-1',
            field === 'name' ? 'justify-start' : 'justify-center'
          )}
          onClick={() => onSort(field)}
        >
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-400">
              {label}
            </span>
            <div className={cn("transition-opacity", sortField === field ? "opacity-100" : "opacity-0 group-hover:opacity-50")}>
              {sortDirection === 'asc' ? (
                <ArrowUp className="w-3 h-3 text-primary-400" />
              ) : (
                <ArrowDown className="w-3 h-3 text-primary-400" />
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="w-8" /> {/* Space for chevron */}
    </div>
  );
}