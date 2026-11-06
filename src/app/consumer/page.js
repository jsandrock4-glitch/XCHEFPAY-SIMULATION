'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wallet, ShoppingBag, ArrowLeft, Send, QrCode, Plus, CheckCircle, Sparkles, X, Camera } from 'lucide-react';
import mockProducts from '../../data/mockProducts.json';

export default function ConsumerDashboard() {
  const [balance, setBalance] = useState(250.00);
  const [rewards, setRewards] = useState(12.50);
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Modals state
  const [showSendModal, setShowSendModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);

  // Send Form state
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  // Scan QR payment simulation state
  const [qrAmount, setQrAmount] = useState('45.00');

  // Add item to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Dynamic fee calculation (2% Consumer Fee, 1% Reward)
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const consumerFee = subtotal * 0.02;
  const totalAmount = subtotal + consumerFee;
  const rewardEarned = subtotal * 0.01;

  // Checkout simulation
  const handleCheckout = () => {
    if (balance >= totalAmount && cart.length > 0) {
      setBalance((prev) => prev - totalAmount);
      setRewards((prev) => prev + rewardEarned);
      setCart([]);
      setSuccessMessage(`Payment Successful! Wallet debited R${totalAmount.toFixed(2)} XCHEF-P. Reward: +${rewardEarned.toFixed(2)} XCHEF-E`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    }
  };

  // Handle Direct Transfer (Send Button)
  const handleSendSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (!amt || amt <= 0 || amt > balance || !sendRecipient) return;

    setBalance((prev) => prev - amt);
    setShowSendModal(false);
    setSendRecipient('');
    setSendAmount('');

    setSuccessMessage(`Successfully sent R${amt.toFixed(2)} XCHEF-P to ${sendRecipient}`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  // Handle QR Payment Simulation (Scan QR Button)
  const handleScanPayment = () => {
    const amt = parseFloat(qrAmount);
    if (!amt || amt <= 0 || amt > balance) return;

    const qrReward = amt * 0.01;
    setBalance((prev) => prev - amt);
    setRewards((prev) => prev + qrReward);
    setShowScanModal(false);

    setSuccessMessage(`QR Payment Processed! Spent R${amt.toFixed(2)} XCHEF-P. Reward earned: +${qrReward.toFixed(2)} XCHEF-E`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <main className="flex-1 flex flex-col p-5 relative pb-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d]">
          Consumer Mode
        </span>
      </div>

      {/* Wallet Balance Card */}
      <div className="glass-card rounded-2xl p-5 border border-[#00ff9d]/30 relative overflow-hidden mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-gray-400">XCHEF-P Wallet Balance</p>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              R{balance.toFixed(2)} <span className="text-xs text-[#00ff9d] font-mono">XCHEF-P</span>
            </h2>
          </div>
          <div className="p-2.5 rounded-xl bg-[#00ff9d]/10 text-[#00ff9d]">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <span className="text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb703]" /> Rewards:
          </span>
          <span className="font-bold text-[#ffb703] font-mono">{rewards.toFixed(2)} XCHEF-E</span>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
          <button
            onClick={() => setShowSendModal(true)}
            className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 text-white transition"
          >
            <Send className="w-3.5 h-3.5 text-[#00ff9d]" /> Send
          </button>
          <button
            onClick={() => setShowScanModal(true)}
            className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 text-white transition"
          >
            <QrCode className="w-3.5 h-3.5 text-[#00e5ff]" /> Scan QR
          </button>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#00ff9d]" /> Local Market
          </h3>
          <span className="text-[10px] text-gray-400">Direct from farmers</span>
        </div>

        <div className="space-y-3">
          {mockProducts.map((product) => (
            <div key={product.id} className="glass-panel rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl p-2 rounded-lg bg-white/5">{product.image}</div>
                <div>
                  <h4 className="text-xs font-bold text-white">{product.name}</h4>
                  <p className="text-[10px] text-gray-400">{product.seller}</p>
                  <p className="text-xs font-bold text-[#00ff9d] mt-1">R{product.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="p-2 rounded-xl bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Cart & Fee Simulation */}
      {cart.length > 0 && (
        <div className="glass-card rounded-2xl p-4 border border-[#00e5ff]/30 mb-6">
          <h4 className="text-xs font-bold text-white mb-2">Cart Simulation ({cart.length} items)</h4>
          <div className="space-y-1 text-xs text-gray-300 mb-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Consumer Fee (2%):</span>
              <span>+R{consumerFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-[#ffb703]">
              <span>Earned Reward (1%):</span>
              <span>+{rewardEarned.toFixed(2)} XCHEF-E</span>
            </div>
            <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
              <span>Total Payable:</span>
              <span className="text-[#00ff9d]">R{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={balance < totalAmount}
            className="w-full py-2.5 rounded-xl bg-[#00ff9d] text-black font-bold text-xs hover:bg-[#00e5ff] transition-all disabled:opacity-50"
          >
            {balance < totalAmount ? 'Insufficient Balance' : 'Simulate Purchase & Pay'}
          </button>
        </div>
      )}

      {/* SEND MODAL */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-2xl p-5 border border-[#00ff9d]/40 max-w-xs w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#00ff9d]" /> Send XCHEF-P
              </h3>
              <button onClick={() => setShowSendModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-300 mb-1">Recipient Address or Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0x89A... or @farmer_johan"
                  value={sendRecipient}
                  onChange={(e) => setSendRecipient(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff9d]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-300 mb-1">Amount (XCHEF-P)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 50.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff9d]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00ff9d] text-black font-bold text-xs hover:bg-[#00e5ff] transition"
              >
                Confirm Transfer 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SCAN QR MODAL */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-2xl p-5 border border-[#00e5ff]/40 max-w-xs w-full space-y-4 text-center">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#00e5ff]" /> Scan Merchant QR
              </h3>
              <button onClick={() => setShowScanModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-2">
              <Camera className="w-8 h-8 text-[#00e5ff] animate-pulse" />
              <p className="text-[11px] text-gray-400">Simulating QR Viewfinder...</p>
            </div>

            <div className="space-y-2 text-left">
              <label className="block text-[11px] text-gray-300">POS Payment Amount (R)</label>
              <input
                type="number"
                step="0.01"
                value={qrAmount}
                onChange={(e) => setQrAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
              />
            </div>

            <button
              onClick={handleScanPayment}
              className="w-full py-2.5 rounded-xl bg-[#00e5ff] text-black font-bold text-xs hover:bg-[#00ff9d] transition"
            >
              Simulate QR Payment 💳
            </button>
          </div>
        </div>
      )}

      {/* Payment Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-2xl p-6 text-center border border-[#00ff9d] max-w-xs w-full animate-bounce space-y-2">
            <CheckCircle className="w-12 h-12 text-[#00ff9d] mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">Transaction Success!</h3>
            <p className="text-xs text-gray-300">{successMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
}
