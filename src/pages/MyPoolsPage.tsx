import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useMyPools } from '../hooks/useMyPools';
import { PositionList } from '../components/pools/PositionList';
import { SearchBar } from '../components/SearchBar';
import { Wallet, Search } from 'lucide-react';

export function MyPoolsPage() {
  const { account, connectWallet } = useWallet();
  const [searchAddress, setSearchAddress] = useState('');
  const [addressToCheck, setAddressToCheck] = useState<string | null>(null);
  const { positions, loading } = useMyPools(addressToCheck || account);

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress) {
      setAddressToCheck(searchAddress);
    }
  };

  if (!account && !addressToCheck) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[400px] bg-surface rounded-xl border border-border">
            <Wallet className="w-12 h-12 text-gray-600 mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">No Wallet Connected</h2>
            <p className="text-gray-400 mb-6">Connect wallet or search by address</p>
            
            <div className="w-full max-w-md space-y-4">
              <form onSubmit={handleAddressSearch} className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    placeholder="Enter wallet address"
                    className="w-full h-10 pl-9 pr-4 bg-surface-hover text-sm text-gray-200 rounded-lg 
                             border border-border focus:outline-none focus:border-primary-400/50 
                             focus:ring-1 focus:ring-primary-400/50 placeholder-gray-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-400 
                           transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!searchAddress}
                >
                  Search
                </button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-gray-500 bg-background">Or</span>
                </div>
              </div>

              <button
                onClick={connectWallet}
                className="w-full px-6 py-2 bg-surface-hover text-white rounded-lg 
                         hover:bg-surface transition-colors duration-200 border border-border"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {addressToCheck ? 'Wallet Positions' : 'My Positions'}
          </h1>
          <div className="w-[400px]">
            <form onSubmit={handleAddressSearch} className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="Search by wallet address"
                  className="w-full h-10 px-4 bg-surface text-sm text-gray-200 rounded-lg 
                           border border-border focus:outline-none focus:border-primary-400/50 
                           focus:ring-1 focus:ring-primary-400/50 placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-400 
                         transition-colors duration-200 text-sm"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="bg-surface rounded-xl overflow-hidden border border-border shadow-xl shadow-black/20">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
            </div>
          ) : positions.length > 0 ? (
            <PositionList positions={positions} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Wallet className="w-8 h-8 text-gray-600 mb-3" />
              <p className="text-gray-400 mb-2">No Active Positions</p>
              <p className="text-sm text-gray-500">
                {addressToCheck ? 'This wallet has no active liquidity positions' : "You don't have any active liquidity positions"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}