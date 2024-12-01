import React, { useState, useMemo } from 'react';
import { SearchBar } from '../SearchBar';
import { PoolList } from './PoolList';
import { PoolListHeader } from './PoolListHeader';
import { Pagination } from '../ui/Pagination';
import { VolumeMetricsOverview } from '../metrics/VolumeMetricsOverview';
import { usePoolsData } from '../../hooks/usePoolsData';
import { SortField, SortDirection } from '../../types/sorting';
import { Pool } from '../../types/pool';
import { getSortableValue } from '../../lib/utils';

const ITEMS_PER_PAGE = 10;

export function PoolsOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: 'tvl',
    direction: 'desc'
  });
  
  const { pools, totalPages, loading, error } = usePoolsData(currentPage, ITEMS_PER_PAGE);
  
  const filteredAndSortedPools = useMemo(() => {
    if (!pools.length) return [];
    
    let result = [...pools];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(pool => 
        pool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.field) {
      result.sort((a: Pool, b: Pool) => {
        // Special handling for name field
        if (sortConfig.field === 'name') {
          const compareResult = a.name.localeCompare(b.name);
          return sortConfig.direction === 'asc' ? compareResult : -compareResult;
        }

        // Get numeric values for comparison
        const aValue = getSortableValue(a[sortConfig.field]);
        const bValue = getSortableValue(b[sortConfig.field]);

        // Handle equal values
        if (aValue === bValue) {
          // Secondary sort by TVL when values are equal
          const aTvl = getSortableValue(a.tvl);
          const bTvl = getSortableValue(b.tvl);
          return sortConfig.direction === 'asc' ? aTvl - bTvl : bTvl - aTvl;
        }

        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    return result;
  }, [pools, searchQuery, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-gray-400">Error loading pools data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <VolumeMetricsOverview />
      
      <div className="w-[400px]">
        <SearchBar 
          value={searchQuery} 
          onChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }} 
        />
      </div>
      
      <div className="bg-surface rounded-xl overflow-hidden border border-border shadow-xl shadow-black/20">
        <PoolListHeader 
          sortField={sortConfig.field}
          sortDirection={sortConfig.direction}
          onSort={handleSort}
        />
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
          </div>
        ) : (
          <>
            <PoolList pools={filteredAndSortedPools} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}