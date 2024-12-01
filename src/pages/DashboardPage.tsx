import React from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { PortfolioStats } from '../components/dashboard/PortfolioStats';
import { PositionsTable } from '../components/dashboard/PositionsTable';

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <DashboardHeader />
        <PortfolioStats />
        <PositionsTable />
      </div>
    </div>
  );
}