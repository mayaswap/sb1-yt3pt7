import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
      <div className="w-24"> {/* Spacer */}</div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-lg",
            "text-gray-500 hover:text-gray-400",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {pages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 text-sm rounded-lg text-gray-400 hover:text-gray-300"
            >
              1
            </button>
            {pages[0] > 2 && (
              <span className="text-gray-600">...</span>
            )}
          </>
        )}

        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-3 py-2 text-sm rounded-lg",
              currentPage === page
                ? "bg-primary-500 text-white"
                : "text-gray-400 hover:text-gray-300"
            )}
          >
            {page}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="text-gray-600">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 text-sm rounded-lg text-gray-400 hover:text-gray-300"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-lg",
            "text-gray-500 hover:text-gray-400",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="w-24 text-right text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}