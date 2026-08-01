'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, ArrowLeft, QrCode, DollarSign, TrendingUp, CheckCircle, RefreshCw } from 'lucide-react';

export default function BusinessDashboard() {
  const [todayRevenue, setTodayRevenue] = useState(3420.00);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 'tx-1', item: 'Koffie & Spyskaart Spandeer', amount: 120.00, time: '10 min gelede', status: 'Voltooi' },
    { id: 'tx-2', item: 'Vars Produkte Aankoop', amount: 450.00, time: '35 min gelede', status: 'Voltooi' },
  ]);
  const [qrAmount, setQrAmount] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [simulatedPaymentSuccess, setSimulatedPaymentSuccess] = useState(false);

  // Generate dynamic payment QR
  const handleGenerateQR = (e) => {
    e.preventDefault();
    if (parseFloat(qrAmount) > 0) {
      setShowQrModal(true);
    }
  };

  // Simulate customer scanning and paying POS QR
  const handleSimulateCustomerPayment = () => {
    const amount = parseFloat(qrAmount);
    setTodayRevenue(todayRevenue + amount);
    setRecentTransactions([
      {
        id: `tx-${Date.now()}`,
        item: 'Snel POS Skandering',
        amount: amount,
        time: 'Nou net',
        status: 'Voltooi'
      },
      ...recentTransactions
    ]);
    setShowQrModal(false);
    setQrAmount('');
    setSimulatedPaymentSuccess(true);
    setTimeout(() => setSimulatedPaymentSuccess(false), 3500);
  };

  return (
    <main className="flex-1 flex flex-col p-5 relative pb-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff]">
          Handelaar / POS Modus
        </span>
      </div>

      {/* POS Revenue Overview Card */}
      <div className="glass-card rounded-2xl p-5 border border-[#00e5ff]/30 relative overflow-hidden mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-400">Daaglikse Omset (POS)</p>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              R{todayRevenue.toFixed(2)} <span className="text-xs text-[#00e5ff] font-mono">XCHEF-P</span>
            </h2>
          </div>
          <div className="p-2.5 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff]">
            <Store className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 text-xs text-[#00ff9d]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.5% teenoor gister</span>
        </div>
      </div>

      {/* Dynamic QR Payment Terminal Generator */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 mb-6">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <QrCode className="w-4 h-4 text-[#00e5ff]" />
          <span>Skep Betalings-QR (POS Terminal)</span>
        </h3>

        <form onSubmit={handleGenerateQR} className="space-y-3">
          <div>
            <label className="text-[10px] text-gray-400 block mb-1">Voer Bedrag in (ZAR / XCHEF-P)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-gray-400">R</span>
              <input
                type="number"
                value={qrAmount}
                onChange={(e) => setQrAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-7 pr-3 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#00e5ff] text-black font-bold text-xs hover:bg-[#00ff9d] transition-all flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Genereer Betalings QR</span>
          </button>
        </form>
      </div>

      {/* Live Transaction Feed */}
      <div className="glass-panel rounded-2xl p-4">
        <h4 className="text-xs font-bold text-white mb-3 flex items-center justify-between">
          <span>Intydse Transaksies</span>
          <span className="text-[10px] text-gray-400 font-mono">Live Sync</span>
        </h4>

        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#00ff9d]/10 text-[#00ff9d]">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{tx.item}</p>
                  <p className="text-[10px] text-gray-400">{tx.time}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00ff9d]">+R{tx.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal Simulation */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-2xl p-6 text-center border border-[#00e5ff] max-w-xs w-full">
            <h3 className="text-base font-bold text-white mb-1">Skandeer om te Betaal</h3>
            <p className="text-xs text-[#00e5ff] font-bold font-mono mb-4">R{parseFloat(qrAmount).toFixed(2)} XCHEF-P</p>

            {/* Mock Visual QR Code */}
            <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center border-4 border-[#00e5ff]/50 mb-4 shadow-lg">
              <div className="w-full h-full bg-black rounded-lg flex flex-col items-center justify-center p-2 text-center">
                <QrCode className="w-20 h-20 text-[#00e5ff] animate-pulse" />
                <span className="text-[8px] font-mono text-gray-400 mt-1">XCHEF-PAY-SECURE-TERMINAL</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mb-4">
              Vra die klant om hierdie QR met hul Verbruiker-app te skandeer.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSimulateCustomerPayment}
                className="w-full py-2.5 rounded-xl bg-[#00ff9d] text-black font-bold text-xs hover:bg-[#00e5ff] transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simuleer Klant se Betaling</span>
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 rounded-xl bg-white/5 text-gray-400 text-xs font-bold"
              >
                Kanselleer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {simulatedPaymentSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-2xl p-6 text-center border border-[#00ff9d] max-w-xs w-full">
            <CheckCircle className="w-12 h-12 text-[#00ff9d] mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">Betaling Ontvang!</h3>
            <p className="text-xs text-gray-300 mt-1">
              Die fondse is intyds by jou daaglikse POS omset gevoeg.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}