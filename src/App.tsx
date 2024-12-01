import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PoolsOverview } from './components/pools/PoolsOverview';
import { PoolDetailsPage } from './pages/PoolDetailsPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyPoolsPage } from './pages/MyPoolsPage';
import { useWallet } from './hooks/useWallet';

function App() {
  const { 
    account, 
    balance, 
    isConnecting, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-white">
        <Header
          account={account}
          balance={balance}
          isConnecting={isConnecting}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />
        
        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-4 py-8">
              <PoolsOverview />
            </main>
          } />
          <Route path="/pool/:id" element={<PoolDetailsPage />} />
          <Route path="/my-pools" element={<MyPoolsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;