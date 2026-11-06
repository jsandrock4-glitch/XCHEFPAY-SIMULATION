'use client';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import GlassCard from '@/components/common/GlassCard';
import BalanceCard from '@/components/wallet/BlananceCard';
import { Sprout, Plus, ArrowUpRight, ShieldCheck, Tractor, TrendingUp, DollarSign, Package } from 'lucide-react';

export default function FarmerPage() {
  // Verification State
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1); // 1: Input, 2: Confirm Farm & GPS
  const [gpsConfirmed, setGpsConfirmed] = useState(false);

  // Form State
  const [farmerData, setFarmerData] = useState({
    firstName: '',
    lastName: '',
    agriNumber: '',
    farmName: '',
    farmingType: '',
    location: ''
  });

  // Wallet & Harvest State
  const [agriBalance, setAgriBalance] = useState(12450.00);
  const [personalBalance, setPersonalBalance] = useState(2180.00);
  const [transferAmount, setTransferAmount] = useState('');

  // Crops / Harvests State
  const [crops, setCrops] = useState([
    { id: 1, name: 'Organic Tomatoes (Batch #88)', qty: 500, price: 45.00, status: 'Active on Marketplace' },
    { id: 2, name: 'Fresh Potatoes (Batch #12)', qty: 200, price: 60.00, status: 'In Storage / Ready' },
  ]);

  // New Crop Form State
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newCropQty, setNewCropQty] = useState('');
  const [newCropPrice, setNewCropPrice] = useState('');

  // Handle Initial Search/Verify
  const handleVerifySearch = (e) => {
    e.preventDefault();
    if (!farmerData.firstName || !farmerData.agriNumber) return;

    setFarmerData((prev) => ({
      ...prev,
      farmName: `${prev.lastName || prev.firstName} Traditional Farming (Pty) Ltd`,
      farmingType: 'Mixed Agriculture & Fresh Produce',
      location: 'Potchefstroom, North West (-26.7145, 27.0970)'
    }));

    setStep(2);
  };

  const handleCompleteOnboarding = () => {
    if (!gpsConfirmed) return;
    setIsVerified(true);
  };

  // Transfer funds from Agri Treasury to Personal Wallet
  const handleTransferToPersonal = () => {
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0 || amt > agriBalance) return;
    setAgriBalance((prev) => prev - amt);
    setPersonalBalance((prev) => prev + amt);
    setTransferAmount('');
  };

  // Add new crop batch
  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    if (!newCropName || !newCropQty || !newCropPrice) return;
    const newBatch = {
      id: Date.now(),
      name: newCropName,
      qty: parseInt(newCropQty),
      price: parseFloat(newCropPrice),
      status: 'Active on Marketplace'
    };
    setCrops([newBatch, ...crops]);
    setNewCropName('');
    setNewCropQty('');
    setNewCropPrice('');
    setShowAddCrop(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <Navbar />

      <main className="max-w-md mx-auto px-4 pt-6">
        
        {/* ==================== STEP 1 & 2: VERIFICATION PROCESS ==================== */}
        {!isVerified ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-3xl">🌾</span>
              <h1 className="text-2xl font-bold mt-2 text-emerald-400">Producer Identity & Verification</h1>
              <p className="text-xs text-slate-400 mt-1">
                As you enter the Farmer role, your agricultural registration is connected to the dual-wallet infrastructure.
              </p>
            </div>

            {/* STEP 1: INPUT FORM */}
            {step === 1 && (
              <GlassCard className="p-5 border-emerald-500/30">
                <form onSubmit={handleVerifySearch} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johan"
                      value={farmerData.firstName}
                      onChange={(e) => setFarmerData({ ...farmerData, firstName: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. van der Merwe"
                      value={farmerData.lastName}
                      onChange={(e) => setFarmerData({ ...farmerData, lastName: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Registered Agri Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AGRI-99481-ZA"
                      value={farmerData.agriNumber}
                      onChange={(e) => setFarmerData({ ...farmerData, agriNumber: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-lg shadow-emerald-950/50"
                  >
                    Verify Agricultural Register 🔍
                  </button>
                </form>
              </GlassCard>
            )}

            {/* STEP 2: CONFIRMATION & GPS */}
            {step === 2 && (
              <GlassCard className="p-5 border-emerald-500/50 space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-center">
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    Registered Record Found ✅
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Producer:</span>
                    <span className="font-semibold text-slate-200">{farmerData.firstName} {farmerData.lastName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Agri No:</span>
                    <span className="font-mono text-emerald-400">{farmerData.agriNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Registered Farm:</span>
                    <span className="font-semibold text-slate-200">{farmerData.farmName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Farming Type:</span>
                    <span className="text-slate-300">{farmerData.farmingType}</span>
                  </div>
                </div>

                {/* GPS Confirm Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setGpsConfirmed(true)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                      gpsConfirmed
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500'
                    }`}
                  >
                    <span>📍</span>
                    {gpsConfirmed
                      ? `Location Confirmed: ${farmerData.location}`
                      : 'Click to Confirm Farm GPS Location'}
                  </button>
                </div>

                {/* Final Done Button */}
                <button
                  onClick={handleCompleteOnboarding}
                  disabled={!gpsConfirmed}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition shadow-lg ${
                    gpsConfirmed
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Complete & Enter Farmer Dashboard 🚀
                </button>
              </GlassCard>
            )}
          </div>
        ) : (

          /* ==================== STEP 3: FARMER DASHBOARD & DUAL WALLETS ==================== */
          <div className="space-y-6">
            
            {/* Header with Farmer Info */}
            <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <h1 className="text-lg font-bold text-emerald-400">{farmerData.farmName}</h1>
                <p className="text-xs text-slate-400">Producer: {farmerData.firstName} {farmerData.lastName} | Reg: {farmerData.agriNumber}</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            {/* DUAL WALLETS */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Dual-Wallet Infrastructure & Treasury
              </h2>
              
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400">Agri Treasury (Business Wallet)</span>
                    <h3 className="text-xl font-bold text-emerald-400 font-mono">R {agriBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} <span className="text-xs text-slate-400">XCHEF-P</span></h3>
                  </div>
                  <Tractor className="w-8 h-8 text-emerald-500/40" />
                </div>
                <p className="text-[11px] text-slate-400">Tax-optimized protected fund for seed, fertilizer, fuel & supply chain inventory.</p>

                {/* Transfer to Personal */}
                <div className="pt-2 border-t border-slate-800 flex gap-2">
                  <input
                    type="number"
                    placeholder="Amount to Transfer"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    onClick={handleTransferToPersonal}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Transfer to Personal
                  </button>
                </div>
              </div>

              {/* Personal Wallet */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400">Personal Wallet (Consumer Rewards)</span>
                  <h3 className="text-lg font-bold text-amber-400 font-mono">R {personalBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} <span className="text-xs text-slate-400">CHEFCOIN</span></h3>
                </div>
                <DollarSign className="w-7 h-7 text-amber-500/40" />
              </div>
            </div>

            {/* HARVEST & CROP MANAGEMENT (NEW FUNCTIONALITY) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Harvest & Marketplace Supply
                </h2>
                <button
                  onClick={() => setShowAddCrop(!showAddCrop)}
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-lg flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> {showAddCrop ? 'Cancel' : 'Add New Crop Batch'}
                </button>
              </div>

              {/* Add Crop Modal / Form */}
              {showAddCrop && (
                <GlassCard className="p-4 border-emerald-500/40 space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase">List New Produce Batch</h3>
                  <form onSubmit={handleAddCropSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">Crop / Product Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sweet Corn (Batch #99)"
                        value={newCropName}
                        onChange={(e) => setNewCropName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-300 mb-1">Quantity (kg / units)</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 300"
                          value={newCropQty}
                          onChange={(e) => setNewCropQty(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-300 mb-1">Price per Batch / Unit (R)</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 50.00"
                          value={newCropPrice}
                          onChange={(e) => setNewCropPrice(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition"
                    >
                      Publish to Marketplace 🚀
                    </button>
                  </form>
                </GlassCard>
              )}

              {/* Crops List */}
              <div className="space-y-2">
                {crops.map((crop) => (
                  <div key={crop.id} className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{crop.name}</h4>
                        <p className="text-[11px] text-slate-400">{crop.qty} kg available • R {crop.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {crop.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Supply Contracts & Input Expenses Quick Actions */}
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
              <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Direct Supply Chain & Inputs
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => alert('B2B Supply Contract with Local Restaurant Network active.')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium p-2.5 rounded-lg border border-slate-700 text-center transition"
                >
                  🤝 View B2B Contracts
                </button>
                <button 
                  onClick={() => alert('Agri input expense deduction simulated successfully from treasury.')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium p-2.5 rounded-lg border border-slate-700 text-center transition"
                >
                  🚜 Pay Input Expenses
                </button>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
