'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins, PieChart, RefreshCw, Layers, ShieldAlert, Cpu } from 'lucide-react';

export default function TreasuryDashboard() {
  const [totalCirculatingP, setTotalCirculatingP] = useState(150000);
  const [totalStakedE, setTotalStakedE] = useState(42000);
  const [protocolFeesCollected, setProtocolFeesCollected] = useState(3120.50);
  const [treasuryReserve, setTreasuryReserve] = useState(850000);

  // Simulate Treasury Injection / Fee Flow
  const handleSimulateCycle = () => {
    setProtocolFeesCollected(prev => prev + 150.00);
    setTotalCirculatingP(prev => prev + 500);
    setTreasuryReserve(prev => prev + 100);
  };

  return (
    <main className="flex-1 flex flex-col p-5 relative pb-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#7b2cbf]/20 border border-[#7b2cbf]/50 text-[#c77dff]">
          Protocol Treasury & Engine
        </span>
      </div>

      {/* Hero Overview */}
      <div className="glass-card rounded-2xl p-5 border border-[#7b2cbf]/40 relative overflow-hidden mb-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs text-gray-400">Protocol Reserve (Treasury Pool)</p>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              R{treasuryReserve.toLocaleString()} <span className="text-xs text-[#c77dff] font-mono">ZAR Pegged</span>
            </h2>
          </div>
          <div className="p-2.5 rounded-xl bg-[#7b2cbf]/20 text-[#c77dff]">
            <Coins className="w-6 h-6" />
          </div>
        </div>
        <p className="text-[11px] text-gray-400">
          Real-time liquidity support for the XCHEF Dual-Token Ecosystem.
        </p>
      </div>

      {/* Dual Token Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-panel rounded-xl p-4 border border-[#00ff9d]/20">
          <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-1">
            <Layers className="w-3 h-3 text-[#00ff9d]" /> XCHEF-P Circulation
          </p>
          <p className="text-lg font-bold text-white font-mono">
            {totalCirculatingP.toLocaleString()}
          </p>
          <span className="text-[9px] text-[#00ff9d]">Utility Token (Payment)</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-[#ffb703]/20">
          <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-1">
            <PieChart className="w-3 h-3 text-[#ffb703]" /> XCHEF-E Staked
          </p>
          <p className="text-lg font-bold text-white font-mono">
            {totalStakedE.toLocaleString()}
          </p>
          <span className="text-[9px] text-[#ffb703]">Equity & Governance</span>
        </div>
      </div>

      {/* Protocol Fee Vault */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#00e5ff]" /> Accumulated Protocol Fees
          </span>
          <span className="text-xs font-bold text-[#00e5ff] font-mono">
            R{protocolFeesCollected.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 my-3 overflow-hidden">
          <div className="bg-gradient-to-r from-[#00e5ff] to-[#7b2cbf] h-full w-[65%]" />
        </div>
        <p className="text-[10px] text-gray-400">
          Revenue generated from the 2% Consumer fee and POS settlements.
        </p>
      </div>

      {/* Simulation Controller */}
      <div className="glass-card rounded-2xl p-4 border border-[#00ff9d]/30 text-center">
        <h4 className="text-xs font-bold text-white mb-1 flex items-center justify-center gap-2">
          <Cpu className="w-4 h-4 text-[#00ff9d]" /> Stress-Test Simulator
        </h4>
        <p className="text-[10px] text-gray-400 mb-3">
          Simulate 1,000 automated ecosystem transactions within the network.
        </p>
        <button
          onClick={handleSimulateCycle}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00ff9d] to-[#00e5ff] text-black font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Simulate Transaction Cycle</span>
        </button>
      </div>
    </main>
  );
}
