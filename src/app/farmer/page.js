'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, ArrowLeft, PlusCircle, ArrowUpRight, TrendingUp, CheckCircle2, Shield } from 'lucide-react';

export default function FarmerDashboard() {
  const [agriBalance, setAgriBalance] = useState(12500.00); // Farm Treasury
  const [personalBalance, setPersonalBalance] = useState(1500.00); // Personal Wallet
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Transfer funds from Agri Wallet to Personal Wallet
  const handleTransfer = (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (amount > 0 && agriBalance >= amount) {
      setAgriBalance(agriBalance - amount);
      setPersonalBalance(personalBalance + amount);
      setShowTransferModal(false);
      setTransferAmount('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <main className="flex-1 flex flex-col p-5 relative pb-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/30 text-[#ffb703]">
          Boer / Produsent Modus
        </span>
      </div>

      {/* Dual Wallet Display */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Agri Treasury Wallet */}
        <div className="glass-card rounded-2xl p-5 border border-[#ffb703]/30 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-400">Plaas Landbou-Beursie (Treasury)</p>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                R{agriBalance.toFixed(2)} <span className="text-xs text-[#ffb703] font-mono">XCHEF-P</span>
              </h2>
            </div>
            <div className="p-2.5 rounded-xl bg-[#ffb703]/10 text-[#ffb703]">
              <Sprout className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[10px] text-gray-400">Belasting-geöptimaliseerde beskermde fonds vir insetkoste & voorraad.</p>
          
          <button
            onClick={() => setShowTransferModal(true)}
            className="mt-4 w-full py-2 rounded-xl bg-[#ffb703]/10 border border-[#ffb703]/30 text-[#ffb703] text-xs font-bold hover:bg-[#ffb703] hover:text-black transition-all flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Oordrag na Persoonlike Beursie</span>
          </button>
        </div>

        {/* Personal Wallet */}
        <div className="glass-panel rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-[11px] text-gray-400">Persoonlike Beursie</p>
            <p className="text-lg font-bold text-white">
              R{personalBalance.toFixed(2)} <span className="text-xs text-[#00ff9d] font-mono">XCHEF-P</span>
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-gray-400 flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#00ff9d]" /> Vrygestel vir Verbruik
          </span>
        </div>
      </div>

      {/* Crop Supply & Quick Actions */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#ffb703]" /> Oes & Mark-Verskaffing
          </h3>
          <button className="p-1.5 rounded-lg bg-[#ffb703] text-black font-bold text-xs flex items-center gap-1 hover:bg-[#ff8800]">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Lys Oes</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
            <div>
              <p className="font-bold text-white">Organiese Tamaties (Batch #88)</p>
              <p className="text-[10px] text-gray-400">500 kg beskikbaar op Marketplace</p>
            </div>
            <span className="text-xs font-bold text-[#00ff9d]">R45.00 / 5kg</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
            <div>
              <p className="font-bold text-white">Vars Aartappels (Batch #12)</p>
              <p className="text-[10px] text-gray-400">200 kg in voorraad</p>
            </div>
            <span className="text-xs font-bold text-[#00ff9d]">R60.00 / 10kg</span>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-2xl p-6 border border-[#ffb703] max-w-xs w-full">
            <h3 className="text-base font-bold text-white mb-2">Beursie-Oordrag</h3>
            <p className="text-xs text-gray-400 mb-4">
              Skuif fondse vanaf jou Plaas Beursie na jou Persoonlike Beursie.
            </p>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Bedrag in XCHEF-P</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="bv. 500"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#ffb703]"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 py-2 rounded-xl bg-white/5 text-xs text-gray-300 font-bold"
                >
                  Kanselleer
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#ffb703] text-black text-xs font-bold hover:bg-[#ff8800]"
                >
                  Bevestig
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-xl px-4 py-3 border border-[#00ff9d] text-xs text-white flex items-center gap-2 shadow-xl z-50">
          <CheckCircle2 className="w-4 h-4 text-[#00ff9d]" />
          <span>Oordrag na Persoonlike Beursie suksesvol!</span>
        </div>
      )}
    </main>
  );
}