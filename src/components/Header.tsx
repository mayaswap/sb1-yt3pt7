import React from 'react';
import { Wallet } from 'lucide-react';
import { formatAddress, formatBalance, cn } from '../lib/utils';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

interface HeaderProps {
  account: string | null;
  balance: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function Header({ account, balance, isConnecting, onConnect, onDisconnect }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex-none">
          <Logo />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <Navigation />
        </div>

        <div className="flex-none flex items-center space-x-4">
          {account ? (
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm text-gray-400">Balance</p>
                <p className="font-medium text-white">{formatBalance(balance)} PLS</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-gray-200">
                  {formatAddress(account)}
                </p>
                <button
                  onClick={onDisconnect}
                  className="text-sm text-accent-pink-400 hover:text-accent-pink-300"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-lg",
                "bg-gradient-to-r from-primary-500 to-primary-400",
                "text-white font-medium",
                "hover:from-primary-400 hover:to-primary-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200 shadow-lg shadow-primary-500/20"
              )}
            >
              <Wallet className="h-5 w-5 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}