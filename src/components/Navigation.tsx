import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center space-x-8">
      <Link
        to="/"
        className={cn(
          "text-sm font-medium text-gray-400 transition-colors hover:text-white",
          isActive('/') && "text-white"
        )}
      >
        Pools
      </Link>
      <Link
        to="/my-pools"
        className={cn(
          "text-sm font-medium text-gray-400 transition-colors hover:text-white",
          isActive('/my-pools') && "text-white"
        )}
      >
        My Pools
      </Link>
      <Link
        to="/dashboard"
        className={cn(
          "text-sm font-medium text-gray-400 transition-colors hover:text-white",
          isActive('/dashboard') && "text-white"
        )}
      >
        Dashboard
      </Link>
    </nav>
  );
}